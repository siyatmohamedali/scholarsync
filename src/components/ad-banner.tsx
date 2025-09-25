'use client';

import { useMemo } from 'react';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import type { AdPlacement } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface AdBannerProps {
  location: string;
  className?: string;
}

export function AdBanner({ location, className }: AdBannerProps) {
  const firestore = useFirestore();

  const adQuery = useMemo(() => {
    if (!firestore) return null;
    return query(
      collection(firestore, 'ad_placements'),
      where('location', '==', location),
      where('enabled', '==', true),
      limit(1)
    );
  }, [firestore, location]);

  const { data: ads, isLoading } = useCollection<AdPlacement>(adQuery);

  const ad = ads?.[0];

  const renderAdPlaceholder = () => (
     <Card className={cn('flex items-center justify-center p-6 bg-muted/50 w-full h-full', className)}>
      <div className="text-center text-muted-foreground">
        <p className="text-sm">Advertisement</p>
        <p className="text-lg font-semibold">{location}</p>
      </div>
    </Card>
  );

  if (isLoading) {
    return (
      <Card className={cn('flex items-center justify-center p-6 bg-muted/50', className)}>
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!ad) {
    return renderAdPlaceholder();
  }

  return (
    <div
      className={cn('w-full flex justify-center items-center', className)}
      dangerouslySetInnerHTML={{ __html: ad.code }}
    />
  );
}
