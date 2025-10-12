import { Input } from '@/components/ui/input';
import { BlogPostCard } from '@/components/blog-post-card';
import { blogPosts } from '@/lib/data';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const allPosts = [...blogPosts, ...blogPosts.map(p => ({...p, id: p.id + '1'})), ...blogPosts.map(p => ({...p, id: p.id + '2'}))];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Our Blog</h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-foreground/80">Tips, advice, and stories to help you on your scholarship journey.</p>
      </header>
      
      <div className="mx-auto mb-8 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search blog posts..." className="pl-10" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {allPosts.map((post) => (
          <BlogPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
