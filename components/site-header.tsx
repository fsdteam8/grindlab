"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors container  ${
        scrolled
          ? "bg-black backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 !my-4 duration-300 rounded-full"
          : "bg-transparent"
      }`}
    >
      <div className=" px-4 h-18 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Grind Lab"
            width={120}
            height={32}
            className="h-20 w-20"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <NavLink
            href="#"
            className="nav-link border-b-2 border-b-[limegreen]"
          >
            Home
          </NavLink>
          <NavLink href="#" className="nav-link">
            About Us
          </NavLink>
          <NavLink href="#service" className="nav-link">
            Services
          </NavLink>
          <NavLink href="#experience" className="nav-link">
            Tailor‑Made Travel
          </NavLink>
        </nav>
        <div className="hidden md:block">
          <NavLink href="#contact" onClick={() => setOpen(false)}>
            <Button className="w-full bg-brand text-black hover:opacity-90 cursor-pointer font-bold rounded-full shadow border border-black/10 ">
              Contact
            </Button>
          </NavLink>
        </div>
        <button
          aria-label="Toggle menu"
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur">
          <div className="container px-4 py-4 text-sm">
            <div className="flex flex-col gap-3">
              <NavLink href="#" onClick={() => setOpen(false)}>
                Home
              </NavLink>
              <NavLink href="#" onClick={() => setOpen(false)}>
                About Us
              </NavLink>
              <NavLink href="#" onClick={() => setOpen(false)}>
                Services
              </NavLink>
              <NavLink href="#" onClick={() => setOpen(false)}>
                Tailor‑Made Travel
              </NavLink>
              <NavLink href="#contact" onClick={() => setOpen(false)}>
                <Button className="mt-2 w-full bg-brand text-black hover:opacity-90 cursor-pointer">
                  Contact
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink(props: React.ComponentProps<typeof Link>) {
  const { className, ...rest } = props;
  return (
    <Link
      {...rest}
      className={`text-black/80 hover:!text-black hover:font-semibold transition-colors ${
        className ?? ""
      }`}
    />
  );
}
