
import { CreatePostForm } from '@/components/admin/create-post-form';
import BackButton from '@/components/admin/back-button';

export default async function Page() {
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
