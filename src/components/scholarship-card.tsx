import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Calendar, DollarSign, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import type { Scholarship } from '@/lib/types';

export function ScholarshipCard({ scholarship }: { scholarship: Scholarship }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={scholarship.imageUrl}
            alt={scholarship.title}
            fill
            className="object-cover"
            data-ai-hint={scholarship.imageHint}
          />
        </div>
        <div className="p-6">
          <Badge variant="secondary" className="mb-2">{scholarship.category}</Badge>
          <CardTitle className="font-headline text-xl">
            <Link href={`/scholarships/${scholarship.id}`} className="hover:text-primary">
              {scholarship.title}
            </Link>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow space-y-4 px-6">
        <p className="text-sm text-foreground/80 line-clamp-3">{scholarship.description}</p>
        <div className="flex items-center text-sm text-foreground/60">
          <DollarSign className="mr-2 h-4 w-4" />
          <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(scholarship.amount)}</span>
        </div>
        <div className="flex items-center text-sm text-foreground/60">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Deadline: {new Date(scholarship.deadline).toLocaleDateString()}</span>
        </div>
         <div className="flex items-center text-sm text-foreground/60">
          <Target className="mr-2 h-4 w-4" />
          <span>{scholarship.eligibility.join(', ')}</span>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6">
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={scholarship.link}>
            Apply Now <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
