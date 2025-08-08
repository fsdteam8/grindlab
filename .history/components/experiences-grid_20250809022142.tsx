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
    <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-[repeat(4,1fr)_2fr] gap-3 md:gap-4">
      {/* div1: Large left image - grid-area: 1 / 1 / 5 / 2 */}
      <div className="exp-card md:row-start-1 md:row-end-5 md:col-start-1 md:col-end-2">
        <HoverGlowCard 
          src={experiences[0].src} 
          alt={experiences[0].alt} 
          text={experiences[0].text}
          className="h-[300px] md:h-full"
        />
      </div>

      {/* div2: Top center image - grid-area: 1 / 2 / 3 / 3 */}
      <div className="exp-card md:row-start-1 md:row-end-3 md:col-start-2 md:col-end-3">
        <HoverGlowCard 
          src={experiences[1].src} 
          alt={experiences[1].alt}
          text={experiences[1].text}
          className="h-[200px] md:h-full"
        />
      </div>

      {/* div3: Middle center image - grid-area: 3 / 2 / 5 / 3 */}
      <div className="exp-card md:row-start-3 md:row-end-5 md:col-start-2 md:col-end-3">
        <HoverGlowCard 
          src={experiences[2].src} 
          alt={experiences[2].alt}
          text={experiences[2].text}
          className="h-[200px] md:h-full"
        />
      </div>

      {/* div4: Top right image - grid-area: 1 / 3 / 4 / 4 */}
      <div className="exp-card md:row-start-1 md:row-end-4 md:col-start-3 md:col-end-4">
        <HoverGlowCard 
          src={experiences[3].src} 
          alt={experiences[3].alt}
          text={experiences[3].text}
          className="h-[250px] md:h-full"
        />
      </div>

      {/* div5: Bottom right image - grid-area: 4 / 3 / 6 / 4 */}
      <div className="exp-card md:row-start-4 md:row-end-6 md:col-start-3 md:col-end-4">
        <HoverGlowCard 
          src={experiences[4].src} 
          alt={experiences[4].alt}
          text={experiences[4].text}
          className="h-[250px] md:h-full"
        />
      </div>

      {/* div6: Bottom wide image - grid-area: 5 / 1 / 6 / 3 */}
      <div className="exp-card md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3">
        <HoverGlowCard 
          src={experiences[5].src} 
          alt={experiences[5].alt}
          text={experiences[5].text}
          className="h-[200px] md:h-full"
        />
      </div>
    </div>
  )
}