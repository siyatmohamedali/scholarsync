import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AdBannerProps {
  className?: string;
}

export function AdBanner({ className }: AdBannerProps) {
  return (
    <Card className={cn('flex items-center justify-center p-6 bg-muted/50', className)}>
      <div className="text-center text-muted-foreground">
        <p className="text-sm">Advertisement</p>
        <p className="text-lg font-semibold">[Ad Space]</p>
      </div>
    </Card>
  );
}
