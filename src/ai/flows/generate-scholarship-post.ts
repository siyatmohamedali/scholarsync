// src/ai/flows/generate-scholarship-post.ts
'use server';

/**
 * @fileOverview Generates a scholarship posting from unstructured data on a website.
 *
 * - generateScholarshipPost - A function that handles the scholarship posting generation process.
 * - GenerateScholarshipPostInput - The input type for the generateScholarshipPost function.
 * - GenerateScholarshipPostOutput - The return type for the generateScholarshipPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateScholarshipPostInputSchema = z.object({
  websiteData: z.string().describe('Unstructured data from the scholarship website.'),
});
export type GenerateScholarshipPostInput = z.infer<typeof GenerateScholarshipPostInputSchema>;

const GenerateScholarshipPostOutputSchema = z.object({
  title: z.string().describe('The title of the scholarship posting.'),
  content: z.string().describe('The content of the scholarship posting.'),
  applicationLink: z.string().describe('The official application link for the scholarship.'),
});
export type GenerateScholarshipPostOutput = z.infer<typeof GenerateScholarshipPostOutputSchema>;

export async function generateScholarshipPost(input: GenerateScholarshipPostInput): Promise<GenerateScholarshipPostOutput> {
  return generateScholarshipPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScholarshipPostPrompt',
  input: {schema: GenerateScholarshipPostInputSchema},
  output: {schema: GenerateScholarshipPostOutputSchema},
  prompt: `You are an expert content writer specializing in creating scholarship postings.

  You will use the data extracted from a website to create a compelling and informative scholarship posting.
  The posting should include a title, detailed content, and the official application link.

  Website Data: {{{websiteData}}}
  `,
});

const generateScholarshipPostFlow = ai.defineFlow(
  {
    name: 'generateScholarshipPostFlow',
    inputSchema: GenerateScholarshipPostInputSchema,
    outputSchema: GenerateScholarshipPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
