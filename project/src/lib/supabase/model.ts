import { createServiceClient } from "@/lib/supabase/service"

/**
 * TODO: Optimize select
 * @returns Blog posts
 */
export async function getBlogPosts() {
    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .select()
    .order('id', { ascending: false })
}

export async function getBlogContentById(id: number) {
    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .select('content')
    .eq('id', id)
    .single()
}

interface TestPost {
    brief_description: string,
    content: string,
    title: string,
}

/**
 * Insert a blog post
 * Only used by admins
 * @param post: title, brief_desc
 * @returns 
 */
export async function createBlogPost(post: TestPost) {
    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .insert(post)
}