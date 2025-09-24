'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateAction, saveScholarshipAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, CheckCircle, Save } from 'lucide-react';
import type { GenerateScholarshipPostOutput } from '@/ai/flows/generate-scholarship-post';

const initialGenerateState = {
  message: '',
  data: null,
  error: null,
};

const initialSaveState = {
    message: '',
    error: null,
};

function GenerateButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
      Generate Post
    </Button>
  );
}

function SaveButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save & Publish Post
        </Button>
    )
}

export function GenerateForm() {
  const [generateState, formAction] = useFormState(generateAction, initialGenerateState);
  const [saveState, saveAction] = useFormState(saveScholarshipAction, initialSaveState);
  const { toast } = useToast();
  const [generatedPost, setGeneratedPost] = useState<GenerateScholarshipPostOutput | null>(null);

  useEffect(() => {
    if (generateState.error) {
      toast({
        variant: 'destructive',
        title: 'Error generating post',
        description: generateState.error,
      });
    }
    if (generateState.data) {
        setGeneratedPost(generateState.data);
        toast({
            title: 'Success!',
            description: 'Scholarship post generated successfully.',
        })
    }
  }, [generateState, toast]);

  useEffect(() => {
    if (saveState.error) {
      toast({
        variant: 'destructive',
        title: 'Error saving post',
        description: saveState.error,
      });
    }
    if (saveState.message && !saveState.error) {
        toast({
            title: 'Success!',
            description: saveState.message,
        });
        setGeneratedPost(null);
    }
  }, [saveState, toast]);


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
            <GenerateButton />
          </CardFooter>
        </form>
      </Card>

      <Card className="flex flex-col">
        <form action={saveAction}>
            <CardHeader>
              <CardTitle className="font-headline">Generated Output</CardTitle>
              <CardDescription>Review and edit the generated scholarship post.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                {generatedPost ? (
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" defaultValue={generatedPost.title} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" defaultValue={generatedPost.content} rows={10} />
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="applicationLink">Application Link</Label>
                            <Input id="applicationLink" name="applicationLink" defaultValue={generatedPost.applicationLink} />
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-muted-foreground">
                        <Wand2 className="mb-4 h-12 w-12" />
                        <p>Your generated post will appear here.</p>
                    </div>
                )}
            </CardContent>
            {generatedPost && (
                <CardFooter>
                     <SaveButton />
                </CardFooter>
            )}
        </form>
      </Card>
    </div>
  );
}