import { getBlogContentById } from "@/lib/supabase/model";
import { redirect } from "next/navigation";
import { EditBlogPost } from "@/components/AdminCreateBlogPost";
import { createClient } from "@/lib/supabase/server"

export default async function Page({ params }: { params: Promise<{ id: number }>}) {
    const blogId = (await params).id
    const { data, error } = await getBlogContentById(blogId)
    if (error || !data) {
        redirect('/admin/blog')
    }

    const supabase = await createClient()
    const { data: user } = await supabase.auth.getUser()
    if (!user) {
        redirect('/admin/login')
    }

    return (
        <div className="max-w-2xl mx-auto p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
                Edit Blog Post {data.title}
            </h2>
            <EditBlogPost post={data} />
        </div>
    )
}