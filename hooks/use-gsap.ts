'use client'

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

let registered = false

function ensureRegistered() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger)
    registered = true
  }
}

export function useGsapOnScroll(selector: string, offset = "top 85%") {
  useEffect(() => {
    ensureRegistered()
    const elements = gsap.utils.toArray<HTMLElement>(selector)
    const anims: gsap.core.Tween[] = []
    elements.forEach((el) => {
      anims.push(
        gsap.fromTo(
          el,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: offset,
              toggleActions: "play none none reverse",
            },
          }
        )
      )
    })
    return () => {
      anims.forEach((a) => a.kill())
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [selector, offset])
}
