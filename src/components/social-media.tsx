import Link from 'next/link';
import { Headphones, Youtube, Instagram, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SocialMediaButtonProps {
  href: string;
  label: string;
  icon: LucideIcon;
}

export function SubscribeLink() {
  return (
    <Link
      href='https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37'
      rel='noopener noreferrer'
      target='_blank'
    >
      <Button>Subscribe Now</Button>
    </Link>
  );
}

export function SocialMediaButtons({
  href,
  icon: Icon,
  label,
}: SocialMediaButtonProps) {
  return (
    <Button
      asChild
      name={label}
      className={cn('gap-2 py-6 text-lg sm:grid-rows-3')}
    >
      <Link href={href} rel='noopener noreferrer' target='_blank'>
        <Icon className='h-4 w-4' /> {label}
      </Link>
    </Button>
  );
}

export const SOCIAL_MEDIA_LINKS = [
  {
    href: 'https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37',
    label: 'Spotify',
    icon: Headphones,
  },
  {
    href: 'https://www.youtube.com/@AthletesResilienceCenter',
    label: 'Youtube',
    icon: Youtube,
  },
  {
    href: 'https://www.instagram.com/athletesresiliencecenter/',
    label: 'Instagram',
    icon: Instagram,
  },
] as const satisfies readonly SocialMediaButtonProps[];
