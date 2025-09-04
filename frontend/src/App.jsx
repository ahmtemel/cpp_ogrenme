// frontend/src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Module00 from './Module00.jsx';
import Module01 from './Module01.jsx';
import Module02 from './Module02.jsx'; // Yeni eklendi
import Module03 from './Module03.jsx'; // Yeni eklendi
import Module04 from './Module04.jsx'; // Yeni eklendi

function App() {
  const [isPopupVisibleInApp, setIsPopupVisibleInApp] = useState(false);

  return (
    <div className="main-container">
      <div className={`content-area ${isPopupVisibleInApp ? 'popup-open' : ''}`}>
        <header className="App-header">
          <h1>C++ OOP Öğrenme Platformu</h1>
        </header>
        <main>
          <Routes>
            {/* Ana sayfa - Modül listesi */}
            <Route path="/" element={
              <section className="module-list">
                <h2>Modüller</h2>
                <nav>
                  <ul>
                    <li><Link to="/module00">Modül 00: Temel Kavramlar ve Sınıflar</Link></li>
                    <li><Link to="/module01">Modül 01: Bellek, Puançınlar ve Referanslar</Link></li>
                    <li><Link to="/module02">Modül 02: Operatör Yükleme ve Kanonik Form</Link></li>
                    <li><Link to="/module03">Modül 03: Kalıtım</Link></li>
                    <li><Link to="/module04">Modül 04: Çok Biçimlilik ve Soyut Sınıflar</Link></li>
                  </ul>
                </nav>
              </section>
            } />

            {/* Modül sayfaları */}
            <Route path="/module00" element={<Module00 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
            <Route path="/module01" element={<Module01 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
            <Route path="/module02" element={<Module02 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
            <Route path="/module03" element={<Module03 setIsPopupVisibleInApp={setIsPopupVisibleInApp} />} />
            <Route path="/module04" element={<Module04 />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;