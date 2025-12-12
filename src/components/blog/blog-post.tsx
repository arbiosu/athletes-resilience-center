'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import MarkdownRenderer from '@/components/blog/markdown-renderer';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { type Post } from '@/lib/supabase/types';

export default function BlogPost({ post }: { post: Post }) {
  const [copySuccess, setCopySuccess] = useState<string>('');

  async function copyToClipboard() {
    await navigator.clipboard.writeText(location.href);
    setCopySuccess('Link to Blog Post has been Copied to Clipboard!');
  }

  // 200 words per minute
  const wordCount = post.content?.split(/\s+/).length ?? 0;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <section className='bg-background min-h-screen'>
      <header className='border-border bg-card/50 sticky top-0 z-50 border-b backdrop-blur-sm'>
        <div className='container mx-auto flex max-w-5xl items-center justify-between px-4 py-4'>
          <Link
            href='/blog'
            className='text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm font-medium transition-colors'
          >
            <ArrowLeft className='h-4 w-4' />
            Back to blog
          </Link>
          {!copySuccess ? (
            <Button onClick={copyToClipboard} variant='ghost' size='icon'>
              <Share2 className='h-4 w-4' />
            </Button>
          ) : (
            <p className='font-jetbrains text-blue-500'>Link copied!</p>
          )}
        </div>
      </header>
      <article className='container mx-auto max-w-4xl px-4 py-12'>
        <div className='mb-6 flex items-center gap-4'>
          {post.category && (
            <Badge
              variant='secondary'
              className='text-xs font-semibold tracking-wider uppercase'
            >
              {post.category}
            </Badge>
          )}

          <div className='text-muted-foreground flex items-center gap-4 text-sm'>
            <div className='flex items-center gap-1.5'>
              <Calendar className='h-4 w-4' />
              <time dateTime={post.published_at!}>
                {new Date(post.published_at!).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </time>
            </div>
            <div className='flex items-center gap-1.5'>
              <Clock className='h-4 w-4' />
              <span>{readingTime} min read</span>
            </div>
          </div>
        </div>
        <h1 className='text-foreground mb-6 text-4xl leading-tight font-bold text-balance md:text-5xl lg:text-6xl'>
          {post.title}
        </h1>
        {post.excerpt && (
          <p className='text-muted-foreground mb-12 text-xl leading-relaxed text-pretty'>
            {post.excerpt}
          </p>
        )}
        {post.img_path && (
          <div className='relative mb-12 h-[400px] w-full overflow-hidden rounded-xl shadow-lg md:h-[500px]'>
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.img_path}`}
              alt={post.title}
              fill
              className='object-cover'
              priority
              unoptimized
            />
          </div>
        )}
        <MarkdownRenderer content={post.content!} />
        {post.tags && post.tags.length > 0 && (
          <div className='border-border mt-16 border-t pt-8'>
            <div className='flex flex-wrap gap-2'>
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant='outline'
                  className='text-sm font-normal'
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </article>
      <footer className='border-border bg-muted/30 mt-20 border-t py-12'>
        <div className='container mx-auto max-w-4xl px-4 text-center'>
          <Link
            href='/blog'
            className='text-primary inline-flex items-center gap-2 text-sm font-medium hover:underline'
          >
            <ArrowLeft className='h-4 w-4' />
            Return to all articles
          </Link>
        </div>
      </footer>
    </section>
  );
}
