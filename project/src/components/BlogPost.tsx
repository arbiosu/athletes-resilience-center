import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface Post {
    title: string,
    author: string,
    brief_description: string,
    content: string,
    created_at: string,
}

export default function BlogPost({ post }: { post: Post }) {
    return (
        <div className="py-20">
            <Card className="max-w-3xl mx-auto my-8">
            <CardHeader>
                <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
                <div className="text-sm text-muted-foreground">
                By {post.author} | {new Date(post.created_at).toLocaleDateString()}
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-lg font-medium mb-4 text-muted-foreground">{post.brief_description}</p>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
            </Card>
        </div>
    )
}