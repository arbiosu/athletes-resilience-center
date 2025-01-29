import { createClient } from '@/lib/supabase/server'
import BlogPostList from "@/components/AdminBlogPostList"
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    console.log('Auth Data:', data)
    console.log('Auth Error:', error)

    if (error || !data.user) {
        redirect('/admin/login')
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 py-20">Admin Dashboard</h1>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Blog Posts</h2>
                <Link href="/admin/create">
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
                </Button>
                </Link>
            </div>
            <BlogPostList />
        </div>
    )
}
