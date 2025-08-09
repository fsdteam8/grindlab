# Luxury Wellness Landing

A pixel-accurate, responsive landing page built with Next.js App Router, TailwindCSS, shadcn/ui, Embla Carousel, and GSAP for interactivity and scroll animations. The UI matches the provided screenshots including the “For our valued guests” carousel and “What Partners Say” testimonials.

What’s included
- Reusable components: SiteHeader, SectionHeading, AutoCarousel (with bottom‑center controls), GuestsCarousel, ExperiencesGrid (GSAP tilt/glow hover), TestimonialsCarousel, ContactSection.
- Animations: GSAP + ScrollTrigger drive hero reveals, fade‑up on scroll, and hover tilt/glow on experience cards.
- Auto carousels: Embla with autoplay and centered controls to match the design.
- Form validation: react‑hook‑form + Zod schema.
- Email sending: Nodemailer via /api/contact. Falls back to jsonTransport for preview; provide SMTP env vars to send real emails.
- CSS variables: Brand color and helpers defined in globals.css.

SMTP setup
Set these env vars on Vercel or your environment to send real mail:
- SMTP_HOST, SMTP_PORT, SMTP_SECURE (“true” or “false”), SMTP_USER, SMTP_PASS
- CONTACT_TO, CONTACT_FROM
