'use client'

import { GsapCarousel } from "@/components/gsap-carousel"
import { ImageCard } from "@/components/image-card"

type Item = {
  src: string
  alt: string
  withLabel?: boolean
}

const items: Item[] = [
  { src: "/images/Rectangle 18 (1).png", alt: "Resort pool and ocean view" },
  { src: "/images/Rectangle 18 (2).png", alt: "Forest lake at sunrise", withLabel: true },
  { src: "/images/Rectangle 18 (3).png", alt: "Guest relaxing in pool" },
  { src: "/images/Rectangle 21.png", alt: "Woman at resort with luggage" },
  { src: "/images/Rectangle 29.png", alt: "Resort pool repeat B" },
  { src: "/images/Rectangle 21.png", alt: "Guest relaxing in pool repeat" },
]

export function GuestsCarousel({ controls = "bottom" as const }: { controls?: "bottom" | "sides" }) {
  return (
    <GsapCarousel
      items={items}
      autoplayDelay={3200}
      gapPx={16}
      controls={controls}
      perView={{ base: 1, sm: 2, lg: 4 }}
      renderItem={(items: Item) => (
        <div className="aspect-[4/3] border">
          <ImageCard
            src={items.src || "/images/Rectangle 21.png"}
            alt={items.alt}
            label={items.withLabel ? "For our valued guests" : ""}
          />
        </div>
      )}
    />
  )
}
