"use client"

// frontend/src/Module01.jsx
import { useState, useRef, useEffect } from "react"
import CodeEditor from "./components/ClientCodeEditor.jsx"
import AIPopup from "./components/AIPopup.jsx"
import { Link } from "react-router-dom"

function Module01({ setIsPopupVisibleInApp }) {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedText, setSelectedText] = useState("")

  useEffect(() => {
    setIsPopupVisibleInApp(showPopup)
  }, [showPopup, setIsPopupVisibleInApp])

  const [lessonCode1, setLessonCode1] = useState(`#include <iostream>
#include <string>

int main() {
    // Yığın (stack) üzerinde bir nesne ayırma
    std::string stack_string = "Hello Stack";
    std::cout << "Stack Adresi: " << &stack_string << std::endl;
    std::cout << "Stack Degeri: " << stack_string << std::endl;

    // Yığın (heap) üzerinde bir tamsayı ayırma
    int* heap_int_ptr = new int(42);
    std::cout << "Heap Adresi: " << heap_int_ptr << std::endl;
    std::cout << "Heap Degeri: " << *heap_int_ptr << std::endl;
    
    // Belleği serbest bırakma
    delete heap_int_ptr;
    
    return 0;
}`)
  const [lessonOutput1, setLessonOutput1] = useState("")

  const [lessonCode2, setLessonCode2] = useState(`#include <iostream>
#include <string>

int main() {
    std::string str = "HI THIS IS BRAIN";
    std::string* stringPTR = &str;
    std::string& stringREF = str;

    std::cout << "Dizenin adresi: " << &str << std::endl;
    std::cout << "Isaretcinin tuttugu adres: " << stringPTR << std::endl;
    std::cout << "Referansin adresi: " << &stringREF << std::endl;
    
    std::cout << "\\nDizenin degeri: " << str << std::endl;
    std::cout << "Isaretcinin gosterdiği deger: " << *stringPTR << std::endl;
    std::cout << "Referansin gosterdiği deger: " << stringREF << std::endl;

    return 0;
}`)
  const [lessonOutput2, setLessonOutput2] = useState("")

  const [freeCode, setFreeCode] = useState("")
  const [freeOutput, setFreeOutput] = useState("")

  const contentRef = useRef(null)

  const handleOpenPopup = (text = "") => {
    const fullContent = contentRef.current ? contentRef.current.innerText : ""
    setSelectedText(text)
    setShowPopup(true)
  }

  const handleTextSelection = () => {
    const selection = window.getSelection()
    const selectedText = selection.toString().trim()
    if (selectedText && selection.anchorNode) {
      let currentElement =
        selection.anchorNode.nodeType === Node.TEXT_NODE ? selection.anchorNode.parentElement : selection.anchorNode
      while (currentElement) {
        if (
          currentElement.classList &&
          (currentElement.classList.contains("CodeMirror") || currentElement.classList.contains("editor-section"))
        ) {
          return
        }
        currentElement = currentElement.parentElement
      }
      handleOpenPopup(`Bu kısımda anlamadığım var: "${selectedText}"`)
    }
  }

  return (
    <>
      <header className="App-header">
        <h1>C++ OOP Öğrenme Platformu</h1>
        <button onClick={() => handleOpenPopup()}>Yardımcıya Sor</button>
        <Link to="/" style={{ marginLeft: "auto", textDecoration: "none", color: "#fff" }}>
          Ana Sayfa
        </Link>
      </header>
      <main>
        <section ref={contentRef} onMouseUp={handleTextSelection}>
          <h2>Modül 01: Bellek, Puançınlar ve Referanslar</h2>

          <h3>Ders 1: Bellek Yönetimi ve `new` / `delete`</h3>
          <p>
            C++'ta bellek yönetimi, programınızın performansını doğrudan etkileyen kritik bir konudur. İki ana bellek
            alanı vardır: Stack (yığın) ve Heap (yığın).
          </p>
          <ul>
            <li>
              <b>Stack (Yığın):</b> Otomatik olarak yönetilir. Fonksiyon çağrıları ve yerel değişkenler burada saklanır.
              Hızlıdır ancak boyutu küçüktür ve nesneler sadece tanımlandıkları fonksiyonun ömrü boyunca yaşar.
            </li>
            <li>
              <b>Heap (Yığın):</b> Dinamik bellek alanıdır ve manuel olarak yönetilir. `new` anahtar kelimesi ile bellek
              ayırırsınız ve bu nesneler, `delete` ile serbest bırakılana kadar varlığını sürdürür. Heap, daha büyük
              nesneler için idealdir.
            </li>
          </ul>
          <p>
            <b>Göreviniz (BraiiiiiiinnnzzzZ):</b> `Zombie` sınıfı implementasyonunu, stack ve heap üzerinde nesneler
            oluşturarak pekiştirmeniz gerekiyor. Bu, nesne ömrü yönetimini anlamak için hayati öneme sahiptir.
          </p>
          <div className="editor-section">
            <h3>📚 Örnek: Heap Bellek Yönetimi</h3>
            <p>Aşağıdaki örnek, heap üzerinde bir değişkenin nasıl ayrılıp serbest bırakıldığını gösterir.</p>
            <CodeEditor
              code={lessonCode1}
              setCode={setLessonCode1}
              output={lessonOutput1}
              setOutput={setLessonOutput1}
              readOnly={true}
              title="Bellek Yönetimi Örneği"
            />
          </div>

          <h3>Ders 2: İşaretçiler ve Referanslar</h3>
          <p>
            C++'ın en güçlü özelliklerinden biri olan işaretçiler ve referanslar, bir değişkenin bellek adresine
            doğrudan erişmenizi sağlar.
          </p>
          <ul>
            <li>
              <b>İşaretçi (`*`):</b> Bir değişkenin bellek adresini saklayan bir değişkendir. Boş değer (`nullptr`)
              alabilir.
            </li>
            <li>
              <b>Referans (`&`):</b> Bir değişkene verilmiş bir takma addır. Başka bir değişkeni işaret edemez ve `null`
              olamaz.
            </li>
          </ul>
          <p>
            Aşağıdaki kodu çalıştırarak bir işaretçinin ve bir referansın aynı bellek adresini nasıl gösterebileceğini
            gözlemleyebilirsiniz. Bu, <b>HI THIS IS BRAIN</b> görevi için önemli bir adımdır.
          </p>
          <div className="editor-section">
            <h3>📚 Örnek: İşaretçi ve Referansın Farkı</h3>
            <p>
              Aşağıdaki kodu çalıştırarak bir işaretçinin ve bir referansın aynı bellek adresini nasıl gösterebileceğini
              gözlemleyebilirsiniz.
            </p>
            <CodeEditor
              code={lessonCode2}
              setCode={setLessonCode2}
              output={lessonOutput2}
              setOutput={setLessonOutput2}
              readOnly={true}
              title="İşaretçi vs Referans"
            />
          </div>

          <div className="editor-section">
            <h3>✏️ Alıştırma Alanı</h3>
            <p>
              Kendi kodunuzu yazarak işaretçi ve referansları deneyin. Kendi değişkenlerinizi oluşturup adreslerini ve
              değerlerini ekrana yazdırın.
            </p>
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
          fullContent={contentRef.current ? contentRef.current.innerText : ""}
          currentCode={freeCode}
        />
      )}
    </>
  )
}

export default Module01
