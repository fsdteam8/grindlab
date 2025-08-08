'use client'

import Image from "next/image"
import gsap from "gsap"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

type Props = {
  src: string
  alt: string
  className?: string
  aspect?: string
}

export function HoverGlowCard({ src, alt, className, aspect = "aspect-[4/3]" }: Props) {
  const ref = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const last = useRef<{ rx: number; ry: number } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onEnter = () => {
      gsap.to(el, { scale: 1.02, duration: 0.25, ease: "power2.out" })
    }

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const px = ((e.clientX - r.left) / r.width) * 2 - 1 // -1..1
      const py = ((e.clientY - r.top) / r.height) * 2 - 1
      const rx = -py * 8
      const ry = px * 8
      last.current = { rx, ry }

      if (frameRef.current) return
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null
        if (!last.current) return
        const { rx, ry } = last.current
        el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale(1.02)`
        el.style.boxShadow = `0 12px 40px rgba(20,184,122,0.15)`
      })
    }

    const onLeave = () => {
      last.current = null
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      // Reset transform immediately, then ease back scale with GSAP
      el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`
      el.style.boxShadow = `none`
      gsap.to(el, { scale: 1, duration: 0.35, ease: "power3.out" })
    }

    el.addEventListener("mouseenter", onEnter)
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)

    return () => {
      el.removeEventListener("mouseenter", onEnter)
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        "relative rounded-2xl overflow-hidden bg-neutral-900 ring-1 ring-white/10 will-change-transform",
        aspect,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(160px_160px_at_center,rgba(20,184,122,0.15),transparent_60%)] opacity-0 hover:opacity-100 transition-opacity duration-300" />
      <Image src={src || "/placeholder.svg"} alt={alt} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 50vw" />
    </div>
  )
}
