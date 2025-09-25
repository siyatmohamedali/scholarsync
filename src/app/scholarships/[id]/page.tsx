'use client';

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useFirestore } from '@/firebase';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import type { Scholarship } from '@/lib/types';
import { Loader2, Calendar, DollarSign, Target, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdBanner } from '@/components/ad-banner';

export default function ScholarshipDetailPage() {
  const params = useParams();
  const firestore = useFirestore();
  const id = typeof params.id === 'string' ? params.id : '';

  const scholarshipRef = useMemo(() => {
    if (!firestore || !id) return null;
    return doc(firestore, 'scholarships', id);
  }, [firestore, id]);

  const { data: scholarship, isLoading } = useDoc<Scholarship>(scholarshipRef);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-4xl font-bold">Scholarship Not Found</h1>
        <p className="mt-4 text-lg text-foreground/80">
          The scholarship you are looking for does not exist or may have been removed.
        </p>
        <Button asChild className="mt-8">
          <Link href="/scholarships">Back to Scholarships</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
       <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
        <main className="lg:col-span-2">
            <div className="relative mb-8 h-80 w-full overflow-hidden rounded-lg">
                 <Image
                    src={scholarship.imageUrl}
                    alt={scholarship.title}
                    fill
                    className="object-cover"
                    data-ai-hint={scholarship.imageHint}
                />
            </div>

            <Badge variant="secondary" className="mb-4">{scholarship.category}</Badge>
            <h1 className="mb-4 font-headline text-4xl font-bold">{scholarship.title}</h1>

            <div className="mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-foreground/80">
                <div className="flex items-center">
                    <DollarSign className="mr-2 h-5 w-5" />
                    <span className="text-lg font-semibold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(scholarship.amount)}</span>
                </div>
                <div className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
                </div>
            </div>

            <div className="prose prose-lg max-w-none text-foreground/90">
                <p>{scholarship.description}</p>
            </div>
            
            <div className="mt-8">
                <h3 className="mb-4 font-headline text-2xl font-bold">Eligibility</h3>
                <ul className="list-inside list-disc space-y-2">
                    {scholarship.eligibility.map((item, index) => (
                        <li key={index} className="flex items-center">
                           <Target className="mr-3 h-5 w-5 text-primary" /> 
                           <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
             <Button asChild size="lg" className="mt-12 w-full md:w-auto">
              <Link href={scholarship.link} target="_blank" rel="noopener noreferrer">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
        </main>
        <aside className="space-y-8 lg:col-span-1">
            <h3 className="font-headline text-xl font-bold">Sponsors</h3>
            <AdBanner location="sidebar-1" className="h-64" />
            <AdBanner location="sidebar-2" className="h-96" />
        </aside>
       </div>
    </div>
  );
}
