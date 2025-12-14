import { EditPostForm } from '@/components/admin/edit-post-form';
import { queryPosts, checkUser } from '@/lib/supabase/model';
import { redirect } from 'next/navigation';

import BackButton from '@/components/admin/back-button';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const postId = (await params).id;
  const { data, error } = await queryPosts({
    filter: {
      id: postId,
    },
  });

  if (error || !data) {
    redirect('/admin');
  }
  
  return (
    <section className='mx-auto max-w-7xl'>
      <div>
        <h1 className='text-4xl'>
          Admin Portal - Posts - Edit - {data[0].title}
        </h1>
        <BackButton href='/admin/posts' />
      </div>
      <EditPostForm post={data[0]} />
    </section>
  );
}
