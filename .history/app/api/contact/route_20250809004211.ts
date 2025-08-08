import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type Body = {
  name: string
  email: string
  phone?: string
  message: string
}

// Note: In this preview there are no environment variables. We fallback to jsonTransport
// which simulates sending and logs a JSON payload. Provide SMTP settings in your project
// to send real emails:
// SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM

export async function POST(req: Request) {
  const data = (await req.json()) as Body

  if (!data?.name || !data?.email || !data?.message) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_TO,
    CONTACT_FROM,
  } = process.env as Record<string, string | undefined>

  let transport: nodemailer.Transporter

  if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS) {
    transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: String(SMTP_SECURE ?? "false") === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  } else {
    transport = nodemailer.createTransport({ jsonTransport: true })
  }

  const to = CONTACT_TO || "demo@example.com"
  const from = CONTACT_FROM || "no-reply@example.com"

  const info = await transport.sendMail({
    from,
    to,
    subject: `New Contact: ${data.name}`,
    replyTo: data.email,
    text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "-"}\n\n${data.message}`,
    html: `
      <h2>New Contact</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || "-"}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, "<br/>")}</p>
    `,
  })

  return NextResponse.json({ ok: true, id: (info as any).messageId ?? "preview" })
}
