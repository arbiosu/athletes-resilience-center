import { getEpisodes } from "@/lib/spotify/spotify"
import { SpotifySimplifiedEpisode } from "@/components/FeaturedEpisode"
import { FeaturedEpisode } from "@/components/FeaturedEpisode"


export async function Page() {
    try {
        const data = await getEpisodes()
        const episodes = data.items.filter((episode: SpotifySimplifiedEpisode) => episode !== null)
        console.log(episodes)

        
        return (
            <main className="bg-gradient-to-bl from-logoGreen via-lightLogoGray to-lightLogoGreen min-h-screen">
            <div className="pt-16">
                <h1 className="text-black text-4xl font-bold">Episodes</h1>
                <ul>
                    {episodes.map((episode: SpotifySimplifiedEpisode) => (
                        <li className="text-black" key={episode.id}>{episode.name}</li>
                    )) ?? <p>No episodes available at the moment.</p>}
                </ul>
            </div>
            </main>
        )
    } catch (error) {
        console.error('Error fetching episodes:', error)
        return (
            <div>
                <h1>Episodes</h1>
                <p>Error loading episodes. Please try again later.</p>
            </div>
        )
    }
}

export default function Episodes() {
    return <FeaturedEpisode />
}