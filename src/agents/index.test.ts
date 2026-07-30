import { describe, expect, test } from 'bun:test';
import type { PluginConfig } from '../config';
import { DEFAULT_DISABLED_AGENTS, SUBAGENT_NAMES } from '../config';
import {
  createAgents,
  getAgentConfigs,
  getDisabledAgents,
  isSubagent,
} from './index';

const DEFAULT_NAMES = [
  'orchestrator',
  'explorer',
  'librarian',
  'oracle',
  'fixer',
];

describe('retained Tailored OMO agents', () => {
  test('creates only the default retained roles', () => {
    expect(createAgents().map((agent) => agent.name)).toEqual(DEFAULT_NAMES);
  });

  test('enables Observer when the default disabled list is overridden', () => {
    const names = createAgents({ disabled_agents: [] }).map(
      (agent) => agent.name,
    );
    expect(names).toEqual([...DEFAULT_NAMES, 'observer']);
  });

  test('keeps Observer disabled by default', () => {
    expect(DEFAULT_DISABLED_AGENTS).toContain('observer');
  });

  test('applies the legacy explorer alias', () => {
    const agents = createAgents({
      agents: { explore: { model: 'test/explorer' } },
    });
    expect(
      agents.find((agent) => agent.name === 'explorer')?.config.model,
    ).toBe('test/explorer');
  });

  test('applies direct model overrides', () => {
    const config: PluginConfig = {
      agents: { fixer: { model: 'ollama/swarm-smart' } },
    };
    expect(
      createAgents(config).find((agent) => agent.name === 'fixer')?.config
        .model,
    ).toBe('ollama/swarm-smart');
  });

  test('removes disabled agents but protects the Orchestrator', () => {
    const config: PluginConfig = {
      disabled_agents: ['orchestrator', 'fixer'],
    };
    const names = createAgents(config).map((agent) => agent.name);
    expect(names).toContain('orchestrator');
    expect(names).not.toContain('fixer');
    expect(getDisabledAgents(config).has('orchestrator')).toBe(false);
  });

  test('classifies retained specialists as subagents', () => {
    for (const name of SUBAGENT_NAMES) expect(isSubagent(name)).toBe(true);
    expect(isSubagent('orchestrator')).toBe(false);

    const configs = getAgentConfigs({ disabled_agents: [] });
    expect(configs.orchestrator?.mode).toBe('primary');
    for (const name of SUBAGENT_NAMES) {
      expect(configs[name]?.mode).toBe('subagent');
    }
  });
});
