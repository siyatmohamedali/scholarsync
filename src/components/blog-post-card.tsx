import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogPost } from '@/lib/types';

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/blog/${post.id}`} className="relative block h-48 w-full">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={post.imageHint}
          />
        </Link>
        <div className="p-6">
          <CardTitle className="font-headline text-xl">
             <Link href={`/blog/${post.id}`} className="hover:text-primary">
              {post.title}
            </Link>
          </CardTitle>
          <p className="mt-2 text-sm text-foreground/60">By {post.author} on {new Date(post.date).toLocaleDateString()}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6">
        <p className="text-sm text-foreground/80 line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Link href={`/blog/${post.id}`} className="flex items-center font-semibold text-primary hover:text-primary/80">
          Read More <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
