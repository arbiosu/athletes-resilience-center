'use client';

import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
  ssr: false,
});

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <article className='mx-auto max-w-3xl'>
        <div className='prose bg-background dark:prose-invert lg:prose-xl rounded-2xl p-6'>
          <div className='animate-pulse'>
            <div className='mb-4 h-4 w-3/4 rounded bg-gray-200'></div>
            <div className='mb-4 h-4 w-1/2 rounded bg-gray-200'></div>
            <div className='h-4 w-5/6 rounded bg-gray-200'></div>
          </div>
        </div>
      </article>
    );
  }

  const currentTheme = resolvedTheme || theme || 'light';

  return (
    <div
      data-color-mode={currentTheme}
      className='prose bg-background dark:prose-invert lg:prose-xl prose prose-lg dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-headings:tracking-tight prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-foreground/90 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-strong:font-semibold prose-ul:my-6 prose-li:text-foreground/90 prose-li:my-2 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-foreground/80 prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded max-w-none'
    >
      <MarkdownPreview source={content} style={{ background: 'transparent' }} />
    </div>
  );
}
