"use server";

import { getBlogPosts } from "@/lib/supabase/model"
import { BlogPostPreview } from "@/components/BlogPreview";


export default async function Blog() {
    const { data, error } = await getBlogPosts()
    if (error) {
        return <h1>Error</h1>
    }
    return (
        <div className="container mx-auto py-6 pt-16">
            <div className="bg-gradient-to-r from-black-800 to-green-600 min-h-screen grid items-center justify-center px-4 sm:px-6 lg:px-8 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data && data.length >= 1 ? (
                    data.map((post, index) => (
                        <BlogPostPreview key={index} post={post} />
                    ))
                ) : (
                    <h1 className="text-white text-4xl">
                        <span className="block text-green-200">No posts yet.</span>
                    </h1>
                )}
            </div>
        </div>
    )
}
