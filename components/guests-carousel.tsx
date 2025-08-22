"use client";

import { GsapCarousel } from "@/components/gsap-carousel";
import { ImageCard } from "@/components/image-card";

type Item = {
  src: string;
  alt: string;
  withLabel?: boolean;
};

const items: Item[] = [
  { src: "/images/service-1.jpg", alt: "Guest relaxing in pool" },
  { src: "/images/service-2.jpg", alt: "Woman at resort with luggage" },
  { src: "/images/service-3.jpg", alt: "Doing warmup with coach" },
  { src: "/images/service-4.jpg", alt: "Guest relaxing in pool repeat" },
  {
    src: "/images/exp2.jpg",
    alt: "Resort pool and ocean view",
  },
  {
    src: "/images/exp6.jpg",
    alt: "Flexing",
    withLabel: true,
  },
];

export function GuestsCarousel({
  controls = "bottom" as const,
}: {
  controls?: "bottom" | "sides";
}) {
  return (
    <GsapCarousel
      items={items}
      autoplayDelay={3200}
      gapPx={16}
      controls={controls}
      perView={{ base: 1, sm: 2, lg: 4 }}
      renderItem={(items: Item) => (
        <div className="aspect-[4/3]">
          <ImageCard
            src={items.src || "/images/Rectangle 21.png"}
            alt={items.alt}
            label={items.alt || "For our valued guests"}
          />
        </div>
      )}
    />
  );
}
