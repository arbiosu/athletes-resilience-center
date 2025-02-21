import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"

interface Post {
    title: string,
    author: string,
    brief_description: string,
    content: string,
    created_at: string,
    picture_url: string,
}

export default function BlogPost({ post }: { post: Post }) {
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/${post.picture_url}`
    return (
        <div className="py-20">
            <Card className="max-w-3xl mx-auto my-8 px-4">
            <div className="relative aspect-video">
                <Image
                    src={url || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg pt-6"
            />
            </div>
            <CardHeader>
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="text-sm text-muted-foreground">
                By {post.author} | {new Date(post.created_at).toLocaleDateString()}
                </div>
            </CardHeader>
            <CardContent>
                <p className="py-4 text-lg font-medium mb-4 text-muted-foreground">{post.brief_description}</p>
                <div className="prose max-w-none">
                    {post.content.split('\n').map((line, index) => 
                        <p key={index} className="mb-4">{line}</p>
                    )}
                </div>
            </CardContent>
            </Card>
        </div>
    )
}