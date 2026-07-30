import { describe, expect, test } from 'bun:test';
import type { PluginConfig } from '../config';
import { createAgents } from './index';

describe('custom-agent creation', () => {
  test('creates a configured custom agent', () => {
    const config: PluginConfig = {
      agents: {
        reviewer: {
          model: 'openai/gpt-5.6-luna',
          prompt: 'Review the requested scope.',
          orchestratorPrompt: '@reviewer\n- Role: Project reviewer',
        },
      },
    };

    const agents = createAgents(config);
    const reviewer = agents.find((agent) => agent.name === 'reviewer');
    const orchestrator = agents.find((agent) => agent.name === 'orchestrator');

    expect(reviewer?.config.model).toBe('openai/gpt-5.6-luna');
    expect(reviewer?.config.prompt).toContain('Review the requested scope.');
    expect(orchestrator?.config.prompt).toContain('@reviewer');
  });

  test('skips a custom agent without a model', () => {
    const agents = createAgents({ agents: { reviewer: {} } });
    expect(agents.some((agent) => agent.name === 'reviewer')).toBe(false);
  });

  test('does not create a disabled custom agent', () => {
    const config: PluginConfig = {
      disabled_agents: ['reviewer'],
      agents: { reviewer: { model: 'openai/gpt-5.6-luna' } },
    };
    expect(
      createAgents(config).some((agent) => agent.name === 'reviewer'),
    ).toBe(false);
  });

  test('rejects unsafe custom agent names', () => {
    const config: PluginConfig = {
      agents: { 'unsafe name': { model: 'openai/gpt-5.6-luna' } },
    };
    expect(() => createAgents(config)).toThrow('Unsafe custom agent name');
  });

  test('passes explicit permissions through', () => {
    const config: PluginConfig = {
      agents: {
        reviewer: {
          model: 'openai/gpt-5.6-luna',
          permission: { edit: 'deny', bash: 'ask' },
        },
      },
    };
    const reviewer = createAgents(config).find(
      (agent) => agent.name === 'reviewer',
    );
    expect(reviewer?.config.permission).toMatchObject({
      edit: 'deny',
      bash: 'ask',
    });
  });
});
