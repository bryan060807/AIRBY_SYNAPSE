'use client';

import { useEffect, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { getGlitchImage, type GlitchImageState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Release } from '@/lib/types';
import { Loader2, Sparkles, Upload, Save, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Generate Image
    </Button>
  );
}

export function ImageGenerationSection({ release }: { release: Release }) {
  const initialState: GlitchImageState = {
    result: { imageDataUri: release.imageUrl ?? '' },
  };
  const [state, formAction] = useFormState(getGlitchImage, initialState);
  const { toast } = useToast();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Image Generation Failed",
        description: state.error,
      });
    }
  }, [state.error, toast]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const imageSrc = state.result?.imageDataUri || release.imageUrl;

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>AI Promotional Image</CardTitle>
          <CardDescription>
            Generate a high-contrast, glitch-style image for this release.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted/50 flex items-center justify-center">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={release.imageDescription || release.title}
                fill
                className="object-cover"
                data-ai-hint="abstract glitch"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <ImageIcon className="h-10 w-10" />
                <p>Image will appear here</p>
              </div>
            )}
          </div>
          <input type="hidden" name="releaseTitle" value={release.title} />

          <div className="grid gap-2">
            <Label htmlFor="description">Image Prompt Context</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={release.description}
              placeholder="e.g., A journey through a neon-drenched digital landscape."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="baseImage">Base Image (Optional)</Label>
            <div className='flex gap-2 items-center'>
            <Input id="baseImage" name="baseImage" type="file" accept="image/*" onChange={handleFileChange} />
            {previewUrl && 
              <div className="relative h-10 w-10 shrink-0">
                <Image src={previewUrl} alt="Base image preview" fill className="rounded-md object-cover" />
              </div>
            }
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <SubmitButton />
          {state.result?.imageDataUri && (
            <Button variant="outline" className='w-full'>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
