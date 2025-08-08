'use client'

import gsap from "gsap"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"

type GsapCarouselProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  className?: string
  /** Tailwind gap size between slides (in px) — used for precise positioning math */
  gapPx?: number
  /** Autoplay delay (ms) */
  autoplayDelay?: number
  /** Controls layout; 'bottom' matches the screenshot */
  controls?: "bottom" | "sides"
  /** Number of visible slides for each breakpoint */
  perView?: { base: number; sm: number; lg: number }
}

export function GsapCarousel<T>({
  items,
  renderItem,
  className,
  gapPx = 16,
  autoplayDelay = 3500,
  controls = "bottom",
  perView = { base: 1, sm: 2, lg: 4 },
}: GsapCarouselProps<T>) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const [pv, setPv] = useState<number>(perView.lg)
  const [isReady, setIsReady] = useState(false)
  const autoplayRef = useRef<number | null>(null)
  const hovering = useRef(false)

  // Calculate pages: we slide by 1 card, loop at end
  const totalPages = useMemo(() => {
    const max = Math.max(items.length - pv, 0)
    return max + 1
  }, [items.length, pv])

  const computePerView = useCallback(() => {
    const w = window.innerWidth
    if (w < 640) return perView.base
    if (w < 1024) return perView.sm
    return perView.lg
  }, [perView.base, perView.sm, perView.lg])

  const goTo = useCallback(
    (next: number, animate = true) => {
      const track = trackRef.current
      const root = rootRef.current
      if (!track || !root || !isReady) return

      const containerW = root.clientWidth
      if (containerW === 0) return // Wait for proper measurement
      
      const slideW = (containerW - gapPx * (pv - 1)) / pv
      const x = -Math.min(Math.max(next, 0), totalPages - 1) * (slideW + gapPx)

      if (animate) {
        gsap.to(track, { x, duration: 0.6, ease: "power2.out" })
      } else {
        gsap.set(track, { x })
      }

      setIndex(next)
    },
    [gapPx, pv, totalPages, isReady]
  )

  const measureAndSet = useCallback(() => {
    const newPv = computePerView()
    setPv(newPv)
    
    // Wait for next frame to ensure DOM is updated
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        goTo(index, false)
      })
    })
  }, [computePerView, index, goTo])

  // Initialize carousel after mount
  useEffect(() => {
    const initCarousel = () => {
      setPv(computePerView())
      setIsReady(true)
      
      // Double RAF to ensure DOM is ready
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          goTo(0, false)
        })
      })
    }

    // Small delay to ensure images start loading
    const timer = setTimeout(initCarousel, 100)
    
    return () => clearTimeout(timer)
  }, [computePerView, goTo])

  useEffect(() => {
    if (!isReady) return
    
    window.addEventListener("resize", measureAndSet)
    return () => window.removeEventListener("resize", measureAndSet)
  }, [measureAndSet, isReady])

  const next = useCallback(() => {
    if (!isReady) return
    const n = (index + 1) % totalPages
    goTo(n, true)
  }, [index, totalPages, goTo, isReady])

  const prev = useCallback(() => {
    if (!isReady) return
    const p = (index - 1 + totalPages) % totalPages
    goTo(p, true)
  }, [index, totalPages, goTo, isReady])

  // Autoplay
  useEffect(() => {
    if (!isReady || totalPages <= 1) return
    
    if (autoplayRef.current) window.clearInterval(autoplayRef.current)
    autoplayRef.current = window.setInterval(() => {
      if (!hovering.current) next()
    }, autoplayDelay)
    
    return () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }
  }, [autoplayDelay, next, totalPages, isReady])

  // Reset GSAP transforms on mount
  useEffect(() => {
    if (trackRef.current) {
      gsap.set(trackRef.current, { clearProps: "all" })
    }
  }, [])

  if (!isReady) {
    // Show loading state or render items without animation
    return (
      <div className={cn("relative min-h-[220px] sm:min-h-[260px]", className)}>
        <div className="overflow-hidden">
          <div className="flex" style={{ gap: `${gapPx}px` }}>
            {items.map((item, i) => (
              <div
                key={i}
                className={cn("shrink-0 basis-[85%] sm:basis-1/2 lg:basis-1/4")}
              >
                {renderItem(item, i)}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={cn("relative min-h-[220px] sm:min-h-[260px]", className)}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
    >
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex"
          style={{ gap: `${gapPx}px` }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className={cn("shrink-0 basis-[85%] sm:basis-1/2 lg:basis-1/4")}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      {controls === "bottom" ? (
        <div className="mt-6 flex w-full items-center justify-center gap-4">
          <button
            aria-label="Previous"
            onClick={prev}
            className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-black transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-3 ">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i, true)}
                className={cn(
                  "size-2.5 rounded-full border border-white/20",
                  i === index
                    ? "bg-brand shadow-[0_0_0_3px_rgba(20,184,122,0.25)]"
                    : "bg-white/20 hover:bg-white/30"
                )}
              />
            ))}
          </div>

          <button
            aria-label="Next"
            onClick={next}
            className="inline-flex size-8 items-center justify-center rounded-full border border-[var(--brand)] text-[var(--brand)] hover:bg-[var(--brand)] hover:text-black transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      ) : null}
    </div>
  )
}