'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ModeToggle } from '@/components/theme-toggle';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog' },
  { name: 'Episodes', href: '/episodes' },
  { name: 'Coaching Sessions', href: '/coaching' },
  { name: 'About', href: '/about' },
];

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className='font-jetbrains bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full backdrop-blur'>
      <div className='container flex h-16 items-center justify-between px-4 md:px-6'>
        {/* Logo/Brand */}
        <Link href='/' className='flex items-center space-x-2'>
          <div className='flex flex-col'>
            <span className='text-lg font-bold tracking-tight'>
              {"Athlete's Resilience Center"}
            </span>
            <span className='text-muted-foreground hidden text-xs sm:block'>
              Find Your Performance Arc
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden items-center space-x-6 text-sm font-medium md:flex'>
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'hover:text-foreground/80 transition-colors',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className='hidden items-center space-x-2 md:flex'>
          <ModeToggle />
        </div>

        {/* Mobile Navigation */}
        <div className='flex items-center space-x-2 md:hidden'>
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTitle className='sr-only'>Navigation</SheetTitle>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon' className='h-9 w-9'>
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='right' className='w-[300px] sm:w-[400px]'>
              <div className='mt-6 flex flex-col space-y-4'>
                <div className='flex items-center justify-between'>
                  <span className='font-jetbrains text-lg font-semibold'>
                    Navigation
                  </span>
                </div>
                <nav className='mx-2 flex flex-col space-y-3'>
                  {navigation.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        'hover:text-foreground/80 flex items-center py-2 text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'text-foreground'
                          : 'text-foreground/60'
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
