import { Character } from '../types/character';

export const mockCharacters: Character[] = [
  {
    id: '1',
    name: 'Aragorn',
    level: 5,
    status: 'active',
    class: 'Ranger',
    specialization: 'Beast Master',
    media: {
      type: 'image',
      url: '/placeholder-character.jpg',
      alt: 'Aragorn the Ranger',
    },
    npcLinks: [
      { id: 'npc1', name: 'Gandalf', relationship: 'Mentor' },
      { id: 'npc2', name: 'Arwen', relationship: 'Romantic Interest' },
    ],
    diaryEntries: [
      {
        id: 'entry1',
        date: '2024-01-15',
        title: 'Level Up!',
        content: 'Reached level 5 and gained Beast Master specialization.',
        type: 'level-up',
      },
    ],
  },
];