'use client'

import Image from "next/image"
import { cn } from "@/lib/utils"

type Props = {
  src: string
  alt: string
  label?: string
  className?: string
  rounded?: string
}

export function ImageCard({ src, alt, label, className, rounded = "rounded-2xl" }: Props) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden group", rounded, className)}>
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 85vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20 pointer-events-none " />
      {label && (
        <div className="absolute inset-0 flex items-center justify-center ">
          <span className="text-lg md:text-xl font-medium text-white/95 mix-blend-luminosity text-center px-4 ">
            {label}
          </span>
        </div>
      )}
    </div>
  )
}