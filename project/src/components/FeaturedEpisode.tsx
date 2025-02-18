import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from 'lucide-react'
import SpotifyEmbeddedPlayer from '@/components/SpotifyEmbeddedPlayer'
import { getEpisodes } from '@/lib/spotify/spotify'


interface SpotifySimplifiedEpisode {
  audio_preview_url: string
  description: string
  html_description: string
  duration_ms: number
  explicit: boolean
  external_urls: { spotify: string }
  href: string
  id: string
  release_date: string
}


export async function NewFeaturedEpisode() {
  const data = await getEpisodes()
  const featuredEpisode = data.items.find((episode: SpotifySimplifiedEpisode) => episode)
  return (
    <Card className="w-full max-w-4xl mx-auto px-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-white">Featured Episode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full">
          <SpotifyEmbeddedPlayer episodeId={featuredEpisode.id} />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-2 text-emerald-50">{featuredEpisode.name}</h3>
          <CardDescription className="text-sm mb-4 dark:text-gray-400">
            {featuredEpisode.description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between text-sm text-white">
            <span>Duration: {new Date(featuredEpisode.duration_ms).toISOString().substr(11, 8)}</span>
            <span>Released on {new Date(featuredEpisode.release_date).toLocaleDateString()}</span>
          </div>
      </CardContent>
      <CardFooter>
        <Link href={featuredEpisode.external_urls.spotify} rel="noopener noreferrer" target="_blank">
          <Button>
            <PlayCircle className="mr-2 h-4 w-4" /> Listen on Spotify
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

