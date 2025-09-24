'use server';

import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { initializeFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export async function savePostAction(
  prevState: any,
  formData: FormData
): Promise<{ message: string; error: string | null }> {
  const title = formData.get('title') as string;
  const author = formData.get('author') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;

  if (!title || !author || !excerpt || !content) {
    return { message: '', error: 'All fields are required.' };
  }

  try {
    const { firestore } = initializeFirebase();
    const blogPostsCollection = collection(firestore, 'blog_posts');
    
    // Get a random placeholder image for the blog post
    const randomImage = PlaceHolderImages[Math.floor(Math.random() * PlaceHolderImages.length)];

    const newPost = {
      title,
      author,
      excerpt,
      content,
      date: new Date().toISOString(),
      imageUrl: randomImage.imageUrl,
      imageHint: randomImage.imageHint,
    };
    
    await addDoc(blogPostsCollection, newPost);

    revalidatePath('/blog');
    revalidatePath('/admin/blog');

    return { message: 'Blog post saved successfully.', error: null };
  } catch (e) {
    const error = e instanceof Error ? e.message : 'An unknown error occurred.';
    console.error(error);
    return { message: '', error: 'Failed to save blog post.' };
  }
}
