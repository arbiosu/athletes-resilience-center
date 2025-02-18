import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { Tables } from '@/lib/supabase/database'

export function BlogPostPreview({ post }: { post: Tables<'posts'> }) {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.picture_url}`
  return (
    <Card className="w-full max-w-md h-[500px]">
      <div className="relative h-48">
        <Image
          src={url || ''}
          alt={post.title || ''}
          fill
          className="object-cover rounded-t-md"
          priority
        />
      </div>
      <CardContent className="p-6 flex flex-col h-[calc(500px-192px)]"> {/* 192px = 12rem (h-48) */}
        <h2 className="text-2xl font-bold mb-2 line-clamp-2 text-emerald-950 dark:text-emerald-50">
          {post.title}
        </h2>
        <div className="flex items-center mb-2 text-white">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {new Date(post.created_at).toLocaleDateString()}
        </div>
        <p className="text-white mb-2">
          By: {post.author}
        </p>
        <p className="line-clamp-3 text-white mb-4">
          {post.brief_description}
        </p>
        <div className="mt-auto">
          <Button asChild variant="custom" className="w-full">
            <Link href={`/blog/${post.id}`}>Read More</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

