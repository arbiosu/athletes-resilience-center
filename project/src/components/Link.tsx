import Link from 'next/link'
import { LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { JSX } from "react"
import { cn } from "@/lib/utils"



export interface LinkButtonProps {
    href: string
    icon: LucideIcon
    label: string
}

export default function StyledLink({ href, icon }: { href: string, icon: JSX.Element }) {
    return (
        <Link href={href} className="mx-3 inline-flex items-center justify-center w-48 h-12 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <span className="justify-normal py-3">{icon} </span>
      </Link>
    )
}

export function SubscribeLink() {
    return (
        <Link
            href="https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37"
            rel="noopener noreferrer" target="_blank"
        >
            <Button variant="subscribe">Subscribe Now</Button>
        </Link>
    )
}


export function SocialMediaButtons({ href, icon: Icon, label }: LinkButtonProps) {
    return (
        <Button asChild name={label} variant="custom" size="lg" className={cn("gap-2 py-6 sm:grid-rows-3")}>
            <Link href={href} rel="noopener noreferrer" target="_blank">
                <Icon className="h-4 w-4" /> {label}
            </Link>
        </Button>
    )
}