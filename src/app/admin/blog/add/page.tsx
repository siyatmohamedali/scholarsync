import { AddPostForm } from './add-post-form';

export default function AddBlogPostPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Add New Blog Post</h1>
        <p className="mt-1 text-foreground/80">
          Create a new article for your blog.
        </p>
      </header>
      <AddPostForm />
    </div>
  );
}
