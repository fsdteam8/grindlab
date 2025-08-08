'use client'

import { HoverGlowCard } from "@/components/hover-glow-card"
import { useGsapOnScroll } from "@/hooks/use-gsap"

export function ExperiencesGrid() {
  useGsapOnScroll(".exp-card")

  const experiences = [
    { src: "/images/rect-21.jpg", alt: "Forest lake", text: "Mountain Lake Retreat" },
    { src: "/images/Rectangle 31.png", alt: "Pool and sea", text: "Infinity Pool Experience" },
    { src: "/images/Rectangle 28.png", alt: "Resort loungers", text: "Luxury Resort Relaxation" },
    { src: "/images/Rectangle 29.png", alt: "Resort travel", text: "Waterfront Adventure" },
    { src: "/images/Rectangle 30.png", alt: "Pool portrait", text: "Poolside Serenity" },
    { src: "/images/bdc0d8c22484ed2efedca26ab0eaf085530dfdb7.jpg", alt: "Lifestyle", text: "Ultimate Wellness Journey" }
  ]

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 auto-rows-max">
      {/* Large left image - spans 6 columns, 2 rows */}
      <div className="exp-card col-span-12 md:col-span-6 md:row-span-2">
        <HoverGlowCard 
          src={experiences[0].src} 
          alt={experiences[0].alt} 
          text={experiences[0].text}
          aspect="aspect-[4/5] md:aspect-[3/4]" 
        />
      </div>

      {/* Top right image - spans 3 columns */}
      <div className="exp-card col-span-6 md:col-span-3">
        <HoverGlowCard 
          src={experiences[1].src} 
          alt={experiences[1].alt}
          text={experiences[1].text}
          aspect="aspect-[4/3]" 
        />
      </div>

      {/* Top far right image - spans 3 columns */}
      <div className="exp-card col-span-6 md:col-span-3">
        <HoverGlowCard 
          src={experiences[2].src} 
          alt={experiences[2].alt}
          text={experiences[2].text}
          aspect="aspect-[4/3]" 
        />
      </div>

      {/* Middle right wide image - spans 6 columns */}
      <div className="exp-card col-span-12 md:col-span-6">
        <HoverGlowCard 
          src={experiences[3].src} 
          alt={experiences[3].alt}
          text={experiences[3].text}
          aspect="aspect-[16/9]" 
        />
      </div>

      {/* Bottom left image - spans 8 columns */}
      <div className="exp-card col-span-12 md:col-span-8">
        <HoverGlowCard 
          src={experiences[4].src} 
          alt={experiences[4].alt}
          text={experiences[4].text}
          aspect="aspect-[16/9]" 
        />
      </div>

      {/* Bottom right image - spans 4 columns */}
      <div className="exp-card col-span-12 md:col-span-4">
        <HoverGlowCard 
          src={experiences[5].src} 
          alt={experiences[5].alt}
          text={experiences[5].text}
          aspect="aspect-[3/4]" 
        />
      </div>
    </div>
  )
}