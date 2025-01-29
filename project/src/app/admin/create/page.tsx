import { CreateBlogPostForm } from "@/components/AdminCreateBlogPost"
import { createClient } from '@/lib/supabase/server'
import { redirect } from "next/navigation"


export default async function Page() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    console.log('Auth Data:', data)
    console.log('Auth Error:', error)

    if (error || !data.user) {
        redirect('/admin/login')
    }
    return <CreateBlogPostForm />
}