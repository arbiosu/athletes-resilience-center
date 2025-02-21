"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetTitle, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SubscribeLink } from "@/components/Link"



const navItems = [
  { name: "Blog", href: "/blog"},
  { name: "Episodes", href: "/episodes"},
  { name: "About", href: "/about"},
  { name: "Contact", href: "/contact"},
]


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else{
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? "bg-black shadow-md" : "bg-transparent"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Image
              src="/logo-white.png"
              alt="Athlete's Resilience Center"
              height={48}
              width={48}
            />
          </Link>
          <div className="hidden md:flex items-center space-x-4 text-2xl font-semibold filter drop-shadow-lg">
            {navItems.map((link) => (
              <Link 
                href={link.href}
                key={link.name}
                className="text-white hover:text-logoGreen"
              >
                {link.name}
              </Link>
            ))}
            <SubscribeLink />
          </div>
          {/* Mobile NavBar */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6 font-bold" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetTitle></SheetTitle>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium hover:text-purple-500"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <SubscribeLink />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}