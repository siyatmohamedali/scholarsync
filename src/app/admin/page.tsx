'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  PlusCircle, 
  Users, 
  TrendingUp,
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useCollection } from '@/firebase/firestore/use-collection';
import { useFirestore } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Scholarship, BlogPost } from '@/lib/types';

export default function AdminPage() {
  const firestore = useFirestore();

  const scholarshipsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'scholarships'));
  }, [firestore]);

  const blogPostsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'blog_posts'));
  }, [firestore]);

  const { data: scholarships, isLoading: scholarshipsLoading } = useCollection<Scholarship>(scholarshipsQuery);
  const { data: blogPosts, isLoading: blogPostsLoading } = useCollection<BlogPost>(blogPostsQuery);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-foreground/80">
          Manage your scholarships and blog content.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Scholarships</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {scholarshipsLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                scholarships?.length || 0
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {blogPostsLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                blogPosts?.length || 0
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Site Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">Coming soon</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Scholarship Management
            </CardTitle>
            <CardDescription>
              Add, edit, and manage scholarship opportunities.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/admin/scholarships">
                  View All Scholarships
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/generate">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Blog Management
            </CardTitle>
            <CardDescription>
              Create and manage blog posts and articles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button asChild>
                <Link href="/admin/blog">
                  View All Posts
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/admin/blog/add">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add New
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
