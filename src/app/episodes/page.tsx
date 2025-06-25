import { Suspense } from 'react';
import { EpisodeListWrapper, EpisodeListSkeleton } from '@/components/episodes';

export default function Page() {
  return (
    <section className='font-jetbrains py-10'>
      <h1 className='text-center text-4xl'>Episode Library</h1>
      <h2 className='py-2 text-center text-2xl'>
        Check out our most recent episodes.
      </h2>
      <Suspense fallback={<EpisodeListSkeleton />}>
        <EpisodeListWrapper />
      </Suspense>
    </section>
  );
}
