import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '../ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import type { Post } from '@/lib/supabase/types';

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Card className='h-[600px] overflow-hidden rounded-2xl border border-gray-200 pt-0 shadow-md transition-shadow duration-300 hover:shadow-lg'>
      <CardHeader className='p-0'>
        <div className='relative h-64 w-full'>
          <Image
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.img_path}`}
            alt={`${post.title}-${post.excerpt}-${post.category}`}
            fill
            className='object-cover'
            unoptimized
          />
        </div>
      </CardHeader>

      <CardContent className='space-y-4 p-6'>
        <div className='flex items-center justify-between'>
          <Badge
            variant='secondary'
            className='text-xs tracking-wide uppercase'
          >
            {post.category}
          </Badge>
          <div className='flex items-center gap-1 text-sm text-gray-500'>
            <Calendar size={14} />
            {new Date(post.published_at!).toLocaleDateString()}
          </div>
        </div>

        <CardTitle className='text-xl leading-tight font-semibold'>
          {post.title}
        </CardTitle>

        <p className='line-clamp-3 text-sm text-gray-600 dark:text-gray-200'>
          {post.excerpt}
        </p>
      </CardContent>

      <CardFooter className='mt-auto'>
        <Link
          href={`/blog/${post.slug}`}
          className='text-primary font-medium hover:underline'
        >
          Read more →
        </Link>
      </CardFooter>
    </Card>
  );
}
