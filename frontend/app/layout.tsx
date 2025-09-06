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
        <meta name="description" content="C++ öğrenirken bir yandan da seni ne kadar sevdiğimi sürekli duymak ister misin güzelim?" />
      </head>
      {children}
    </div>
  )
}
