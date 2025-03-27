import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from 'lucide-react';
import { Tables } from '@/lib/supabase/database';

export function BlogPostPreview({ post }: { post: Tables<'posts'> }) {
  return (
    <Card className="w-full max-w-lg">
      <CardContent className="p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-2 line-clamp-2">
          {post.title}
        </h2>
        <div className="flex items-center mb-2">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {new Date(post.created_at).toLocaleDateString()}
        </div>
        <p className="mb-2">
          By: {post.author}
        </p>
        <p className="line-clamp-3 mb-4">
          {post.brief_description}
        </p>
        <div className="mt-auto">
          <Button asChild className="w-full">
            <Link href={`/blog/${post.id}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

