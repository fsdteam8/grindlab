import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "GRIND LAB",
  description:
    "Elite movement, mindset, and performance solutions for the world's top hotels and high‑performing clientele",
  icons: {
    icon: "/images/grindlab.svg",
  },
  openGraph: {
    title: "GRIND LAB",
    description:
      "Elite movement, mindset, and performance solutions for the world's top hotels and high‑performing clientele.",
    url: "https://grindlabglobal.com",
    siteName: "GRIND LAB",
    images: [
      {
        url: "/images/gindlab.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
