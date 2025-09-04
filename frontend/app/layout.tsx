import type React from "react"
import "../src/index.css"

// Simple layout component for Vite (no longer using Next.js)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="app-layout">
      <head>
        <title>💕 C++ Aşkı ile Öğrenme Platformu 💕</title>
        <meta name="description" content="Kodlama sevginizi keşfedin! C++ ile programlama dünyasına romantik bir yolculuk yapın." />
      </head>
      {children}
    </div>
  )
}
