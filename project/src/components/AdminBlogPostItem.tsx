"use client"

import type { Tables } from "@/lib/types/supabase"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

interface BlogPostItemProps {
  post: Tables<'posts'>
}

export default function BlogPostItem({ post }: BlogPostItemProps) {
  const handleDelete = () => {
    // Implement delete functionality
    console.log(`Delete post with id: ${post.id}`)
  }

  // TODO: Add author/status to posts
  //<Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">
              By {post.author} • Created on: {new Date(post.created_at).toLocaleDateString()}
            </p>
            <p className="mt-2">{post.brief_description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-black">
        <div className="flex justify-end space-x-2 w-full">
          <Link href={`/admin/edit/${post.id}`}>
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" /> Edit
            </Button>
          </Link>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
