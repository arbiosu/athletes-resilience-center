"use client";

import { createBlogPost } from "@/lib/supabase/model";
import { useState, useRef } from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from '@/components/ui/button';
import type { Tables } from "@/lib/supabase/database";
import { updateBlogPost } from "@/lib/supabase/model";


export function CreateBlogPost() {
    const [blog, setBlog] = useState({
        title: '',
        author: '',
        brief_description: '',
        content: '',
    })

    const [picture, setPicture] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setPicture(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!picture) {
            alert('Please upload an image')
            return
        }
        setLoading(true)
        try {
            const newBlogPost = await createBlogPost(blog, picture)
            if (newBlogPost) {
                alert('Blog post created successfully')
                setBlog({
                    title: '',
                    author: '',
                    brief_description: '',
                    content: '',
                })
                setPicture(null)
                if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                }
            }
        } catch (error) {
            console.error('Error creating blog post:', error)
            alert('Failed to create blog post')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="max-w-2xl mx-auto p-8 pt-16 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
                Create a New Blog Post - all fields required
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white">
                        Title
                    </label>
                    <Input
                        id="title"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-white">
                        Author
                    </label>
                    <Input
                        id="author"
                        name="author"
                        value={blog.author}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="brief_description" className="block text-sm font-medium text-white">
                        Brief Description
                    </label>
                    <Textarea
                        id="brief_description"
                        name="brief_description"
                        value={blog.brief_description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-white">
                        Content
                    </label>
                    <Textarea
                        id="content"
                        name="content"
                        value={blog.content}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="picture" className="block text-sm font-medium text-white">
                        Picture
                    </label>
                    <Input
                        type="file"
                        id="picture"
                        name="picture"
                        onChange={handlePictureChange}
                        accept="image/*"
                        ref={fileInputRef}
                        required
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Post'}
                </Button>
            </form>
        </div>
    )
}

export function EditBlogPost({ post }: { post: Tables<'posts'> }) {
    const [blog, setBlog] = useState({
        id: post.id,
        title: post.title,
        author: post.author,
        brief_description: post.brief_description,
        content: post.content,
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            const updatedBlogPost = await updateBlogPost(blog)
            if (updatedBlogPost) {
                alert('Blog post updated successfully')
                setLoading(false)
            }
        } catch (error) {
            console.error('Error updating blog post:', error)
            alert('Failed to update blog post')
        }
    }

    return (
        <div className="max-w-2xl mx-auto p-8 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">
                Edit Blog Post
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-white">
                        Title
                    </label>
                    <Input
                        id="title"
                        name="title"
                        value={blog.title ?? ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-white">
                        Author
                    </label>
                    <Input
                        id="author"
                        name="author"
                        value={blog.author ?? ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="brief_description" className="block text-sm font-medium text-white">
                        Brief Description
                    </label>
                    <Textarea
                        id="brief_description"
                        name="brief_description"
                        value={blog.brief_description ?? ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-white">
                        Content
                    </label>
                    <Textarea
                        id="content"
                        name="content"
                        value={blog.content ?? ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Post'}
                </Button>
            </form>
        </div>
    )
    
}