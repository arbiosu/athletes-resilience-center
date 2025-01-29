import { createBlogPost } from "@/lib/supabase/model";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button'

export async function CreateBlogPostForm() {
    const addPost = async (formData: FormData) => {
        "use server"
        const post = {
            brief_description: formData.get('brief_description')?.toString() ?? "No bd",
            content: formData.get('content')?.toString() ?? "No content",
            title: formData.get('title')?.toString() ?? "No Title",
            author: formData.get('author')?.toString() ?? "No Author"
        }
        const { error } = await createBlogPost(post)
        if (error) {
            console.log(error)
            redirect('/admin/error')
        }
        revalidatePath('/admin')
    }
    return (
        <div className="py-10">
            <h1>Create a Blog Post</h1>
            <form action={addPost} className="space-y-4">
                <label htmlFor="title" className="block text-lg font-medium text-white">
                    Title
                </label>
                <Input name="title" placeholder="Title of the post" />
                <label htmlFor="author" className="block text-lg font-medium text-white">
                    Author
                </label>
                <Input name="author" placeholder="Author of the post" />
                <label htmlFor="brief_description" className="block text-lg font-medium text-white">
                    Brief Description
                </label>
                <Input name="brief_description" placeholder="Brief description of the post" />
                <label htmlFor="content" className="block text-lg font-medium text-white">
                    Content
                </label>
                <Textarea name="content" rows={10} placeholder="The full content of the post" />
                <Button type="submit">Create Post</Button>
            </form>
        </div>
    )
}
