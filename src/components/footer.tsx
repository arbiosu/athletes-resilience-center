import Link from 'next/link';
import { Headphones, Youtube, Instagram } from 'lucide-react';

const footerLinks = [
  { href: '/about', label: 'About' },
  { href: '/episodes', label: 'Episodes' },
  { href: '/coaching', label: 'Book a Coaching Session' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className='font-jetbrains pt-10'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-4'>
          {/* Brand and Copyright */}
          <div className='md:col-span-2'>
            <Link href='/' className='mb-4 flex items-center'>
              <span className='text-base font-bold'>
                Athlete&apos;s Resilience Center
              </span>
            </Link>
            <p className='text-sm'>
              &copy; {currentYear} Athlete&apos;s Resilience Center. All rights
              reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='mb-4 text-base font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className='block text-base transition-transform hover:scale-110 focus:scale-110 active:scale-95'
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className='mb-4 text-base font-semibold'>Follow Us</h3>
            <div className='flex space-x-4'>
              <Link
                href='https://open.spotify.com/show/4ffm2AA2kGffaH6TbMzilZ?si=2bnAUAW_TVicae7kjhTE-Q&nd=1&dlsi=93f75f140fc34b37'
                target='_blank'
                rel='noopener noreferrer'
                className='transition-transform hover:block hover:scale-110 focus:scale-110 active:scale-95'
              >
                <Headphones size={24} />
                <span className='sr-only'>Spotify</span>
              </Link>
              <Link
                href='https://www.youtube.com/@AthletesResilienceCenter'
                target='_blank'
                rel='noopener noreferrer'
                className='transition-transform hover:block hover:scale-110 focus:scale-110 active:scale-95'
              >
                <Youtube size={24} />
                <span className='sr-only'>Youtube</span>
              </Link>
              <Link
                href='https://www.instagram.com/athletesresiliencecenter/'
                target='_blank'
                rel='noopener noreferrer'
                className='transition-transform hover:block hover:scale-110 focus:scale-110 active:scale-95'
              >
                <Instagram size={24} />
                <span className='sr-only'>Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar add github? */}
        <div className='mt-8 border-t border-gray-200 pt-8 text-center text-sm'></div>
      </div>
    </footer>
  );
}
