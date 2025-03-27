import { getEpisodes } from "@/lib/spotify/spotify"
import { SpotifySimplifiedEpisode } from "@/components/FeaturedEpisode"
import { Episode } from "@/components/FeaturedEpisode"

export const revalidate = 432000 // revalidate every 5 days? crusty, need to figure this out!

export default async function Episodes() {
    try {
        const data = await getEpisodes(10)
        const episodes = data.items.filter((episode: SpotifySimplifiedEpisode) => episode !== null)
        return (
            <main className="min-h-screen py-20">
                <h1 className="text-4xl text-center">Episode Library</h1>
                <h2 className="text-2xl py-2 text-center">Check out our most recent episodes.</h2>
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