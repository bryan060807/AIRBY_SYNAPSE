'use server';
/**
 * @fileOverview A Genkit flow for generating marketing copy suggestions for song releases.
 *
 * - generateMarketingCopyForRelease - A function that handles the generation of marketing copy.
 * - GenerateMarketingCopyInput - The input type for the generateMarketingCopyForRelease function.
 * - GenerateMarketingCopyOutput - The return type for the generateMarketingCopyForRelease function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingCopyInputSchema = z.object({
  songTitle: z.string().describe('The title of the song.'),
  artistName: z.string().describe('The name of the artist, e.g., AIBRY.'),
  genre: z.string().describe('The music genre, e.g., Electronic, Techno, Synthwave.'),
  moodKeywords: z.array(z.string()).describe('A list of keywords describing the mood or vibe of the song, e.g., energetic, mysterious, futuristic, melancholic.').optional(),
  releaseDate: z.string().describe('The release date of the song in YYYY-MM-DD format.').optional(),
  uniqueSellingPoints: z.string().describe('Any unique aspects, story, or special features about the song.').optional(),
});
export type GenerateMarketingCopyInput = z.infer<typeof GenerateMarketingCopyInputSchema>;

const GenerateMarketingCopyOutputSchema = z.object({
  socialMediaPost: z.string().describe('A short, engaging social media post suitable for platforms like Instagram, X (Twitter), or Facebook. Should be concise and attention-grabbing.'),
  pressReleaseSnippet: z.string().describe('A more formal, compelling snippet for a press release or media kit, highlighting the song\u0027s significance and artistic vision.'),
  callToAction: z.string().describe('A clear call to action encouraging listeners to engage with the song, e.g., "Listen now on all platforms!", "Pre-save the track today!".'),
  hashtags: z.array(z.string()).describe('A list of relevant and popular hashtags for social media promotion.'),
});
export type GenerateMarketingCopyOutput = z.infer<typeof GenerateMarketingCopyOutputSchema>;

export async function generateMarketingCopyForRelease(
  input: GenerateMarketingCopyInput
): Promise<GenerateMarketingCopyOutput> {
  return generateMarketingCopyFlow(input);
}

const marketingCopyPrompt = ai.definePrompt({
  name: 'marketingCopyPrompt',
  input: {schema: GenerateMarketingCopyInputSchema},
  output: {schema: GenerateMarketingCopyOutputSchema},
  prompt: `You are an expert music marketer for the artist AIBRY, known for cutting-edge, electronic music with a modern, techy, and futuristic feel. Your goal is to generate compelling marketing copy that captures AIBRY's brand identity.

Generate marketing copy for a new song release based on the following details:

Song Title: {{{songTitle}}}
Artist: {{{artistName}}}
Genre: {{{genre}}}
{{#if moodKeywords}}Mood/Vibe Keywords: {{#each moodKeywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}{{/if}}
{{#if releaseDate}}Release Date: {{{releaseDate}}}{{/if}}
{{#if uniqueSellingPoints}}Unique Selling Points: {{{uniqueSellingPoints}}}{{/if}}

Create a short, engaging social media post, a formal press release snippet, a clear call to action, and a list of relevant hashtags. Ensure the tone is energetic, futuristic, and resonates with the electronic music scene.`,
});

const generateMarketingCopyFlow = ai.defineFlow(
  {
    name: 'generateMarketingCopyFlow',
    inputSchema: GenerateMarketingCopyInputSchema,
    outputSchema: GenerateMarketingCopyOutputSchema,
  },
  async (input) => {
    const {output} = await marketingCopyPrompt(input);
    return output!;
  }
);
