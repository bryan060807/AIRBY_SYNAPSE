import type { Release } from './types';

export const mockReleases: Release[] = [
  {
    id: 'dm-01',
    title: 'Digital Mirage',
    artist: 'AIBRY',
    genre: 'Synthwave',
    releaseDate: '2024-08-15',
    status: 'In Progress',
    description: 'A journey through a neon-drenched digital landscape.',
    uniqueSellingPoints: 'Features a collaboration with a well-known retro artist.',
    moodKeywords: ['futuristic', 'energetic', 'nostalgic'],
    imageUrl: 'https://picsum.photos/seed/101/600/400',
    imageDescription: 'Abstract neon landscape for "Digital Mirage"',
  },
  {
    id: 'ch-02',
    title: 'Chrome Heart',
    artist: 'AIBRY',
    genre: 'Cyberpunk',
    releaseDate: '2024-09-01',
    status: 'Planning',
    description: 'The sound of a city that never sleeps, powered by chrome and electricity.',
    uniqueSellingPoints: 'Heavy use of analog synthesizers mixed with modern production.',
    moodKeywords: ['dark', 'driving', 'intense'],
    imageUrl: 'https://picsum.photos/seed/102/600/400',
    imageDescription: 'Cybernetic human figure for "Chrome Heart"',
  },
  {
    id: 'ng-03',
    title: 'Neon Grid',
    artist: 'AIBRY',
    genre: 'Techno',
    releaseDate: '2024-07-20',
    status: 'Released',
    description: 'An unrelenting techno track designed for the dance floor.',
    uniqueSellingPoints: 'Recorded in a single live take.',
    moodKeywords: ['hypnotic', 'pulsing', 'melodic'],
    imageUrl: 'https://picsum.photos/seed/103/600/400',
    imageDescription: 'Futuristic cityscape for "Neon Grid"',
    marketingCopy: {
      socialMediaPost: 'AIBRY\'s new single "Neon Grid" is out now! Lose yourself in the hypnotic pulse. #techno #newmusic #aibry',
      pressReleaseSnippet: 'AIBRY delivers a masterful live-take techno performance in "Neon Grid," a track that is both hypnotic and relentlessly energetic.',
      callToAction: 'Stream "Neon Grid" on all major platforms!',
      hashtags: ['#techno', '#newmusic', '#aibry', '#neongrid', '#electronicmusic']
    }
  },
  {
    id: 'sp-04',
    title: 'Static Pulse',
    artist: 'AIBRY',
    genre: 'IDM',
    releaseDate: '2024-06-30',
    status: 'Released',
    description: 'Experimental sound design meets broken beats.',
    uniqueSellingPoints: 'Features granular synthesis and complex rhythmic patterns.',
    moodKeywords: ['experimental', 'glitchy', 'abstract'],
    imageUrl: 'https://picsum.photos/seed/104/600/400',
    imageDescription: 'Glitching audio waveform for "Static Pulse"',
  },
  {
    id: 'ez-05',
    title: 'Echo Zone',
    artist: 'AIBRY',
    genre: 'Ambient',
    releaseDate: '2024-10-10',
    status: 'Planning',
    description: 'A deep dive into atmospheric soundscapes and evolving textures.',
    uniqueSellingPoints: 'Created entirely with field recordings from urban environments.',
    moodKeywords: ['atmospheric', 'calm', 'introspective'],
  },
];

export const getReleaseById = (id: string): Release | undefined => {
  return mockReleases.find((release) => release.id === id);
};
