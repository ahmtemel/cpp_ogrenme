// frontend/src/App.jsx
import React, { useState, useRef } from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor.jsx';
import AIPopup from './components/AIPopup.jsx';

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [code, setCode] = useState(`#include <iostream>\n\nint main() {\n    std::cout << "Merhaba, Dunya!";\n    return 0;\n}`);
  const [output, setOutput] = useState('');

  const contentRef = useRef(null);
  const codeRef = useRef(null);

  const handleOpenPopup = (text = '') => {
    // Get all text content from the page
    const fullContent = contentRef.current ? contentRef.current.innerText : '';
    
    // Set the selected text as initial question if provided
    setSelectedText(text);
    setShowPopup(true);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText) {
      handleOpenPopup(`Bu kısımda anlamadığım var: "${selectedText}"`);
    }
  };

  return (
    <div className="main-container">
      <div className="content-area">
        <header className="App-header">
          <h1>C++ OOP Öğrenme Platformu</h1>
          <button onClick={() => handleOpenPopup()}>Yardımcıya Sor</button>
        </header>
        <main>
          <section ref={contentRef} onMouseUp={handleTextSelection}>
            <h2>Konu 1: Merhaba Dünya!</h2>
            <p>
              C++'a hoş geldiniz! Nesne Yönelimli Programlama (OOP) yolculuğumuza
              ilk programımızı yazarak başlıyoruz. Her programlama dilinde olduğu gibi,
              ilk adım ekrana "Merhaba, Dünya!" yazdırmaktır. Aşağıdaki kod editörünü
              kullanarak bu örneği çalıştırabilirsiniz.
            </p>
            <p>
              #include direktifi C++'da kütüphaneleri dahil etmek için kullanılır.
              iostream kütüphanesi input/output işlemleri için gereklidir.
              std::cout ise ekrana yazı yazdırmak için kullanılan nesnedir.
            </p>
            <CodeEditor ref={codeRef} code={code} setCode={setCode} output={output} setOutput={setOutput} />
          </section>
        </main>
      </div>
      {showPopup && (
        <AIPopup
          onClose={() => setShowPopup(false)}
          initialQuestion={selectedText}
          fullContent={contentRef.current ? contentRef.current.innerText : ''}
          currentCode={code}
        />
      )}
    </div>
  );
}

export default App;