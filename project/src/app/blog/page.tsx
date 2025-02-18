"use server";

import { getBlogPosts } from "@/lib/supabase/model"
import { BlogPostPreview } from "@/components/BlogPreview";


export default async function Blog() {
    const { data, error } = await getBlogPosts()
    if (error) {
        return <h1>Error</h1>
    }
    return (
        <main className="pt-16 bg-gradient-to-bl from-logoGreen via-lightLogoGray to-lightLogoGreen">
            <div className="container mx-auto min-h-screen py-14">
                <div className="grid items-start justify-items-center px-4 lg:px-8 gap-4 md:grid-cols-2">
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
        </main>
    )
}
