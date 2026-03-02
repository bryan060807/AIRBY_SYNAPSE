import type {
  GenerateMarketingCopyOutput,
} from '@/ai/flows/generate-marketing-copy-flow';

export type Release = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  releaseDate: string;
  status: 'Planning' | 'In Progress' | 'Released';
  description: string;
  uniqueSellingPoints: string;
  moodKeywords: string[];
  marketingCopy?: GenerateMarketingCopyOutput;
  imageUrl?: string;
  imageDescription?: string;
  stems?: { name: string; url: string }[];
  category?: string;
};
