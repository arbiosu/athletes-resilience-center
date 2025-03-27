import Link from "next/link";
import Image from "next/image";
import { ModeToggle } from "@/components/ThemeToggle";

// TODO: add blog and contact once finished
const navLinks = [
  { href: "/", label: "Home"},
  { href: "/about", label: "About"},
  { href: "/episodes", label: "Episodes"},
]


export default function Nav() {
  return (
    <header className="flex h-14 items-center border-b px-4">
      <Link href="/">
        <Image src="/logoNoBg.png" alt="Athlete's Resilience Center Logo" width={32} height={32} className="hidden md:block"/>
      </Link>
      <div className="flex flex-1 justify-center gap-6">
        {navLinks.map((link, index) => (
          <Link href={link.href} key={index}>
            <p className="block transition-transform hover:scale-110 focus:scale-110 active:scale-95 hover:text-logoGreen">{link.label}</p>
          </Link>
        ))}
      </div>
      <ModeToggle />
    </header>
  );
};
