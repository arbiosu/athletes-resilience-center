import React from 'react'
import Image from 'next/image'
import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { SubscribeLink } from '@/components/Link'
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Instagram } from 'lucide-react'

export interface AboutArcProps {
  title: string
  description: string
  hosts: AboutHostProps[]
}

export interface AboutHostProps {
    name: string
    bio: string
    hostImg: string
}

export function AboutArc({ props }: { props: AboutArcProps }) {
    return (
        <Card className="w-full max-w-4xl mx-auto px-10">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">About the Show</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
                    <CardDescription className="text-sm mb-4 max-w-2xl mx-auto">
                        {props.description}
                    </CardDescription>
                    <SubscribeLink />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {props.hosts.map((host, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                                <Image
                                    src={host.hostImg}
                                    alt={host.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    placeholder="blur"
                                    blurDataURL='/logoNoBg.png'
                                />
                            </div>
                            <h4 className="text-lg font-semibold mb-2">{host.name}</h4>
                            <CardDescription className="text-sm mb-4">
                                {host.bio}
                            </CardDescription>
                            <div className="flex space-x-2">
                                <Button size="icon" variant="ghost">
                                    <Twitter className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                    <Facebook className="h-4 w-4" />
                                </Button>
                                <Button size="icon" variant="ghost">
                                    <Instagram className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
