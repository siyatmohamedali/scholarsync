'use client';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScholarshipCard } from '@/components/scholarship-card';
import { Search, Loader2 } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { useMemo } from 'react';
import { Scholarship } from '@/lib/types';

export default function ScholarshipsPage() {
  const firestore = useFirestore();
  
  const scholarshipsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'scholarships'));
  }, [firestore]);

  const { data: scholarships, isLoading } = useCollection<Scholarship>(scholarshipsQuery);

  const categories = useMemo(() => {
    if (!scholarships) return [];
    return [...new Set(scholarships.map(s => s.category))];
  }, [scholarships]);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Explore Scholarships</h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-foreground/80">Find the perfect scholarship to fuel your dreams.</p>
      </header>

      <div className="mb-8">
        <AdBanner location="scholarships-banner" className="mx-auto h-24 w-full max-w-4xl" />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 rounded-lg border bg-card p-6 shadow-sm">
            <h3 className="mb-4 font-headline text-xl font-semibold">Filter & Search</h3>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search scholarships..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Deadline</SelectItem>
                  <SelectItem value="amount_desc">Amount (High to Low)</SelectItem>
                  <SelectItem value="amount_asc">Amount (Low to High)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </aside>

        {/* Scholarship List */}
        <main className="lg:col-span-3">
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
            <div className="flex justify-center items-center h-64 text-muted-foreground">
                <p>No scholarships found.</p>
            </div>
           )}
        </main>
      </div>
    </div>
  );
}
