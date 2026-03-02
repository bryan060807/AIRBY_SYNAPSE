'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getMarketingCopy, type MarketingCopyState } from '@/app/actions';
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
import { Textarea } from '@/components/ui/textarea';
import type { Release } from '@/lib/types';
import { Loader2, Sparkles, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Sparkles className="mr-2 h-4 w-4" />
      )}
      Generate Copy
    </Button>
  );
}

export function MarketingCopySection({ release }: { release: Release }) {
  const initialState: MarketingCopyState = {
    result: release.marketingCopy,
  };
  const [state, formAction] = useFormState(getMarketingCopy, initialState);
  const { toast } = useToast();
  
  useEffect(() => {
    if (state.error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: state.error,
      })
    }
  }, [state.error, toast])

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>AI Marketing Copy</CardTitle>
          <CardDescription>
            Generate social media posts and press release snippets for this
            track.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <input type="hidden" name="songTitle" value={release.title} />
          <input type="hidden" name="artistName" value={release.artist} />
          <input type="hidden" name="genre" value={release.genre} />

          <div className="grid gap-2">
            <Label htmlFor="moodKeywords">Mood Keywords</Label>
            <Input
              id="moodKeywords"
              name="moodKeywords"
              defaultValue={release.moodKeywords.join(', ')}
              placeholder="e.g., futuristic, energetic, nostalgic"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="uniqueSellingPoints">Unique Selling Points</Label>
            <Textarea
              id="uniqueSellingPoints"
              name="uniqueSellingPoints"
              defaultValue={release.uniqueSellingPoints}
              placeholder="e.g., Features a collaboration with..."
            />
          </div>

          {state.result && (
            <div className="grid gap-4 rounded-lg border bg-muted/50 p-4">
              <div className="grid gap-2">
                <Label htmlFor="socialMediaPost">Social Media Post</Label>
                <Textarea
                  id="socialMediaPost"
                  name="socialMediaPost"
                  defaultValue={state.result.socialMediaPost}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pressReleaseSnippet">Press Release Snippet</Label>
                <Textarea
                  id="pressReleaseSnippet"
                  name="pressReleaseSnippet"
                  defaultValue={state.result.pressReleaseSnippet}
                />
              </div>
               <div className="grid gap-2">
                <Label htmlFor="hashtags">Hashtags</Label>
                <Input
                  id="hashtags"
                  name="hashtags"
                  defaultValue={state.result.hashtags.join(', ')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="callToAction">Call to Action</Label>
                <Input
                  id="callToAction"
                  name="callToAction"
                  defaultValue={state.result.callToAction}
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between gap-2">
          <SubmitButton />
          {state.result && (
            <Button variant="outline" className='w-full'>
              <Save className="mr-2 h-4 w-4" /> Save
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
