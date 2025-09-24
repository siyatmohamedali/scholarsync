import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScholarshipCard } from '@/components/scholarship-card';
import { scholarships } from '@/lib/data';
import { Search } from 'lucide-react';
import { AdBanner } from '@/components/ad-banner';

export default function ScholarshipsPage() {
  const categories = [...new Set(scholarships.map(s => s.category))];
  const allScholarships = [...scholarships, ...scholarships.map(s => ({...s, id: s.id + '1'}))];

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">Explore Scholarships</h1>
        <p className="mx-auto mt-2 max-w-2xl text-lg text-foreground/80">Find the perfect scholarship to fuel your dreams.</p>
      </header>

      <div className="mb-8">
        <AdBanner className="mx-auto h-24 w-full max-w-4xl" />
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {allScholarships.map((scholarship) => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
