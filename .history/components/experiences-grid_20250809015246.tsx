'use client'

import { HoverGlowCard } from "@/components/hover-glow-card"
import Image from "next/image"
import { useGsapOnScroll } from "@/hooks/use-gsap"

export function ExperiencesGrid() {
  useGsapOnScroll(".exp-card")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {/* Top row */}
      <div className="exp-card"><HoverGlowCard src="/images/rect-21.jpg" alt="Forest lake" /></div>
      <div className="exp-card"><HoverGlowCard src="/images/Rectangle 31.png" alt="Pool and sea" /></div>
      <div className="exp-card"><HoverGlowCard src="/images/Rectangle 28.png" alt="Resort loungers" /></div>

      {/* Middle row (two-up) */}
      <div className="exp-card md:col-span-2">
        <HoverGlowCard src="/images/Rectangle 29.png" alt="Resort travel banner" aspect="aspect-[16/6]" />
      </div>
      <div className="exp-card"><HoverGlowCard src="/images/Rectangle 30.png" alt="Pool portrait" /></div>

      {/* Bottom banner to echo the provided design */}
      <div className="exp-card md:col-span-3 rounded-2xl overflow-hidden ring-1 ring-white/10">
        <div className="relative w-full aspect-[16/6]">
          <Image src="/images/rect-30.png" alt="Lifestyle banner" fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}
