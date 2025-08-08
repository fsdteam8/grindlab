'use client'

import { GsapCarousel } from "@/components/gsap-carousel"
import { ImageCard } from "@/components/image-card"

type Item = {
  src: string
  alt: string
  withLabel?: boolean
}

const items: Item[] = [
  { src: "/images/rect-31.png", alt: "Resort pool and ocean view" },
  { src: "/images/rect-21.jpg", alt: "Forest lake at sunrise", withLabel: true },
  { src: "/images/hero.jpg", alt: "Resort loungers" },
  { src: "/images/rect-29.png", alt: "Guest relaxing in pool" },
  { src: "/images/rect-30.png", alt: "Woman at resort with luggage" },
  { src: "/images/rect-31.png", alt: "Resort pool repeat B" },
  { src: "/images/rect-29.png", alt: "Guest relaxing in pool repeat" },
]

export function GuestsCarousel({ controls = "bottom" as const }: { controls?: "bottom" | "sides" }) {
  return (
    <GsapCarousel
      items={items}
      autoplayDelay={3200}
      gapPx={16}
      controls={controls}
      perView={{ base: 1, sm: 2, lg: 4 }}
      renderItem={(item: Item) => (
        <div className="aspect-[4/3]">
          <ImageCard
            src={item.src || "/placeholder.svg"}
            alt={item.alt}
            label={item.withLabel ? "For our valued guests" : ""}
          />
        </div>
      )}
    />
  )
}
