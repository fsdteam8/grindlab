"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

type Props = {
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  description,
  className,
  align = "left",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current ? Array.from(ref.current.children) : [],
        { y: 18, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "",
        className
      )}
    >
      <h2 className="text-3xl md:text-[48px] font-bold font-primary leading-[120%] tracking-[0%] text-[#D9D9D9]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 font-medium text-base leading-[150%] text-white">
          {description}
        </p>
      ) : null}
    </div>
  );
}

SectionHeading.defaultProps = {
  description: "",
  className: "",
  align: "left",
};
