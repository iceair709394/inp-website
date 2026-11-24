import type { ProductContent } from '@/data/types';

/**
 * 英文站 Product。
 */
export const product: ProductContent = {
  heading: 'A Platform for SGI Agents.',
  intro:
    'INP provides a foundation for building and experiencing agents with persistent memory, emotional-state modeling, perception, and autonomous behavior.',
  systemsLabel: 'Core Systems',
  systems: [
    {
      id: 'agent-memory',
      shortLabel: 'Agent Memory',
      fullName: null,
      description:
        'A foundation for retaining information, experiences, preferences, and behavioral context over time.',
    },
    {
      id: 'heartstrings',
      shortLabel: 'INP Heartstrings',
      fullName: null,
      description:
        "Heartstrings maintains and evolves the agent's emotional states and related experiences.",
    },
    {
      id: 'autonomous-drive',
      shortLabel: 'Autonomous Drive',
      fullName: null,
      description:
        'A system for tracking ongoing events, identifying relevant signals, and supporting proactive follow-up.',
    },
    {
      id: 'avatar-interaction',
      shortLabel: 'Avatar & Interaction',
      fullName: null,
      description:
        'A framework connecting internal agent states and perception signals to external expressions and interactions.',
    },
  ],
  zhFallbackFields: [],
};
