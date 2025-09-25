import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 flex items-center space-x-2 md:mb-0">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">ScholarSync</span>
          </div>
          <div className="flex space-x-6 text-sm text-foreground/60">
            <Link href="/about" className="hover:text-foreground/80">About Us</Link>
            <Link href="/contact" className="hover:text-foreground/80">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-foreground/80">Privacy Policy</Link>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-foreground/60">
          © {new Date().getFullYear()} ScholarSync. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
