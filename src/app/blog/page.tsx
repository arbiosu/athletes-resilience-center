import Image from 'next/image';
import { queryPosts } from '@/lib/supabase/model';
import BlogCard from '@/components/blog/blog-card';
import SortPanel from '@/components/blog/sort-panel';
import PaginationControls from '@/components/blog/pagination-controls';
import { type SortOrder } from '@/lib/supabase/types';

const PAGE_SIZE = 12;

export default async function Blog(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const sort = Array.isArray(searchParams.sort)
    ? searchParams.sort
    : searchParams.sort
      ? [searchParams.sort]
      : ['date_desc'];

  const page = Array.isArray(searchParams.page)
    ? searchParams.page
    : searchParams.page
      ? [searchParams.page]
      : ['0'];

  const { data, error, count } = await queryPosts({
    count: 'exact',
    filter: {
      isPublished: true,
    },
    sort: {
      order: sort[0] as SortOrder,
    },
    range: {
      pageIndex: Number(page[0]),
      pageSize: PAGE_SIZE,
    },
  });

  if (error || count === null || !data) {
    return <h1 className='text-3xl'>Error loading Blog.</h1>;
  }

  const totalPages = Math.ceil(count / PAGE_SIZE);
  const currentPage = parseInt(page[0]);

  return (
    <main className='font-jetbrains flex min-h-screen flex-col items-center gap-8'>
      <section className='mx-auto flex w-full max-w-7xl flex-col gap-12'>
        <div className='grid grid-cols-3 items-center gap-2'>
          <div className='grid items-center'>
            <h2 className='text-4xl sm:text-6xl'>ARC Blog</h2>
          </div>
          <div className='flex justify-center'>
            <Image
              src={'/logo-no-bg.png'}
              alt='Blog Page'
              height={80}
              width={80}
              unoptimized
            />
          </div>
          <div className='grid justify-items-end'>
            <SortPanel />
          </div>
        </div>
        {data.length < 1 && (
          <div className='flex flex-col items-center'>
            <div>
              <p className='font-jetbrains text-6xl'>No posts yet.</p>
            </div>
          </div>
        )}
        <div className='grid gap-8 lg:grid-cols-3'>
          {data.map((post) => (
            <div key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>
        {data.length >= 1 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            hasNextPage={currentPage < totalPages - 1}
            hasPrevPage={currentPage < 0}
          />
        )}
      </section>
    </main>
  );
}
