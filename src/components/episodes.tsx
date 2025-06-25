// src/components/episodes.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import SpotifyEmbeddedPlayer from '@/components/spotify-embedded-player';
import { getEpisodes, SpotifySimplifiedEpisode } from '@/lib/spotify/api';

interface EpisodeProps {
  episode: SpotifySimplifiedEpisode;
}

const formatDuration = (durationMs: number): string => {
  return new Date(durationMs).toISOString().slice(11, 19);
};

const formatReleaseDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

function EpisodeMetadata({ episode }: { episode: SpotifySimplifiedEpisode }) {
  return (
    <div className='text-muted-foreground flex flex-wrap items-center gap-2 text-sm'>
      <span>Duration: {formatDuration(episode.duration_ms)}</span>
      <span className='hidden sm:inline'>•</span>
      <span>Released {formatReleaseDate(episode.release_date)}</span>
    </div>
  );
}

function SpotifyButton({ href }: { href: string }) {
  return (
    <Button asChild>
      <Link
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        className='inline-flex items-center gap-2'
      >
        <PlayCircle className='h-4 w-4' />
        Listen on Spotify
      </Link>
    </Button>
  );
}

export async function FeaturedEpisodeWrapper() {
  const featuredEpisode = await getEpisodes(1);

  return (
    <FeaturedEpisode
      episode={featuredEpisode.items[0] as SpotifySimplifiedEpisode}
    />
  );
}

export async function FeaturedEpisode({
  episode,
}: {
  episode: SpotifySimplifiedEpisode;
}) {
  return (
    <section className='font-jetbrains py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-8 text-center text-3xl font-bold'>
          Featured Episode
        </h2>

        <div className='mx-auto max-w-4xl space-y-6'>
          <div className='aspect-video w-full overflow-hidden rounded-lg'>
            <SpotifyEmbeddedPlayer episodeId={episode.id} />
          </div>

          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold'>{episode.name}</h3>
            <p className='leading-relaxed'>{episode.description}</p>
            <EpisodeMetadata episode={episode} />
            <SpotifyButton href={episode.external_urls.spotify} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturedEpisodeSkeleton() {
  return (
    <section className='font-jetbrains py-20'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-8 text-center text-3xl font-bold'>
          Featured Episode
        </h2>
        <div className='mx-auto max-w-4xl space-y-6'>
          <div className='aspect-video w-full animate-pulse overflow-hidden rounded-lg bg-gray-200'></div>
          <div className='space-y-4'>
            <div className='h-8 animate-pulse rounded bg-gray-200'></div>
            <div className='h-20 animate-pulse rounded bg-gray-200'></div>
            <div className='h-6 w-1/3 animate-pulse rounded bg-gray-200'></div>
            <div className='h-10 w-40 animate-pulse rounded bg-gray-200'></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export async function EpisodeListWrapper() {
  const episodes = await getEpisodes();
  const items = episodes.items as SpotifySimplifiedEpisode[];

  return (
    <div>
      {items.map((e, index) => (
        <Episode key={index} episode={e} />
      ))}
    </div>
  );
}

export function EpisodeListSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
        <EpisodeSkeleton key={index} />
      ))}
    </div>
  );
}

export function Episode({ episode }: EpisodeProps) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <div className='aspect-video overflow-hidden rounded-lg'>
            <SpotifyEmbeddedPlayer episodeId={episode.id} />
          </div>
        </div>

        <div className='space-y-6 lg:col-span-1'>
          <div className='space-y-4'>
            <h1 className='text-2xl font-bold'>{episode.name}</h1>
            <p className='text-muted-foreground leading-relaxed'>
              {episode.description}
            </p>
            <EpisodeMetadata episode={episode} />
          </div>
          <SpotifyButton href={episode.external_urls.spotify} />
        </div>
      </div>
    </div>
  );
}

export function EpisodeSkeleton() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <div className='bg-muted aspect-video animate-pulse overflow-hidden rounded-lg'>
            <div className='from-muted via-muted/50 to-muted animate-shimmer h-full w-full bg-gradient-to-r bg-[length:200%_100%]' />
          </div>
        </div>

        <div className='space-y-6 lg:col-span-1'>
          <div className='space-y-4'>
            <div className='bg-muted h-8 w-3/4 animate-pulse rounded' />

            <div className='space-y-2'>
              <div className='bg-muted h-4 w-full animate-pulse rounded' />
              <div className='bg-muted h-4 w-full animate-pulse rounded' />
              <div className='bg-muted h-4 w-2/3 animate-pulse rounded' />
            </div>

            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <div className='bg-muted h-4 w-4 animate-pulse rounded' />
                <div className='bg-muted h-4 w-24 animate-pulse rounded' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-muted h-4 w-4 animate-pulse rounded' />
                <div className='bg-muted h-4 w-32 animate-pulse rounded' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='bg-muted h-4 w-4 animate-pulse rounded' />
                <div className='bg-muted h-4 w-20 animate-pulse rounded' />
              </div>
            </div>
          </div>

          <div className='bg-muted h-10 w-full animate-pulse rounded' />
        </div>
      </div>
    </div>
  );
}
