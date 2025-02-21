import Image from "next/image"

interface HostProps {
    name: string
    experience: string
    bio: string
    image: string
}

const hosts: HostProps[] = [
    {
        name: "Brandon Zachary",
        experience: "Former pitcher...etc",
        bio: "Insert bio here",
        image: "/logoNoBg.png",
    },
    {
        name: "Matt Owens",
        experience: "Former pitcher...etc",
        bio: "Insert bio here",
        image: "/logoNoBg.png",

    },
]


function Host({ name, experience, bio, image }: HostProps) {
    return (
        <div className="flex flex-col items-center text-center space-y-4">
            <Image
                src={image}
                alt={name}
                width={200}
                height={200}
                className="rounded-full object-cover"
            />
            <div>
                <h3 className="text-xl text-black font-semibold">{name}</h3>
                <p className="text-logoGreen font-semibold mb-2">{experience}</p>
                <p className="text-gray-600">{bio}</p>
            </div>
        </div>
    )
}

export default function About() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-black text-3xl font-bold mb-12 text-center">
                    About the Show
                </h2>
                <div className="max-w-3xl mx-auto mb-16">
                    <p className="text-lg text-gray-700 mb-6">
                    The Athlete&apos;s Resilience Center Podcast is dedicated to normalizing 
                    the conversation around mental performance in sports, coaching, and the transitions 
                    athletes face after their care  ers. Each episode explores the mental challenges anyone 
                    associated with sports may encounter, both on and off the field.
                    </p>
                    <p className="text-lg text-gray-700">
                    Whether you&apos;re an athlete, 
                    coach, or someone navigating life after sports, this podcast offers conversations 
                    centered around helping you build resilience at every stage of your athletic journey.
                    Tune in for candid conversations from two people passionate about mental performance development
                    </p>
                </div>
                <h3 className="text-black text-2xl font-semibold mb-8 text-center">
                    Meet your Hosts
                </h3>
                <div className="grid md:grid-cols-2 gap-12">
                    {hosts.map((host) => (
                        <Host 
                            name={host.name}
                            experience={host.experience}
                            bio={host.bio}
                            image={host.image}
                            key={host.name}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

