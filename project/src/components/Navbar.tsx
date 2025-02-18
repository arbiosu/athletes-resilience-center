"use client"

import * as React from "react"
import Link from "next/link"


const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog"},
]


export default function Navbar() {
  return (
    <nav className="text-logoGreen fixed top-0 left-0 right-0 z-50 bg-lightLogoGreen/1 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center h-16">
            <div className="flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md text-sm font-medium hover:text-slate-500 transition-colors"
                >
                <span className="block text-2xl md:text-4xl font-bold">{item.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
