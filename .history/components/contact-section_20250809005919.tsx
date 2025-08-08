'use client'

import Image from "next/image"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const FormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional().refine((v) => !v || /^[+()\-.\s\d]{7,}$/.test(v), "Enter a valid phone number"),
  message: z.string().min(10, "Message should be at least 10 characters"),
})

type FormValues = z.infer<typeof FormSchema>

export function ContactSection() {
  // const { toast } = useToast()
  const [serverError, setServerError] = useState<string>("")
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  })

  async function onSubmit(data: FormValues) {
    setServerError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.error || "Failed to send message")
      }
      toast()
      reset()
    } catch (e: any) {
      setServerError(e.message || "Something went wrong")
    }
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src="/images/contact-bg.png" alt="Foggy sea with ships" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="grid-dots absolute inset-0 opacity-40" />
      </div>
      <div className="container px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold">{"Let’s Elevate Your Guest Experience"}</h3>
            <p className="text-white/70 mt-2">
              Contact us to craft a custom wellness experience for your hotel, resort, or private retreat.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="sr-only" htmlFor="name">Name</label>
                  <Input id="name" placeholder="Name" {...register("name")} className="bg-white/5 border-white/15 text-white placeholder:text-white/50" />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
                </div>
                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <Input id="email" type="email" placeholder="Email" {...register("email")} className="bg-white/5 border-white/15 text-white placeholder:text-white/50" />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="sr-only" htmlFor="phone">Phone number</label>
                  <Input id="phone" placeholder="Phone number" {...register("phone")} className="bg-white/5 border-white/15 text-white placeholder:text-white/50" />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone.message as string}</p>}
                </div>
              </div>
              <div>
                <label className="sr-only" htmlFor="message">Message</label>
                <Textarea id="message" placeholder="Type your message here..." {...register("message")} className="min-h-32 bg-white/5 border-white/15 text-white placeholder:text-white/50" />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>}
              </div>
              <div className="flex items-center gap-3">
                <Button type="submit" disabled={isSubmitting} className="bg-brand text-black hover:opacity-90">
                  {isSubmitting ? "Sending..." : "Submit"}
                </Button>
                {serverError ? <p className="text-xs text-red-400">{serverError}</p> : null}
              </div>
            </form>
          </div>

          <div className="lg:pl-8">
            <h4 className="text-2xl font-semibold">Contact Information</h4>
            <div className="mt-4 space-y-3 text-white/80">
              <p>Maui, Hawaii, USA</p>
              <p>Call us: +1 123-567890</p>
              <p>WhatsApp: 1234567890</p>
              <div className="flex gap-4 pt-2">
                <SocialIcon label="f" />
                <SocialIcon label="in" />
                <SocialIcon label="x" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SocialIcon({ label }: { label: string }) {
  return (
    <span className="inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/50">
      <span className="text-white/80 text-sm uppercase tracking-wider">{label}</span>
    </span>
  )
}
