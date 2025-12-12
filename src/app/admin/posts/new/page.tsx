import { checkUser } from '@/lib/supabase/model';
import { redirect } from 'next/navigation';
import { CreatePostForm } from '@/components/admin/create-post-form';
import BackButton from '@/components/admin/back-button';

export default async function Page() {
  const { err } = await checkUser();
  if (err) {
    console.log('ERROR WITH AUTH');
    redirect('/admin/login');
  }
  return (
    <section className='mx-auto max-w-7xl'>
      <div>
        <h1 className='text-4xl'>Admin Portal - Posts - New</h1>
        <BackButton href='/admin/posts' />
      </div>
      <div>
        <CreatePostForm />
      </div>
    </section>
  );
}
