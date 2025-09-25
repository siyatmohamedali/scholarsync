'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/ad-banner';
import { ScholarshipCard } from '@/components/scholarship-card';
import { BlogPostCard } from '@/components/blog-post-card';
import { blogPosts } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useCollection } from '@/firebase';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useMemo } from 'react';
import type { Scholarship } from '@/lib/types';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');
  const firestore = useFirestore();

  const scholarshipsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'scholarships'), orderBy('deadline', 'desc'), limit(2));
  }, [firestore]);

  const { data: scholarships, isLoading } = useCollection<Scholarship>(scholarshipsQuery);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-4 text-center">
          <h1 className="font-headline text-4xl font-bold drop-shadow-lg md:text-6xl">
            Find Your Future Funding
          </h1>
          <p className="mt-4 max-w-2xl text-lg drop-shadow md:text-xl">
            ScholarSync connects you with scholarships for every passion, from academics to athletics.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/scholarships">
              Explore Scholarships <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="w-full lg:w-2/3">
            {/* Featured Scholarships */}
            <section>
              <h2 className="mb-6 font-headline text-3xl font-bold">Featured Scholarships</h2>
              {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {!isLoading && scholarships && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {scholarships.map((scholarship) => (
                    <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                  ))}
                </div>
              )}
              {!isLoading && !scholarships?.length && (
                <div className="text-center text-muted-foreground py-12">
                    No scholarships to display yet.
                </div>
              )}
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href="/scholarships">View All Scholarships</Link>
                </Button>
              </div>
            </section>

            {/* Recent Blog Posts */}
            <section className="mt-16">
              <h2 className="mb-6 font-headline text-3xl font-bold">From Our Blog</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {blogPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button asChild variant="outline">
                  <Link href="/blog">More Blog Posts</Link>
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar for Ads */}
          <aside className="w-full space-y-8 lg:w-1/3">
            <h3 className="font-headline text-xl font-bold">Sponsors</h3>
            <AdBanner location="sidebar-1" className="h-64" />
            <AdBanner location="sidebar-2" className="h-96" />
          </aside>
        </div>
      </div>
    </div>
  );
}
