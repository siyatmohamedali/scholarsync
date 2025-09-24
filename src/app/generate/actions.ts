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
    const content = formData.get('content') as string;
    const applicationLink = formData.get('applicationLink') as string;
  
    if (!title || !content || !applicationLink) {
      return { message: 'All fields are required.', error: 'All fields are required.' };
    }
  
    try {
      const { firestore } = initializeFirebase();
      const scholarshipsCollection = collection(firestore, 'scholarships');
      
      // For now, let's use placeholder values for fields not in the form
      const newScholarship = {
        title,
        description: content,
        link: applicationLink,
        amount: 0, // Placeholder
        deadline: new Date().toISOString(), // Placeholder
        eligibility: [], // Placeholder
        category: 'General', // Placeholder
        imageUrl: 'https://picsum.photos/seed/placeholder/600/400', // Placeholder
        imageHint: 'placeholder', // Placeholder
      };
      
      await addDocumentNonBlocking(scholarshipsCollection, newScholarship);
  
      return { message: 'Scholarship saved successfully.', error: null };
    } catch (e) {
      const error = e instanceof Error ? e.message : 'An unknown error occurred.';
      console.error(error);
      return { message: 'Failed to save scholarship.', error };
    }
  }