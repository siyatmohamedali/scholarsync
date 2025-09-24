'use server';

import { generateScholarshipPost, GenerateScholarshipPostInput, GenerateScholarshipPostOutput } from '@/ai/flows/generate-scholarship-post';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { collection, getFirestore } from 'firebase/firestore';
import { initializeFirebase } from '@/firebase';

export async function generateAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; data: GenerateScholarshipPostOutput | null; error: string | null }> {
  const websiteData = formData.get('websiteData') as string;

  if (!websiteData) {
    return { message: 'Website data is required.', data: null, error: 'Website data is required.' };
  }

  try {
    const input: GenerateScholarshipPostInput = { websiteData };
    const result = await generateScholarshipPost(input);
    return { message: 'Scholarship post generated successfully.', data: result, error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    console.error(error);
    return { message: 'Failed to generate scholarship post.', data: null, error };
  }
}

export async function saveScholarshipAction(
    prevState: any,
    formData: FormData
  ): Promise<{ message: string; error: string | null }> {
    const title = formData.get('title') as string;
    const description = formData.get('content') as string;
    const link = formData.get('applicationLink') as string;
    const amount = Number(formData.get('amount'));
    const deadline = formData.get('deadline') as string;
    const eligibility = (formData.get('eligibility') as string).split(',').map(s => s.trim());
    const category = formData.get('category') as string;
  
    if (!title || !description || !link || !deadline || !eligibility.length || !category) {
      return { message: 'All fields are required.', error: 'All fields are required.' };
    }
  
    try {
      const { firestore } = initializeFirebase();
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
      
      await addDocumentNonBlocking(scholarshipsCollection, newScholarship);
  
      return { message: 'Scholarship saved successfully.', error: null };
    } catch (e) {
      const error = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(error);
      return { message: 'Failed to save scholarship.', error };
    }
  }
