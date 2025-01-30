import { getBlogContentById } from "@/lib/supabase/model"
import { redirect } from "next/navigation"
import BlogPost from "@/components/BlogPost"


export default async function Page({ params }: { params: Promise<{ slug: number }>}) {
    const blogId = (await params).slug
    const { data, error } = await getBlogContentById(blogId)
    if (error || !data) {
        redirect('/blog')
    }

    const post = {
        title: data.title ?? "",
        author: data.author ?? "",
        brief_description: data.brief_description ?? "",
        content: data.content ?? "",
        created_at: data.created_at ?? ""
    }

    return <BlogPost post={post ?? ""} />
}
