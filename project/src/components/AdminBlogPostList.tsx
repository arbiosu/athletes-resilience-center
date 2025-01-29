import { redirect } from 'next/navigation'
import { getBlogPosts } from "@/lib/supabase/model"
import BlogPostItem from "@/components/AdminBlogPostItem"

export default async function BlogPostList() {
    const { data, error } = await getBlogPosts()
    if (error) {
        redirect('/admin/error')
    }
    return (
        <div>
        {data?.map((post) => (
            <BlogPostItem key={post.id} post={post} />
        ))}
        </div>

    )
}
