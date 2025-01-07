import Image from "next/image"
import { SocialMediaLinks } from "@/components/Link"

export default function Hero() {
    return (
        <div className="bg-gradient-to-r from-black-800 to-green-600 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <div className="mb-8 flex justify-center">
                    <Image
                        src="/logoNoBg.png"
                        alt="Company Logo"
                        width={120}
                        height={120}
                        className="h-auto w-auto"
                        priority
                    />
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
                    <span className="block">Welcome to the</span>
                    <span className="block text-green-200">Athlete&apos;s Resilience Center</span>
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-4xl font-extrabold text-white mb-4">
                    Find Your Performance Arc
                </h1>
                <SocialMediaLinks />
            </div>
        </div>
    )
}