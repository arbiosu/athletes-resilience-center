import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function SignOutForm() {
    return (
        <form action="/admin/signout" method="post">
            <Button type="submit">
                <LogOut />
                Log Out
            </Button>
        </form>
    )
}