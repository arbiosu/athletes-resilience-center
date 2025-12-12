import { notFound } from 'next/navigation';
import { queryPosts } from '@/lib/supabase/model';

import BlogPost from '@/components/blog/blog-post';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const postSlug = (await params).slug;
  const { data, error } = await queryPosts({
    filter: {
      slug: postSlug,
    },
  });

  if (error || !data) {
    notFound();
  }

  return <BlogPost post={data[0]} />;
}
