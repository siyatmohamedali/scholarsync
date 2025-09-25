'use client';

import { useMemo, useState, useTransition } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCollection, useFirestore } from '@/firebase';
import { collection, query, doc } from 'firebase/firestore';
import { updateDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import type { AdPlacement } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const adPlacementSchema = z.object({
  location: z.string().min(1, 'Location is required'),
  code: z.string().min(1, 'Ad code is required'),
  enabled: z.boolean(),
});

type AdPlacementFormData = z.infer<typeof adPlacementSchema>;

export default function AdminAdsPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [selectedAd, setSelectedAd] = useState<AdPlacement | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const adsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'ad_placements'));
  }, [firestore]);

  const { data: ads, isLoading } = useCollection<AdPlacement>(adsQuery);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdPlacementFormData>({
    resolver: zodResolver(adPlacementSchema),
    defaultValues: {
      location: '',
      code: '',
      enabled: true,
    },
  });

  const handleEditClick = (ad: AdPlacement) => {
    setSelectedAd(ad);
    reset({ location: ad.location, code: ad.code, enabled: ad.enabled });
    setIsDialogOpen(true);
  };
  
  const handleAddNewClick = () => {
    setSelectedAd(null);
    reset({ location: '', code: '', enabled: true });
    setIsDialogOpen(true);
  };

  const onSubmit = (data: AdPlacementFormData) => {
    if (!firestore) return;
    startTransition(async () => {
      try {
        if (selectedAd) {
          // Update existing ad
          const adRef = doc(firestore, 'ad_placements', selectedAd.id);
          updateDocumentNonBlocking(adRef, data);
          toast({ title: 'Success', description: 'Ad placement updated successfully.' });
        } else {
          // Add new ad
          const adsCollection = collection(firestore, 'ad_placements');
          await addDocumentNonBlocking(adsCollection, data);
          toast({ title: 'Success', description: 'Ad placement added successfully.' });
        }
        setIsDialogOpen(false);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to save ad placement.',
        });
      }
    });
  };

  const handleToggle = (ad: AdPlacement) => {
    if (!firestore) return;
    const adRef = doc(firestore, 'ad_placements', ad.id);
    updateDocumentNonBlocking(adRef, { enabled: !ad.enabled });
    toast({
      title: ad.enabled ? 'Ad Disabled' : 'Ad Enabled',
      description: `Ad placement for "${ad.location}" has been updated.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Ad Placements</CardTitle>
            <CardDescription>Manage your website's ad placements.</CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
               <Button onClick={handleAddNewClick}>Add New Ad</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedAd ? 'Edit' : 'Add'} Ad Placement</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" {...register('location')} placeholder="e.g., sidebar-top, article-bottom" />
                    {errors.location && <p className="text-sm text-destructive">{errors.location.message}</p>}
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="code">Ad Code</Label>
                    <Textarea id="code" {...register('code')} placeholder="Paste your AdSense code snippet here" rows={6}/>
                    {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
                </div>
                <div className="flex items-center space-x-2">
                    <Controller
                        name="enabled"
                        control={control}
                        render={({ field }) => (
                            <Switch
                                id="enabled"
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        )}
                    />
                    <Label htmlFor="enabled">Enabled</Label>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit" disabled={isPending}>
                        {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Save'}
                    </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {!isLoading && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ads?.map((ad) => (
                <TableRow key={ad.id}>
                  <TableCell className="font-medium">{ad.location}</TableCell>
                  <TableCell>
                    <Switch
                      checked={ad.enabled}
                      onCheckedChange={() => handleToggle(ad)}
                      aria-label={`Toggle ad for ${ad.location}`}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => handleEditClick(ad)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
         {!isLoading && !ads?.length && (
            <div className="text-center text-sm text-muted-foreground py-12">
                No ad placements found. Add your first one to get started.
            </div>
        )}
      </CardContent>
    </Card>
  );
}
