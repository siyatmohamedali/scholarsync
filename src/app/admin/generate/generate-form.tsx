'use client';

import { useActionState, useEffect, useState, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Loader2, Save } from 'lucide-react';
import type { GenerateScholarshipPostOutput } from '@/ai/flows/generate-scholarship-post';
import { useRouter } from 'next/navigation';
import { useFirestore, useUser } from '@/firebase';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection } from 'firebase/firestore';


const initialGenerateState = {
  message: '',
  data: null,
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

function SaveButton({ onSave, isSaving }: { onSave: () => void; isSaving: boolean }) {
    const { user, isUserLoading } = useUser();
    const isDisabled = isSaving || isUserLoading || !user;

    return (
        <Button onClick={onSave} disabled={isDisabled} className="w-full">
            {isSaving || isUserLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save & Publish Post
        </Button>
    )
}

export function GenerateForm() {
  const [generateState, formAction] = useActionState(generateAction, initialGenerateState);
  const { toast } = useToast();
  const [generatedPost, setGeneratedPost] = useState<GenerateScholarshipPostOutput | null>(null);
  const router = useRouter();
  const firestore = useFirestore();
  const [isSaving, startSavingTransition] = useTransition();

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

  const handleSave = (form: HTMLFormElement) => {
    if (!firestore) {
        toast({ variant: 'destructive', title: 'Error', description: 'Firestore is not available.' });
        return;
    }
    
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const description = formData.get('content') as string;
    const link = formData.get('applicationLink') as string;
    const amount = Number(formData.get('amount'));
    const deadline = formData.get('deadline') as string;
    const eligibility = (formData.get('eligibility') as string).split(',').map(s => s.trim());
    const category = formData.get('category') as string;

    if (!title || !description || !link || !deadline || !eligibility.length || !category) {
        toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please fill out all required fields.' });
        return;
    }
    
    startSavingTransition(() => {
        const scholarshipsCollection = collection(firestore, 'scholarships');
        
        const newScholarship = {
          title,
          description,
          link,
          amount,
          deadline: new Date(deadline).toISOString(),
          eligibility,
          category,
          imageUrl: `https://picsum.photos/seed/${Math.random()}/600/400`,
          imageHint: category.toLowerCase(),
        };
        
        addDocumentNonBlocking(scholarshipsCollection, newScholarship)
            .then(() => {
                toast({
                    title: 'Success!',
                    description: 'Scholarship saved successfully.',
                });
                setGeneratedPost(null);
                router.push('/admin/scholarships');
            })
            .catch((e) => {
                 const error = e instanceof Error ? e.message : 'An unknown error occurred.';
                 toast({
                     variant: 'destructive',
                     title: 'Error saving post',
                     description: error,
                 });
            });
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <Card className="flex flex-col">
        <form action={formAction} className="flex flex-col flex-grow">
          <CardHeader>
            <CardTitle>Generate Scholarship Post</CardTitle>
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
                  className="min-h-[300px] flex-grow"
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
        <form id="save-scholarship-form" className="flex flex-col flex-grow" onSubmit={(e) => e.preventDefault()}>
            <CardHeader>
              <CardTitle>Generated Output</CardTitle>
              <CardDescription>Review and edit the generated scholarship post.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                {generatedPost ? (
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" defaultValue={generatedPost.title} required/>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" defaultValue={generatedPost.content} rows={10} required/>
                        </div>
                        <div className="space-y-1.5">
                            <Label htmlFor="applicationLink">Application Link</Label>
                            <Input id="applicationLink" name="applicationLink" defaultValue={generatedPost.applicationLink} required/>
                        </div>
                         {/* Adding other fields from scholarship type */}
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label htmlFor="amount">Amount</Label>
                                <Input id="amount" name="amount" type="number" defaultValue="0" required/>
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="deadline">Deadline</Label>
                                <Input id="deadline" name="deadline" type="date" required/>
                            </div>
                        </div>
                         <div className="space-y-1.5">
                            <Label htmlFor="eligibility">Eligibility (comma-separated)</Label>
                            <Input id="eligibility" name="eligibility" placeholder="e.g. Undergraduate, US Citizen" required/>
                        </div>
                         <div className="space-y-1.5">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" placeholder="e.g. Academic, Arts" required/>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-muted-foreground">
                        <Wand2 className="mb-4 h-12 w-12" />
                        <p>Your generated post will appear here.</p>
                    </div>
                )}
            </CardContent>
            {generatedPost && (
                <CardFooter>
                     <SaveButton onSave={() => handleSave(document.getElementById('save-scholarship-form') as HTMLFormElement)} isSaving={isSaving} />
                </CardFooter>
            )}
        </form>
      </Card>
    </div>
  );
}
