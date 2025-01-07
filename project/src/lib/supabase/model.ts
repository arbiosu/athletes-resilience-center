import { createServiceClient } from "@/lib/supabase/service"
import { Tables } from "@/lib/types/supabase"

/**
 * TODO
 * @returns Blog posts
 */
export async function getBlogPosts() {
    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .select()
}

/**
 * Insert a blog post
 * Only used by admins
 * @param post: title, brief_desc
 * @returns 
 */
export async function createBlogPost(post: Tables<'posts'>) {
    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .insert(post)
}