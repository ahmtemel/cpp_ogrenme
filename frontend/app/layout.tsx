import type React from "react"
import type { Metadata } from "next"
import "../src/index.css"

export const metadata: Metadata = {
  title: "💕 C++ Aşkı ile Öğrenme Platformu 💕",
  description: "Kodlama sevginizi keşfedin! C++ ile programlama dünyasına romantik bir yolculuk yapın.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
