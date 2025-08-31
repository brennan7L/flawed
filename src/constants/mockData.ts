export type FlawTag = {
  id: string;
  label: string;
  category: 'personality' | 'habits' | 'lifestyle' | 'emotional' | 'social';
};

export type Profile = {
  id: string;
  name: string;
  age: number;
  city: string;
  photos: string[];
  bio: string;
  flaws: FlawTag[];
  dealBreakers: FlawTag[];
  tolerableFlaws: FlawTag[];
};

export const flawTags: FlawTag[] = [
  { id: '1', label: 'Overthinker', category: 'personality' },
  { id: '2', label: 'Always Late', category: 'habits' },
  { id: '3', label: 'Bad Texter', category: 'social' },
  { id: '4', label: 'Workaholic', category: 'lifestyle' },
  { id: '5', label: 'Emotional Eater', category: 'emotional' },
  { id: '6', label: 'Netflix Binger', category: 'habits' },
  { id: '7', label: 'Procrastinator', category: 'personality' },
  { id: '8', label: 'Overthinks Everything', category: 'personality' },
  { id: '9', label: 'Too Direct', category: 'social' },
  { id: '10', label: 'Perfectionist', category: 'personality' },
  { id: '11', label: 'Messy Room', category: 'habits' },
  { id: '12', label: 'Phone Addict', category: 'lifestyle' },
  { id: '13', label: 'Anxious in Crowds', category: 'social' },
  { id: '14', label: 'Terrible Cook', category: 'lifestyle' },
  { id: '15', label: 'Cry at Movies', category: 'emotional' },
];

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Sarah',
    age: 28,
    city: 'San Francisco',
    photos: ['https://picsum.photos/id/1027/400/600'],
    bio: 'Proudly overthinking every life decision while binge-watching true crime shows. Looking for someone who can handle my 3am existential questions.',
    flaws: [
      flawTags[0], // Overthinker
      flawTags[5], // Netflix Binger
      flawTags[14], // Cry at Movies
    ],
    dealBreakers: [flawTags[3]], // Workaholic
    tolerableFlaws: [flawTags[2], flawTags[10]], // Bad Texter, Messy Room
  },
  {
    id: '2',
    name: 'Alex',
    age: 31,
    city: 'New York',
    photos: ['https://picsum.photos/id/1012/400/600'],
    bio: 'Professional procrastinator with a PhD in starting Netflix series I will never finish. Seeking someone who appreciates my organized chaos.',
    flaws: [
      flawTags[6], // Procrastinator
      flawTags[10], // Messy Room
      flawTags[11], // Phone Addict
    ],
    dealBreakers: [flawTags[9]], // Perfectionist
    tolerableFlaws: [flawTags[0], flawTags[4]], // Overthinker, Emotional Eater
  },
  {
    id: '3',
    name: 'Jordan',
    age: 26,
    city: 'Los Angeles',
    photos: ['https://picsum.photos/id/1014/400/600'],
    bio: 'Chronically late but always worth the wait. Warning: may text back in 3-5 business days.',
    flaws: [
      flawTags[1], // Always Late
      flawTags[2], // Bad Texter
      flawTags[12], // Anxious in Crowds
    ],
    dealBreakers: [flawTags[3]], // Workaholic
    tolerableFlaws: [flawTags[0], flawTags[6]], // Overthinker, Procrastinator
  },
];

export const currentUserProfile: Profile = {
  id: '0',
  name: 'Jamie',
  age: 29,
  city: 'Seattle',
  photos: ['https://picsum.photos/id/1005/400/600'],
  bio: 'Recovering perfectionist trying to embrace the chaos. Will definitely overthink this bio for the next week.',
  flaws: [
    flawTags[0], // Overthinker
    flawTags[9], // Perfectionist
    flawTags[4], // Emotional Eater
  ],
  dealBreakers: [flawTags[1]], // Always Late
  tolerableFlaws: [flawTags[2], flawTags[5]], // Bad Texter, Netflix Binger
};