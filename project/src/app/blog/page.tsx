"use server";

import { getBlogPosts } from "@/lib/supabase/model"
import { BlogPostPreview } from "@/components/BlogPreview";


export default async function Blog() {
    const { data, error } = await getBlogPosts()
    if (error) {
        return <h1>Error</h1>
    }
    return (
        <main className="min-h-screen bg-gradient-to-t from-gray-50 to-logoGreen">
            <div className="container mx-auto px-4 pt-20 pb-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-12 text-center">
                    The Athlete&apos;s Resilience Blog
                </h1>
                <p className="text-2xl text-center py-10">Overall description of the blog posts here</p>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((blog) => (
                        <BlogPostPreview key={blog.id} post={blog} />
                    ))}
                </div>
            </div>
        </main>
    )
}
