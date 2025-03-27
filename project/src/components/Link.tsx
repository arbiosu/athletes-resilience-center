import Link from 'next/link';
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export interface LinkButtonProps {
    href: string
    icon: LucideIcon
    label: string
}

export function SubscribeLink() {
    return (
        <Link
            href="https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37"
            rel="noopener noreferrer" target="_blank"
        >
            <Button>Subscribe Now</Button>
        </Link>
    );
}


export function SocialMediaButtons({ href, icon: Icon, label }: LinkButtonProps) {
    return (
        <Button asChild name={label} className={cn("text-lg gap-2 py-6 sm:grid-rows-3")}>
            <Link href={href} rel="noopener noreferrer" target="_blank">
                <Icon className="h-4 w-4" /> {label}
            </Link>
        </Button>
    );
}
