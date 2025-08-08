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

  const measureAndSet = useCallback(() => {
    const newPv = computePerView()
    setPv(newPv)
    // Force a re-position on resize with a small delay
    setTimeout(() => {
      if (isReady) {
        goTo(Math.min(index, Math.max(items.length - newPv, 0)), false)
      }
    }, 50)
  }, [computePerView, index, isReady, items.length])

  useEffect(() => {
    measureAndSet()
    window.addEventListener("resize", measureAndSet)
    return () => window.removeEventListener("resize", measureAndSet)
  }, [measureAndSet])

  // Initialize carousel after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true)
      goTo(0, false)
    }, 100) // Small delay to ensure DOM is ready

    return () => clearTimeout(timer)
  }, [])

  const goTo = useCallback(
    (next: number, animate = true) => {
      const track = trackRef.current
      const root = rootRef.current
      if (!track || !root || !isReady) return

      const containerW = root.clientWidth
      if (containerW === 0) return // Container not measured yet

      const slideW = (containerW - gapPx * (pv - 1)) / pv
      const clampedIndex = Math.min(Math.max(next, 0), totalPages - 1)
      const x = -clampedIndex * (slideW + gapPx)

      if (animate) {
        gsap.to(track, { x, duration: 0.6, ease: "power2.out" })
      } else {
        gsap.set(track, { x })
      }

      setIndex(clampedIndex)
    },
    [gapPx, pv, totalPages, isReady]
  )

  const next = useCallback(() => {
    const n = (index + 1) % totalPages
    goTo(n, true)
  }, [index, totalPages, goTo])

  const prev = useCallback(() => {
    const p = (index - 1 + totalPages) % totalPages
    goTo(p, true)
  }, [index, totalPages, goTo])

  // Autoplay
  useEffect(() => {
    if (!isReady || totalPages <= 1) return

    if (autoplayRef.current) window.clearInterval(autoplayRef.current)
    autoplayRef.current = window.setInterval(() => {
      if (!hovering.current) next()
    }, autoplayDelay)

    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current)
      autoplayRef.current = null
    }
  }, [autoplayDelay, next, totalPages, isReady])

  // Update slide widths dynamically
  const slideStyle = useMemo(() => {
    const root = rootRef.current
    if (!root || !isReady) return {}
    
    const containerW = root.clientWidth
    if (containerW === 0) return {}
    
    const slideW = (containerW - gapPx * (pv - 1)) / pv
    return { width: `${slideW}px` }
  }, [gapPx, pv, isReady])

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
              className="shrink-0"
              style={slideStyle}
            >
              {renderItem(item, i)}
            </div>
          ))}
        </div>
      </div>

      {controls === "bottom" && totalPages > 1 && (
        <div className="mt-6 flex w-full items-center justify-center gap-4">
          <button
            aria-label="Previous"
            onClick={prev}
            className="inline-flex size-8 items-center justify-center rounded-full border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>

          <div className="flex items-center gap-3">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i, true)}
                className={cn(
                  "size-2.5 rounded-full border border-white/20 transition-all",
                  i === index
                    ? "bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]"
                    : "bg-white/20 hover:bg-white/30"
                )}
              />
            ))}
          </div>

          <button
            aria-label="Next"
            onClick={next}
            className="inline-flex size-8 items-center justify-center rounded-full border border-emerald-500 text-emerald-500 hover:bg-emerald-500 hover:text-white transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}