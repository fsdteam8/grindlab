'use client'

import useEmblaCarousel, { type EmblaOptionsType } from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type AutoCarouselProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  slideClassName?: string
  options?: EmblaOptionsType
  autoplayDelay?: number
  className?: string
  withDots?: boolean
  controls?: "sides" | "bottom"
}

export function AutoCarousel<T>({
  items,
  renderItem,
  slideClassName = "basis-full",
  options,
  autoplayDelay = 4000,
  className,
  withDots = true,
  controls = "sides",
}: AutoCarouselProps<T>) {
  const autoplay = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false, stopOnMouseEnter: true })
  )
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", ...options },
    [autoplay.current]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  )

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    setScrollSnaps(emblaApi.scrollSnapList())
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", () => {
      setScrollSnaps(emblaApi.scrollSnapList())
      onSelect()
    })
  }, [emblaApi, onSelect])

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {items.map((item, i) => (
            <div className={cn("min-w-0 pr-4", slideClassName)} key={i}>
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {controls === "sides" ? (
        <>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Previous"
            className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/40 hover:bg-black/60 text-white"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Next"
            className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/40 hover:bg-black/60 text-white"
            onClick={() => emblaApi?.scrollNext()}
          >
            <ChevronRight className="size-5" />
          </Button>
        </>
      ) : (
        <div className="mt-6 flex w-full items-center justify-center gap-4">
          <button
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
            className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-black transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          {withDots && (
            <div className="flex items-center gap-3">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "size-2.5 rounded-full border border-white/20",
                    i === selectedIndex ? "bg-brand shadow-[0_0_0_3px_rgba(20,184,122,0.25)]" : "bg-white/20 hover:bg-white/30"
                  )}
                />
              ))}
            </div>
          )}
          <button
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
            className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-black transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
