"use client"

// frontend/src/App.jsx
import { useState, useEffect } from "react"
import { Routes, Route, Link, useLocation } from "react-router-dom"
import "./App.css"
import Module00 from "./Module00.jsx"
import Module01 from "./Module01.jsx"
import Module02 from "./Module02.jsx"
import Module03 from "./Module03.jsx"
import Module04 from "./Module04.jsx"

function App() {
  const [isPopupVisibleInApp, setIsPopupVisibleInApp] = useState(false)

  useEffect(() => {
    const createFloatingHeart = () => {
      const heart = document.createElement("div")
      heart.innerHTML = "💖"
      heart.className = "floating-heart"
      heart.style.left = Math.random() * 100 + "vw"
      heart.style.animationDelay = Math.random() * 2 + "s"
      heart.style.animationDuration = Math.random() * 3 + 5 + "s"
      document.body.appendChild(heart)

      setTimeout(() => {
        heart.remove()
      }, 8000)
    }

    const interval = setInterval(createFloatingHeart, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>💕 C++ Aşkı ile Öğrenme Platformu 💕</h1>
        <p>
          Kodlama sevginizi keşfedin! C++ ile programlama dünyasına romantik bir yolculuk yapın. Her satır kod, yeni
          bir aşk hikayesi...
        </p>
      </header>

      <Navigation />

      <main>
        <Routes>
          {/* Ana sayfa - Modül listesi */}
          <Route
            path="/"
            element={
              <section className="module-list">
                <h2>Modüller</h2>
                <nav>
                  <ul>
                    <li>
                      <Link to="/module00">Modül 00: Temel Kavramlar ve Sınıflar</Link>
                    </li>
                    <li>
                      <Link to="/module01">Modül 01: Bellek, Puançınlar ve Referanslar</Link>
                    </li>
                    <li>
                      <Link to="/module02">Modül 02: Operatör Yükleme ve Kanonik Form</Link>
                    </li>
                    <li>
                      <Link to="/module03">Modül 03: Kalıtım</Link>
                    </li>
                    <li>
                      <Link to="/module04">Modül 04: Çok Biçimlilik ve Soyut Sınıflar</Link>
                    </li>
                  </ul>
                </nav>
              </section>
            }
          />

          {/* Modül sayfaları */}
          <Route path="/module00" element={<Module00 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
          <Route path="/module01" element={<Module01 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
          <Route path="/module02" element={<Module02 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
          <Route path="/module03" element={<Module03 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
          <Route path="/module04" element={<Module04 />} />
        </Routes>
      </main>
    </div>
  )
}

function Navigation() {
  const location = useLocation()

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Giriş - Aşka İlk Adım
          </Link>
        </li>
        <li>
          <Link to="/module00" className={location.pathname === "/module00" ? "active" : ""}>
            Modül 00: Temel Kavramlar ve Sınıflar
          </Link>
        </li>
        <li>
          <Link to="/module01" className={location.pathname === "/module01" ? "active" : ""}>
            Modül 01: Bellek, Puançınlar ve Referanslar
          </Link>
        </li>
        <li>
          <Link to="/module02" className={location.pathname === "/module02" ? "active" : ""}>
            Modül 02: Operatör Yükleme ve Kanonik Form
          </Link>
        </li>
        <li>
          <Link to="/module03" className={location.pathname === "/module03" ? "active" : ""}>
            Modül 03: Kalıtım
          </Link>
        </li>
        <li>
          <Link to="/module04" className={location.pathname === "/module04" ? "active" : ""}>
            Modül 04: Çok Biçimlilik ve Soyut Sınıflar
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default App
