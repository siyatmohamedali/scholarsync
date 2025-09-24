'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, CheckCircle } from 'lucide-react';
import type { GenerateScholarshipPostOutput } from '@/ai/flows/generate-scholarship-post';

const initialState = {
  message: '',
  data: null,
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Post
    </Button>
  );
}

export function GenerateForm() {
  const [state, formAction] = useFormState(generateAction, initialState);
  const { toast } = useToast();
  const [generatedPost, setGeneratedPost] = useState<GenerateScholarshipPostOutput | null>(null);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
    if (state.data) {
        setGeneratedPost(state.data);
        toast({
            title: 'Success!',
            description: 'Scholarship post generated successfully.',
        })
    }
  }, [state, toast]);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card className="flex flex-col">
        <form action={formAction} className="flex flex-col flex-grow">
          <CardHeader>
            <CardTitle className="font-headline">Generate Scholarship Post</CardTitle>
            <CardDescription>
              Paste unstructured data from a scholarship website to automatically generate a post.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="grid h-full w-full items-center gap-4">
              <div className="flex h-full flex-col space-y-1.5">
                <Label htmlFor="websiteData">Website Data</Label>
                <Textarea
                  id="websiteData"
                  name="websiteData"
                  placeholder="Paste scholarship details here..."
                  className="flex-grow"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>

      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline">Generated Output</CardTitle>
          <CardDescription>Review and edit the generated scholarship post.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
            {generatedPost ? (
                <form className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" defaultValue={generatedPost.title} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" defaultValue={generatedPost.content} rows={10} />
                    </div>
                    <div className="space-y-1.5">
                        <Label htmlFor="applicationLink">Application Link</Label>
                        <Input id="applicationLink" defaultValue={generatedPost.applicationLink} />
                    </div>
                </form>
            ) : (
                <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-muted-foreground">
                    <Wand2 className="mb-4 h-12 w-12" />
                    <p>Your generated post will appear here.</p>
                </div>
            )}
        </CardContent>
        {generatedPost && (
            <CardFooter>
                 <Button className="w-full">
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Save & Publish Post
                </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}
