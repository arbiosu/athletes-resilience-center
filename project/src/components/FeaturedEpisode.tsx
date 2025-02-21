import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'
import SpotifyEmbeddedPlayer from '@/components/SpotifyEmbeddedPlayer'
import { getEpisodes } from '@/lib/spotify/spotify'


export interface SpotifySimplifiedEpisode {
  audio_preview_url: string
  description: string
  html_description: string
  duration_ms: number
  explicit: boolean
  external_urls: { spotify: string }
  href: string
  id: string
  release_date: string
  name: string
}

interface EpisodeProps {
  episode: SpotifySimplifiedEpisode
}


export default async function Featured() {
  const data = await getEpisodes(10)
  const featuredEpisode = data.items.find((episode: SpotifySimplifiedEpisode) => episode)

  return (
    <section className="py-20 bg-gradient-to-t from-logoGreen to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-black">
          Featured Episode
        </h2>
        <div className="w-full">
          <SpotifyEmbeddedPlayer episodeId={featuredEpisode.id} />
        </div>
        <div className="py-4 space-y-4">
          <h3 className="text-2xl text-white font-semibold">{featuredEpisode.name}</h3>
          <p className="text-gray-50">{featuredEpisode.description}</p>
        </div>
        <div className="flex items-center justify-between text-sm font-semibold text-white">
          <span>Length: {new Date(featuredEpisode.duration_ms).toISOString().substr(11, 8)}</span>
          <span>Released on {new Date(featuredEpisode.release_date).toLocaleDateString()}</span>
        </div>
        <div className="py-4">
          <Link href={featuredEpisode.external_urls.spotify} rel="noopener noreferrer" target="_blank">
            <Button variant="subscribe">
              <PlayCircle className="mr-2 h-4 w-4" /> Listen on Spotify
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Episode({ episode }: EpisodeProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="aspect-w-16 aspect-h-9">
            <SpotifyEmbeddedPlayer episodeId={episode.id} />
          </div>
        </div>
        <div className="lg:col-span-1 space-y-4">
          <h1 className="text-2xl font-bold">{episode.name}</h1>
          <p className="text-gray-50">{episode.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="text-gray-50">Length: {new Date(episode.duration_ms).toISOString().substr(11, 8)}</span>
            <span className="text-gray-50">|</span>
            <span className="text-gray-50">Released on: {new Date(episode.release_date).toLocaleDateString()}</span>
          </div>
          <div className="py-4">
            <Link href={episode.external_urls.spotify} rel="noopener noreferrer" target="_blank">
              <Button variant="subscribe">
                <PlayCircle className="mr-2 h-4 w-4" /> Listen on Spotify
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

