'use server';
/**
 * @fileOverview A Genkit flow for generating high-contrast, glitch-style promotional images.
 *
 * - generateGlitchImageForRelease - A function that handles the image generation process.
 * - GenerateGlitchImageInput - The input type for the generateGlitchImageForRelease function.
 * - GenerateGlitchImageOutput - The return type for the generateGlitchImageForRelease function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateGlitchImageInputSchema = z.object({
  releaseTitle: z.string().describe('The title of the song release.'),
  description: z.string().describe('A short description of the song or release for context.'),
  baseImageDataUri: z
    .string()
    .optional()
    .describe(
      "An optional base image to glitch, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateGlitchImageInput = z.infer<typeof GenerateGlitchImageInputSchema>;

const GenerateGlitchImageOutputSchema = z.object({
  imageDataUri: z.string().describe('The generated glitch-style image as a data URI.'),
});
export type GenerateGlitchImageOutput = z.infer<typeof GenerateGlitchImageOutputSchema>;

export async function generateGlitchImageForRelease(
  input: GenerateGlitchImageInput
): Promise<GenerateGlitchImageOutput> {
  return generateGlitchImageFlow(input);
}

const generateGlitchImageFlow = ai.defineFlow(
  {
    name: 'generateGlitchImageFlow',
    inputSchema: GenerateGlitchImageInputSchema,
    outputSchema: GenerateGlitchImageOutputSchema,
  },
  async (input) => {
    const promptParts: (string | {text: string} | { media: { url: string; contentType?: string } })[] = [];

    if (input.baseImageDataUri) {
      // Extract content type from data URI if available, otherwise default to image/png
      const contentTypeMatch = input.baseImageDataUri.match(/^data:(.*?);base64,/);
      const contentType = contentTypeMatch ? contentTypeMatch[1] : 'image/png';
      promptParts.push({ media: { url: input.baseImageDataUri, contentType } });
    }

    promptParts.push({
      text: `Generate a high-contrast, digital glitch-style promotional image for the song release '${input.releaseTitle}' by artist AIBRY. The image should be visually striking and evoke an electronic music vibe. Focus on sharp lines, distorted elements, vibrant electric magenta (#FF42E6) and luminous bright purple (#C480FF) colors, and a strong sense of movement or digital artifacting. Ensure the style is edgy, futuristic, and captures the essence of AIBRY's brand. Incorporate elements that suggest high energy and cutting-edge technology.
      Description of song/release: ${input.description}.`
    });

    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-image', // Using a model that can process images.
      prompt: promptParts,
      output: {
        format: 'uri',
      },
    });

    return { imageDataUri: media[0].uri };
  }
);
