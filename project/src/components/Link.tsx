import { Instagram, Youtube, Headphones } from "lucide-react"
import Link from 'next/link'

interface StyledLinkProps {
    href: string
    text: string
    icon: JSX.Element
}

export default function StyledLink({ href, icon }: { href: string, icon: JSX.Element }) {
    return (
        <Link href={href} className="mx-3 inline-flex items-center justify-center w-48 h-12 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            <span className="justify-normal">{icon}</span>
      </Link>
    )
}

export function SocialMediaLinks() {
    const socialMediaLinks: StyledLinkProps[] = [
        {
            href: "https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37",
            text: "Spotify",
            icon: <Headphones size={30} className="mr-2 flex-shrink-0" />
        },
        {
            href: "https://www.youtube.com/@AthletesResilienceCenter",
            text: "Youtube",
            icon: <Youtube size={30} className="mr-2 flex-shrink-0" />,
        },
        {
            href: "https://www.instagram.com/athletesresiliencecenter/",
            text: "Instagram",
            icon: <Instagram size={30} className="mr-2 flex-shrink-0" />,
        }
    ]

    return (
        <>
            {socialMediaLinks.map((social, index) => (
                    <StyledLink href={social.href} icon={social.icon} key={index}/>
            ))}
        </>
    )
    
}