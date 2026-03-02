'use server';

import {
  generateMarketingCopyForRelease,
  type GenerateMarketingCopyInput,
  type GenerateMarketingCopyOutput,
} from '@/ai/flows/generate-marketing-copy-flow';

import {
  generateGlitchImageForRelease,
  type GenerateGlitchImageInput,
  type GenerateGlitchImageOutput,
} from '@/ai/flows/generate-glitch-image-flow';

export type MarketingCopyState = {
  result?: GenerateMarketingCopyOutput;
  error?: string;
};

export async function getMarketingCopy(
  prevState: MarketingCopyState,
  formData: FormData
): Promise<MarketingCopyState> {
  const input: GenerateMarketingCopyInput = {
    songTitle: formData.get('songTitle') as string,
    artistName: formData.get('artistName') as string,
    genre: formData.get('genre') as string,
    moodKeywords: (formData.get('moodKeywords') as string).split(',').map(s => s.trim()).filter(Boolean),
    uniqueSellingPoints: formData.get('uniqueSellingPoints') as string,
  };

  try {
    const result = await generateMarketingCopyForRelease(input);
    return { result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to generate marketing copy.' };
  }
}

export type GlitchImageState = {
  result?: GenerateGlitchImageOutput;
  error?: string;
};


const fileToDataURI = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export async function getGlitchImage(
  prevState: GlitchImageState,
  formData: FormData
): Promise<GlitchImageState> {
  
  const baseImageFile = formData.get('baseImage') as File | null;
  let baseImageDataUri: string | undefined = undefined;

  if (baseImageFile && baseImageFile.size > 0) {
    try {
      baseImageDataUri = await fileToDataURI(baseImageFile);
    } catch(e: any) {
       console.error(e);
      return { error: 'Failed to read base image file.' };
    }
  }

  const input: GenerateGlitchImageInput = {
    releaseTitle: formData.get('releaseTitle') as string,
    description: formData.get('description') as string,
    baseImageDataUri
  };
  
  try {
    const result = await generateGlitchImageForRelease(input);
    return { result };
  } catch (e: any) {
    console.error(e);
    return { error: e.message || 'Failed to generate image.' };
  }
}
