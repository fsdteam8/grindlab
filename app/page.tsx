/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GuestsCarousel } from "@/components/guests-carousel";
import { SectionHeading } from "@/components/section-heading";
import { ExperiencesGrid } from "@/components/experiences-grid";
import { SiteHeader } from "@/components/site-header";
import { useEffect, useRef } from "react";
import { useGsapOnScroll } from "@/hooks/use-gsap";
import gsap from "gsap";
import TestimonialsCarousel from "@/components/testimonials-carousel";
import ContactSection from "@/components/contact-section";

export default function Page() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".hero-title", {
        y: 28,
        autoAlpha: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-sub",
          { y: 20, autoAlpha: 0, duration: 0.7, ease: "power3.out" },
          "-=0.4"
        )
        .from(
          ".hero-cta",
          { y: 16, autoAlpha: 0, duration: 0.6, ease: "power3.out" },
          "-=0.35"
        );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useGsapOnScroll(".gsap-fade-up");

  return (
    <div className="min-h-dvh  text-white  font-secondary">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section
          ref={heroRef}
          className="relative isolat min-h-screen flex items-center justify-center"
        >
          <div className="absolute inset-0 -z-10 ">
            <Image
              src="/images/hero.jpg"
              alt="Sunset loungers at a luxury beach resort"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-bl from-black/50 via-black/20 to-black/80" />
          </div>
          <div className="container px-4 md:px-8">
            <div className="max-w-3xl pt-28 md:pt-36 pb-24 md:pb-36">
              <h1
                className="hero-title md:text-[72px]  text-4xl font-semibold tracking-[0%]  leading-[1.1] font-primary"
                style={{ textShadow: "0 4px 24px rgba(0,0,0,0.35)" }}
              >
                "Luxury Wellness. Global Access."
              </h1>
              <p className="hero-sub mt-5 text-base md:text-[32px] text-white/85 leading-relaxed ">
                Elite movement, mindset, and performance solutions for the
                world&apos;s top hotels and high‑performing clientele.
              </p>
              <div className="hero-cta mt-8 flex gap-3">
                <Link href={"#services"}>
                  {" "}
                  <Button
                    size="lg"
                    className="bg-brand text-black hover:opacity-90 font-bold"
                  >
                    Explore Services
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:text-white font-bold hover:bg-white/10"
                >
                  About Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* For our valued guests (matches screenshot with centered controls) */}
        <section className="relative py-14 md:py-20 bg-black">
          <div className="container px-4 md:px-8">
            <SectionHeading
              title="For our valued guests"
              description="VIP training, mobility classes, residencies, in‑room programs, and more."
              align="center"
            />
            <div className="mt-[42px]">
              <GuestsCarousel controls="bottom" />
            </div>
          </div>
        </section>

        {/* Tailored Wellness Experiences */}
        <section className="relative bg-black py-14 md:py-24" id="services">
          <div className="container px-4 md:px-8">
            <SectionHeading
              title="Tailored Wellness Experiences"
              description="VIP training, mobility classes, resilience, in‑room programs, and more."
              className="gsap-fade-up"
            />
            <div className="mt-8 md:mt-10">
              <ExperiencesGrid />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="relative bg-black py-14 md:py-24">
          <div className="container px-4 md:px-8">
            <div className="mt-8">
              <TestimonialsCarousel />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="relative" id="contact">
          <ContactSection />
        </section>

        {/* Footer */}
        <footer className="relative mt-0">
          <div className="absolute inset-0 -z-10">
            <Image
              src="/images/dark-waves.png"
              alt="Dark wave pattern"
              fill
              className="object-cover  "
              sizes="100vw"
            />
          </div>

          <div className="container px-4 md:px-8 py-10 md:py-14">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-10 text-sm">
              <div className="space-y-4 w-[408px] col-span-2">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/grindlab.svg"
                    alt="Grind Lab"
                    width={120}
                    height={32}
                  />
                </div>
                <p className="text-white font-medium text-base leading-[150%] tracking-normal">
                  Our suite of living experiences are all carefully curated.
                  From inspired minds and mentors, to kitchen and sport.
                </p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6 md:text-2xl text-lg tracking-[0%] uppercase">
                  Company
                </h4>
                <ul className="space-y-2 text-white ">
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-[limegreen] font-semibold text-base leading-[150%] tracking-normal uppercase"
                    >
                      Event Management
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className=" hover:text-[limegreen] font-semibold text-base leading-[150%] tracking-normal uppercase"
                    >
                      Corporate Concierge
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6 md:text-2xl text-lg tracking-[0%] uppercase">
                  Partners
                </h4>
                <ul className="space-y-2 text-white/70">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[limegreen] font-semibold text-base leading-[150%] tracking-normal uppercase"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[limegreen] font-semibold text-base leading-[150%] tracking-normal uppercase"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-6 md:text-2xl text-lg tracking-[0%] uppercase">
                  Social Media
                </h4>
                <ul className="space-y-2 text-white">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[limegreen] font-semibold text-base leading-[150%] tracking-normal uppercase"
                    >
                      Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[limegreen] font-semibold text-base leading-[150%] tracking-normal uppercase"
                    >
                      LinkedIn
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-[limegreen] font-semibold text-base leading-[150%] tracking-normal uppercase"
                    >
                      YouTube
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <Separator className="my-6 bg-white/10" />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
              <p className="uppercase">
                © {new Date().getFullYear()} Grind Lab. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="hover:text-white hover:underline">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-white hover:underline">
                  Cookies
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
