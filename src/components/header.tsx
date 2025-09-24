"use client";

import Link from 'next/link';
import { GraduationCap, Menu, LogIn, LogOut, ShieldCheck, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useUser, useAuth } from '@/firebase';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  if (pathname.startsWith('/admin') || pathname.startsWith('/login')) {
    return null;
  }

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
    toast({ title: 'Logged out successfully.' });
    router.push('/');
  };

  const navItems = [
    { href: '/scholarships', label: 'Scholarships' },
    { href: '/blog', label: 'Blog' },
  ];

  const AdminButton = () => {
    if (isUserLoading) {
      return <Button variant="ghost" size="icon" disabled><Loader2 className="h-4 w-4 animate-spin" /></Button>;
    }

    if (user) {
      return (
        <>
          <Button asChild variant="ghost">
            <Link href="/admin">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Admin
            </Link>
          </Button>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </>
      );
    }

    return (
      <Button asChild variant="ghost">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Admin Login
        </Link>
      </Button>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">ScholarSync</span>
          </Link>
          <nav className="hidden gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href ? "text-foreground" : "text-foreground/60"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="hidden md:flex">
            <AdminButton />
          </div>
          
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <Link href="/" className="mb-8 flex items-center space-x-2">
                  <GraduationCap className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline">ScholarSync</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                       <Link
                        href={item.href}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary",
                          pathname === item.href ? "text-primary" : ""
                        )}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                   <SheetClose asChild>
                       <Link
                        href={user ? "/admin" : "/login"}
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        {user ? 'Admin Dashboard' : 'Admin Login'}
                      </Link>
                    </SheetClose>
                    {user && (
                       <SheetClose asChild>
                          <Button variant="ghost" onClick={handleLogout} className="justify-start text-lg font-medium">
                            <LogOut className="mr-2 h-5 w-5" />
                            Logout
                          </Button>
                       </SheetClose>
                    )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
