import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from 'lucide-react'
import SpotifyEmbeddedPlayer from '@/components/SpotifyEmbeddedPlayer'
import { getEpisodes } from '@/lib/spotify/spotify'

export async function NewFeaturedEpisode() {
  const data = await getEpisodes()
  const featuredEpisode = data.items[0]
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Featured Episode</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full">
          <SpotifyEmbeddedPlayer episodeId={featuredEpisode.id} />
        </div>
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-2">{featuredEpisode.name}</h3>
          <CardDescription className="text-sm text-white mb-4">
            {featuredEpisode.description}
          </CardDescription>
        </div>
        <div className="flex items-center justify-between text-sm text-white">
            <span>Duration: {new Date(featuredEpisode.duration_ms).toISOString().substr(11, 8)}</span>
            <span>Released on {new Date(featuredEpisode.release_date).toLocaleDateString()}</span>
          </div>
      </CardContent>
      <CardFooter>
        <Link href={featuredEpisode.external_urls.spotify}>
          <Button>
            <PlayCircle className="mr-2 h-4 w-4" /> Listen on Spotify
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

