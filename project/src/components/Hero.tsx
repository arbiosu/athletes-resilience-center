import Image from "next/image"
import { Headphones, Youtube, Instagram } from "lucide-react"
import { SocialMediaButtons, LinkButtonProps } from "@/components/Link"


const socialMediaLinks: LinkButtonProps[] = [
    {
        href: "https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37",
        label: "Spotify",
        icon: Headphones
    },
    {
        href: "https://www.youtube.com/@AthletesResilienceCenter",
        label: "Youtube",
        icon: Youtube,
    },
    {
        href: "https://www.instagram.com/athletesresiliencecenter/",
        label: "Instagram",
        icon: Instagram,
    }
]

export default function Hero() {
    return (
        <div className="bg-gradient-to-r from-black-800 to-green-600 min-h-screen flex items-center justify-center px-2 sm:px-4 lg:px-6">
            <div className="text-center">
                <div className="space-y-8 mb-8 flex justify-center">
                    <Image
                        src="/logoNoBg.png"
                        alt="Company Logo"
                        width={120}
                        height={120}
                        className="h-auto w-auto"
                        priority
                    />
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                    <span className="block">Welcome to the</span>
                    <span className="block text-green-200">Athlete&apos;s Resilience Center</span>
                </h1>
                <h1 className="text-4xl font-extrabold text-white mb-4">
                    Find Your Performance Arc
                </h1>
                <div className="flex flex-col space-y-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:space-y-0">
                {socialMediaLinks.map((s, index) => (
                    <SocialMediaButtons href={s.href} icon={s.icon} label={s.label} key={index}/>
                ))}
                </div>
            </div>
        </div>
    )
}