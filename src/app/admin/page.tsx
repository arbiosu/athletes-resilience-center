'use server';

import Link from 'next/link';
import { checkUser } from '@/lib/supabase/model';
import { redirect } from 'next/navigation';
import SignOutButton from '@/components/admin/signout-button';

import { Button } from '@/components/ui/button';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    console.log('ERROR WITH AUTH');
    redirect('/admin/login');
  } else {
    return (
      <section className='flex min-h-screen flex-col items-center justify-center gap-8'>
        <div>
          <h1 className='text-4xl sm:text-6xl'>ARC Admin Portal</h1>
        </div>
        <Button asChild size={'lg'} className='max-w-lg'>
          <Link href='/admin/posts'>Manage Posts</Link>
        </Button>
        <SignOutButton />
      </section>
    );
  }
}
