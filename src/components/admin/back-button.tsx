import Link from 'next/link';
import { Button } from '../ui/button';

export default function BackButton({ href }: { href: string }) {
  return (
    <Button asChild>
      <Link href={href}>Back to Admin Portal</Link>
    </Button>
  );
}
