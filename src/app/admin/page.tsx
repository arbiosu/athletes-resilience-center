'use server';

import { checkUser } from '@/lib/supabase/model';
import { redirect } from 'next/navigation';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    console.log('ERROR WITH AUTH');
    redirect('/admin/login');
  } else {
    return (
      <section className='flex flex-col items-center gap-8'>
        <div>
          <h1 className='text-4xl sm:text-6xl'>ARC Admin Portal</h1>
        </div>
      </section>
    );
  }
}
