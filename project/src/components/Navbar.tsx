"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog"}
]

export default function Navbar() {

  return (
    <nav className="text-white fixed top-0 left-0 right-0 z-50 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
            <div className="md:block ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-3 py-4 rounded-md text-sm font-medium hover:bg-green-600 hover:text-white"
                >
                <span className="text-4xl font-bold">{item.name}</span>
                </Link>
              ))}
          </div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              className="text-white"
            >
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
