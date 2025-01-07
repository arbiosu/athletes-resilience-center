import Link from 'next/link'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'
import { Tables } from '@/lib/types/supabase'

export function BlogPostPreview({ post }: { post: Tables<'posts'> }) {
    return (
        <Card className="overflow-hidden bg-gray-800 border-gray-700 flex flex-col h-[400px] w-[400px]">
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
            </div>
          <CardContent className="p-4">
            <h2 className="text-2xl font-bold mb-2 line-clamp-2 text-white flex-shrink-0">{post.title}</h2>
            <p className="text-gray-400 mb-2 flex items-center flex-shrink-0">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="line-clamp-3 text-gray-300 flex-grow">{post.brief_description}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild className="bg-[#16561E] hover:bg-[#1e6b26] text-white w-full">
              <Link href={`/blog/${post.id}`}>Read More</Link>
            </Button>
          </CardFooter>
        </Card>
      )
    }

