"use client";

import { HoverGlowCard } from "@/components/hover-glow-card";
import { useGsapOnScroll } from "@/hooks/use-gsap";

export function ExperiencesGrid() {
  useGsapOnScroll(".exp-card");

  const experiences = [
    {
      src: "/images/exp1.jpg",
      alt: "Forest lake",
      text: "For our valued guests",
    },
    {
      src: "/images/exp2.jpg",
      alt: "Pool and sea",
      text: "Infinity Pool Experience",
    },
    {
      src: "/images/exp3.jpg",
      alt: "Resort loungers",
      text: "GRINDLAB Global",
    },
    {
      src: "/images/exp4.jpg",
      alt: "Resort travel",
      text: "Better sleeping, better living",
    },

    {
      src: "/images/exp6.jpg",
      alt: "Lifestyle",
      text: "Ultimate Wellness Journey",
    },
    {
      src: "/images/exp5.jpg",
      alt: "Pool portrait",
      text: "Poolside Serenity",
    },
  ];

  return (
    <div
      className="grid gap-3 md:gap-4 min-h-[600px] md:min-h-[1260px]
                   grid-cols-1 grid-rows-6
                   md:grid-cols-3 md:grid-rows-[repeat(4,1fr)_2fr]"
    >
      {/* div1 - Large image, full width on mobile */}
      <div
        className="exp-card 
                     row-start-1 row-end-2 col-start-1 col-end-2
                     md:row-start-1 md:row-end-5 md:col-start-1 md:col-end-2"
      >
        <HoverGlowCard
          src={experiences[0].src}
          alt={experiences[0].alt}
          text={experiences[0].text}
          className="h-[250px] md:h-full"
        />
      </div>

      {/* div2 - Second image on mobile */}
      <div
        className="exp-card 
                     row-start-2 row-end-3 col-start-1 col-end-2
                     md:row-start-1 md:row-end-3 md:col-start-2 md:col-end-3"
      >
        <HoverGlowCard
          src={experiences[1].src}
          alt={experiences[1].alt}
          text={experiences[1].text}
          className="h-[200px] md:h-full"
        />
      </div>

      {/* div3 - Third image on mobile */}
      <div
        className="exp-card 
                     row-start-3 row-end-4 col-start-1 col-end-2
                     md:row-start-3 md:row-end-5 md:col-start-2 md:col-end-3"
      >
        <HoverGlowCard
          src={experiences[2].src}
          alt={experiences[2].alt}
          text={experiences[2].text}
          className="h-[200px] md:h-full"
        />
      </div>

      {/* div4 - Fourth image on mobile */}
      <div
        className="exp-card 
                     row-start-4 row-end-5 col-start-1 col-end-2
                     md:row-start-1 md:row-end-4 md:col-start-3 md:col-end-4"
      >
        <HoverGlowCard
          src={experiences[3].src}
          alt={experiences[3].alt}
          text={experiences[3].text}
          className="h-[220px] md:h-full"
        />
      </div>

      {/* div5 - Fifth image on mobile */}
      <div
        className="exp-card 
                     row-start-5 row-end-6 col-start-1 col-end-2
                     md:row-start-4 md:row-end-6 md:col-start-3 md:col-end-4"
      >
        <HoverGlowCard
          src={experiences[4].src}
          alt={experiences[4].alt}
          text={experiences[4].text}
          className="h-[200px] md:h-full"
        />
      </div>

      {/* div6 - Bottom banner, full width on both */}
      <div
        className="exp-card 
                     row-start-6 row-end-7 col-start-1 col-end-2
                     md:row-start-5 md:row-end-6 md:col-start-1 md:col-end-3"
      >
        <HoverGlowCard
          src={experiences[5].src}
          alt={experiences[5].alt}
          text={experiences[5].text}
          className="h-[180px] md:h-full"
        />
      </div>
    </div>
  );
}
