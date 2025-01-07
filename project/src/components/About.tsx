import { 
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card"
import Image from 'next/image'

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
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">About the Show</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-xl font-semibold mb-2">{props.title}</h3>
                    <CardDescription className="text-sm text-white mb-10">
                        {props.description}
                    </CardDescription>
                </div>
                <div className="flex flex-col items-end text-right">
                    {props && props.hosts.map((host, index) => (
                        <div key ={index} className="flex flex-col items-end mb-4">
                            <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
                                <Image
                                    src={host.hostImg}
                                    alt={host.name}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <h4 className="text-xl font-semibold mb-2">{host.name}</h4>
                            <CardDescription className="text-sm text-gray-500 mb-4">
                                {host.bio}
                            </CardDescription>
                            <CardFooter>
                                Social Media Links
                            </CardFooter>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
