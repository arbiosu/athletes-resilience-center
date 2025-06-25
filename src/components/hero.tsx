import Image from 'next/image';
import { SOCIAL_MEDIA_LINKS, SocialMediaButtons } from './social-media';

export function Hero() {
  return (
    <section className='font-jetbrains relative flex h-screen items-center justify-center'>
      <div className='container mx-auto px-4'>
        <div className='mx-auto max-w-3xl text-center'>
          <div className='mb-4 flex justify-center'>
            <Image
              src='/logo-no-bg.png'
              alt="Athlete's Resilience Center Podcast logo"
              width={100}
              height={100}
              priority
              unoptimized
              className='h-auto w-auto'
            />
          </div>
          <h1 className='mb-4 text-4xl font-bold drop-shadow-lg md:text-6xl'>
            {"Athlete's Resilience Center"}
          </h1>
          <p className='mb-8 text-2xl font-semibold'>
            Find Your Performance Arc.
          </p>
          <nav aria-label='Social media links'>
            <div className='flex flex-col space-y-2 sm:grid sm:grid-cols-3 sm:gap-2 sm:space-y-0'>
              {SOCIAL_MEDIA_LINKS.map((link) => (
                <SocialMediaButtons
                  key={link.label}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
}
