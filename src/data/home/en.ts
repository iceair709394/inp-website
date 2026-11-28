import type { HomeContent } from '@/data/types';

/** 英文站 Home，取文案原文。 */
export const home: HomeContent = {
  brief: {
    heading: 'A Desktop Assistant, Not a Chatbot.',
    paragraphs: [
      'INP is a Windows application. A 3D character sits on your desktop, you speak to it or type to it, and it keeps your day in order: schedules, reminders, tasks, and quick lookups.',
      'Speech is synthesised on your machine, and conversations are not stored on our servers. You bring your own model — a cloud key, or a local model on your own GPU.',
    ],
  },
  introduction: {
    heading: 'Beyond Conversations.',
    paragraphs: [
      "A conversation doesn't have to begin and end with a question.",
      'INP explores a more continuous form of interaction — where memory, emotional states, perception, and autonomous behavior work together to create a richer experience.',
    ],
  },
  philosophy: {
    heading: 'A Different Direction of Intelligence.',
    paragraphs: [
      'Intelligence has traditionally been measured by what a system can solve.',
      'But understanding people involves more than logic. It involves context, emotion, memory, and social interaction.',
      'INP explores this other dimension of intelligence.',
    ],
  },
  zhFallbackFields: [],
};
