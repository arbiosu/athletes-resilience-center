'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { login } from '@/app/admin/login/actions'

export default function LoginForm() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        await login(formData)
        setLoading(false)
    }

    return (
        <div className="py-20">
            <div className="flex items-center justify-center">
            
            <form action={handleSubmit} className="space-y-4">
                <label 
                htmlFor="email"
                className="block mb-2 text-lg text-white font-bold"
                >Email:
                </label>
                <Input id="email" name="email" type="email" required />

                <label htmlFor="password">Password:</label>
                <Input id="password" name="password" type="password" required />

                <Button type="submit" disabled={loading} className="w-full">
                    {loading ? 'Logging in...' : 'Log in'}
                </Button>
            </form>
            </div>

        </div>

    )
}
