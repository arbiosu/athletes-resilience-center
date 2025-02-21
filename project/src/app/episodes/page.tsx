import { getEpisodes } from "@/lib/spotify/spotify"
import { SpotifySimplifiedEpisode } from "@/components/FeaturedEpisode"
import { Episode } from "@/components/FeaturedEpisode"


export default async function Episodes() {
    try {
        const data = await getEpisodes(5)
        const episodes = data.items.filter((episode: SpotifySimplifiedEpisode) => episode !== null)
        return (
            <main className="min-h-screen py-20 bg-black">
                <h1 className="text-4xl text-gray-50 text-center">Episode Library</h1>
                <h2 className="text-2xl py-2 text-gray-50 text-center">Check out our most recent episodes.</h2>

                {episodes.map((episode: SpotifySimplifiedEpisode) => (
                    <Episode episode={episode} key={episode.id} />
                ))}
            </main>
        )
    }  catch (error) {
        console.error('Error fetching episodes:', error)
        return (
            <p>Error loading episodes. Please try again later.</p>
        )
    }
}