
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import BackButton from '@/components/admin/back-button';
import { queryPosts } from '@/lib/supabase/model';
import AdminPostCard from '@/components/admin/post-card';

import { checkUser } from '@/lib/supabase/model';

export default async function Page() {
  const { data, error, count } = await queryPosts({ count: 'exact' });

  if (error || count === null) {
    return <p>Could not fetch posts.</p>;
  }

  return (
    <section className='mx-auto max-w-7xl'>
      <div>
        <h1 className='text-center text-4xl sm:text-6xl'>Manage Posts</h1>
      </div>
      <div className='p-2'>
        <BackButton href='/admin' />
      </div>

      {data ? (
        <div className='grid grid-cols-3 items-center'>
          {data.map((post) => (
            <AdminPostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>No Posts yet.</p>
      )}
      <div className='p-10'>
        <Button asChild>
          <Link href='/admin/posts/new'>Create New Post</Link>
        </Button>
      </div>
    </section>
  );
}
