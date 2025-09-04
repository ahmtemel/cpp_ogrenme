// frontend/src/Module00.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from './components/CodeEditor.jsx';
import AIPopup from './components/AIPopup.jsx';

function Module00({ setIsPopupVisibleInApp }) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  
  useEffect(() => {
    setIsPopupVisibleInApp(showPopup);
  }, [showPopup, setIsPopupVisibleInApp]);
  
  // Konu anlatımı için sabit kod
  const [lessonCode1, setLessonCode1] = useState(`#include <iostream>

int main() {
    std::cout << "Merhaba, Dunya!" << std::endl;
    return 0;
}`);
  const [lessonOutput1, setLessonOutput1] = useState('');

  // İkinci dersin örnek kodu
  const [lessonCode2, setLessonCode2] = useState(`#include <iostream>
#include <string>

int main() {
    // Tam sayı (Integer)
    int tamSayi = 10;
    std::cout << "Tam Sayi: " << tamSayi << std::endl;

    // Ondalıklı Sayı (Double)
    double ondalikliSayi = 5.75;
    std::cout << "Ondalikli Sayi: " << ondalikliSayi << std::endl;

    // Tek karakter (Char)
    char karakter = 'A';
    std::cout << "Karakter: " << karakter << std::endl;

    // Metin dizisi (String)
    std::string metin = "Merhaba C++!";
    std::cout << "Metin: " << metin << std::endl;

    return 0;
}`);
  const [lessonOutput2, setLessonOutput2] = useState('');
  
  // Serbest yazım için boş kod
  const [freeCode, setFreeCode] = useState('');
  const [freeOutput, setFreeOutput] = useState('');

  const contentRef = useRef(null);

  const handleOpenPopup = (text = '') => {
    const fullContent = contentRef.current ? contentRef.current.innerText : '';
    setSelectedText(text);
    setShowPopup(true);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText && selection.anchorNode) {
      let currentElement = selection.anchorNode.nodeType === Node.TEXT_NODE 
        ? selection.anchorNode.parentElement 
        : selection.anchorNode;
      
      while (currentElement) {
        if (currentElement.classList && 
            (currentElement.classList.contains('CodeMirror') || 
             currentElement.classList.contains('editor-section'))) {
          return;
        }
        currentElement = currentElement.parentElement;
      }
      
      handleOpenPopup(`Bu kısımda anlamadığım var: "${selectedText}"`);
    }
  };

  return (
    <>
      <header className="App-header">
        <h1>C++ OOP Öğrenme Platformu</h1>
        <button onClick={() => handleOpenPopup()}>Yardımcıya Sor</button>
        <Link to="/" style={{ marginLeft: 'auto', textDecoration: 'none', color: '#fff' }}>Ana Sayfa</Link>
      </header>
      <main>
        <section ref={contentRef} onMouseUp={handleTextSelection}>
          <h2>Modül 00: Temel Kavramlar ve Sınıflar</h2>
          <p>
            C++'a hoş geldiniz! Nesne Yönelimli Programlama (OOP) yolculuğumuza
            ilk programımızı yazarak başlıyoruz. Her programlama dilinde olduğu gibi,
            ilk adım ekrana "Merhaba, Dünya!" yazdırmaktır.
          </p>
          <p>
            `#include` direktifi C++'da kütüphaneleri dahil etmek için kullanılır.
            `iostream` kütüphanesi input/output işlemleri için gereklidir.
            `std::cout` ise ekrana yazı yazdırmak için kullanılan nesnedir.
          </p>
          
          <div className="editor-section" onMouseUp={(e) => e.stopPropagation()}>
            <h3>📚 Konu Örneği</h3>
            <p onMouseUp={(e) => e.stopPropagation()}>Aşağıdaki örnek kodu inceleyip çalıştırabilirsiniz:</p>
            <CodeEditor 
              code={lessonCode1} 
              setCode={setLessonCode1} 
              output={lessonOutput1} 
              setOutput={setLessonOutput1}
              readOnly={true} // Bu örneği sadece okunabilir yaptık
              title="Konu Örneği"
            />
          </div>

          <div className="editor-section" onMouseUp={(e) => e.stopPropagation()}>
            <h3>✏️ Serbest Yazım Alanı</h3>
            <p onMouseUp={(e) => e.stopPropagation()}>Burada kendi kodlarınızı yazıp deneyebilirsiniz:</p>
            <CodeEditor 
              code={freeCode} 
              setCode={setFreeCode} 
              output={freeOutput} 
              setOutput={setFreeOutput}
              readOnly={false}
              title="Serbest Yazım"
              placeholder="Buraya kendi C++ kodunuzu yazın..."
            />
          </div>
        </section>

        <section style={{ marginTop: '40px' }}>
          <h2>Konu 2: Değişkenler ve Temel Veri Tipleri</h2>
          <p>
              Programlama, verileri işlemekle ilgilidir. C++'ta verileri depolamak için değişkenleri kullanırız.
              Her değişkenin bir tipi vardır. Örneğin, tam sayılar için `int`, ondalıklı sayılar için `double` kullanılır.
          </p>
          <div className="editor-section">
              <h3>📚 Örnek: Temel Veri Tipleri</h3>
              <p>Aşağıdaki kodu çalıştırarak farklı veri tiplerinin nasıl tanımlandığını ve kullanıldığını görebilirsiniz.</p>
              <CodeEditor 
                  code={lessonCode2} 
                  setCode={setLessonCode2} 
                  output={lessonOutput2} 
                  setOutput={setLessonOutput2}
                  readOnly={true} // Bu örneği sadece okunabilir yaptık
                  title="Veri Tipleri Örneği"
              />
          </div>
          
          <div className="editor-section">
              <h3>✏️ Alıştırma Alanı</h3>
              <p>Aşağıdaki alanda, `int` ve `double` kullanarak kendi değişkenlerinizi tanımlayıp ekrana yazdırın.</p>
              <CodeEditor 
                  code={freeCode} 
                  setCode={setFreeCode} 
                  output={freeOutput} 
                  setOutput={setFreeOutput}
                  readOnly={false}
                  title="Serbest Alıştırma"
              />
          </div>
        </section>
      </main>
      {showPopup && (
        <AIPopup
          onClose={() => setShowPopup(false)}
          initialQuestion={selectedText}
          fullContent={contentRef.current ? contentRef.current.innerText : ''}
          currentCode={freeCode}
        />
      )}
    </>
  );
}

export default Module00;