"use server";

import { getBlogPosts } from "@/lib/supabase/model"
import { BlogPostPreview } from "@/components/BlogPreview";


export default async function Blog() {
    const { data, error } = await getBlogPosts()
    if (error) {
        return <h1>Error</h1>
    }
    return (
        <main className="min-h-screen bg-black py-20">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl mb-12 text-center">
                    The Athlete&apos;s Resilience Blog
                </h1>
                <h2 className="text-2xl py-2 text-gray-50 text-center">Check out our latest insights.</h2>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {data.map((blog) => (
                        <BlogPostPreview key={blog.id} post={blog} />
                    ))}
                </div>
            </div>
        </main>
    )
}
