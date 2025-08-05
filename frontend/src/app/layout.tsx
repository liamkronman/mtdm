import type { Metadata } from "next"
import { Kanit, DM_Sans, DM_Mono } from "next/font/google"
import "./globals.css"

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-kanit",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-dm-sans",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
})

export const metadata: Metadata = {
  title: "Mordor - AI Prompt Engineering Platform",
  description: "Master the art and science of prompt engineering with the best AI prompts and tools",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${kanit.variable} ${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-dm-sans">
        {children}
      </body>
    </html>
  )
}
