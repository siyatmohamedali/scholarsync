'use server';

import { generateScholarshipPost, GenerateScholarshipPostInput, GenerateScholarshipPostOutput } from '@/ai/flows/generate-scholarship-post';

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
