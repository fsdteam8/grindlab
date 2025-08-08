'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40" : "bg-transparent"}`}>
      <div className="container px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/grindlab.svg" alt="Grind Lab" width={120} height={32} />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">About Us</NavLink>
          <NavLink href="#">Services</NavLink>
          <NavLink href="#">Tailor‑Made Travel</NavLink>
        </nav>
        <div className="hidden md:block">
          <Button className="bg-brand text-black hover:opacity-90">Contact</Button>
        </div>
        <button aria-label="Toggle menu" className="md:hidden" onClick={() => setOpen((v) => !v)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="container px-4 py-4 text-sm">
            <div className="flex flex-col gap-3">
              <NavLink href="#" onClick={() => setOpen(false)}>Home</NavLink>
              <NavLink href="#" onClick={() => setOpen(false)}>About Us</NavLink>
              <NavLink href="#" onClick={() => setOpen(false)}>Services</NavLink>
              <NavLink href="#" onClick={() => setOpen(false)}>Tailor‑Made Travel</NavLink>
              <Button className="mt-2 w-full bg-brand text-black hover:opacity-90">Contact</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function NavLink(props: React.ComponentProps<typeof Link>) {
  const { className, ...rest } = props
  return (
    <Link
      {...rest}
      className={`text-white/80 hover:text-white transition-colors ${className ?? ""}`}
    />
  )
}
