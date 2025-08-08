'use client'

import { AutoCarousel } from "@/components/auto-carousel"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star } from 'lucide-react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Testimonial = {
  quote: string
  name: string
  location: string
}

const testimonials: Testimonial[] = [
  {
    quote:
      "We’ve been ordering from TALES FRESH for over one year now, and the quality of their organic produce is consistently excellent.",
    name: "Sarah Johnson",
    location: "Portland, OR",
  },
  {
    quote:
      "The team’s expert programs elevate guest experience at every level. Warm, focused, and results‑driven.",
    name: "James Lee",
    location: "Austin, TX",
  },
  {
    quote:
      "Tailored sessions for executives were spot on. Our staff loved the resilience workshops and mobility classes.",
    name: "Amelia Chen",
    location: "New York, NY",
  },
  {
    quote:
      "Professional, discreet, and world‑class. Our VIPs keep asking for them by name.",
    name: "Miguel Santos",
    location: "Miami, FL",
  },
]

export function TestimonialsCarousel({ controls = "bottom" as const }: { controls?: "sides" | "bottom" }) {
  return (
    <AutoCarousel
      items={testimonials}
      autoplayDelay={4500}
      slideClassName="basis-[88%] sm:basis-1/2 lg:basis-1/3"
      options={{ loop: true, align: "start" }}
      renderItem={(t) => (
        <Card className="bg-[#111314]/90 border-white/10 h-full">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-1 text-brand">
              {new Array(5).fill(0).map((_, i) => (
                <Star key={i} className="size-4 fill-[var(--brand)] text-[var(--brand)]" />
              ))}
            </div>
          </CardHeader>
          <CardContent className="text-white/80">
            <p className="text-sm leading-relaxed">{t.quote}</p>
          </CardContent>
          <CardFooter className="pt-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>GL</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-white/60">{t.location}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      )}
      withDots={true}
      controls={controls}
    />
  )
}
