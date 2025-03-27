import Image from "next/image";
import { Headphones, Youtube, Instagram } from "lucide-react";
import { SocialMediaButtons, LinkButtonProps } from "@/components/Link";


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

export function NewHero() {
    return (
        <main className="min-h-screen">
            <section className="relative h-screen flex items-center justify-center text-black dark:text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <div className="flex justify-center mb-4">
                        <Image src="/logoNoBg.png" alt="Athlete's Resilience Center" width={100} height={100}/>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 filter drop-shadow-lg">
                        Athlete&apos;s Resilience Center
                        </h1>
                        <p className="text-2xl md:text-2xl font-semibold mb-8">
                        Find Your Performance Arc.
                        </p>
                        <div className="flex flex-col space-y-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:space-y-0">
                        {socialMediaLinks.map((s, index) => (
                        <SocialMediaButtons href={s.href} icon={s.icon} label={s.label} key={index}/>
                        ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}