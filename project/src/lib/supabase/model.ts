"use server";

import { createServiceClient } from "@/lib/supabase/service"
import { Tables } from "@/lib/supabase/database"

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
    .select()
    .eq('id', id)
    .single()
}


export async function createBlogPost(post: Omit<Tables<'posts'>, 'id' | 'created_at' | 'picture_url'>, file: File) {
    const pictureUrl = await uploadImage(file)
    if (!pictureUrl) {
        throw new Error('Failed to upload image')
    }

    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .insert([{...post, picture_url: pictureUrl}])
}


export async function deleteBlogPost(id: number) {
    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .delete()
    .eq('id', id)
}

export async function updateBlogPost(post: Omit<Tables<'posts'>, 'created_at' | 'picture_url'>) {
    const supabase = await createServiceClient()
    return await supabase
    .from('posts')
    .update(post)
    .eq('id', post.id)
}

export async function uploadImage(file: File) {
    const fileName = `blog/${file.name}`
    const supabase = await createServiceClient()
    const { data, error } = await supabase
    .storage
    .from('images')
    .upload(fileName, file)

    if (error) {
        console.error(error)
        return null
    }

    return data?.path
}
