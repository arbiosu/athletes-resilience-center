//src/app/page.tsx
import { Suspense } from 'react';
import { Hero } from '@/components/hero';
import About from '@/components/about';
import {
  FeaturedEpisodeWrapper,
  FeaturedEpisodeSkeleton,
} from '@/components/episodes';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Suspense fallback={<FeaturedEpisodeSkeleton />}>
        <FeaturedEpisodeWrapper />
      </Suspense>
    </>
  );
}
