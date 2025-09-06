// frontend/src/Module00.jsx
import { useState, useRef } from "react"
import CodeEditor from "./components/CodeEditor.jsx"
import AIPopup from "./components/AIPopup.jsx"
import QuizSection from "./components/QuizSection.jsx"
import { Link } from "react-router-dom"

function Module00() {
  const [showAIPopup, setShowAIPopup] = useState(false)
  const [selectedText, setSelectedText] = useState("")
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Merhaba Aşk Dolu Dünya!" << endl;
    return 0;
}`)
  const [output, setOutput] = useState("")
  const codeEditorRef = useRef(null)
  const contentRef = useRef(null)

  const handleOpenPopup = (text = "") => {
    const fullContent = contentRef.current ? contentRef.current.innerText : ""
    setSelectedText(text)
    setShowAIPopup(true)
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
        <section ref={contentRef} onMouseUp={handleTextSelection} className="module-content">
          <h2>💖 C++ ile Aşka Giriş 💖</h2>
          <p>
            Hoş geldiniz sevgili öğrenciler! C++ programlama diline olan aşkınızı keşfetmeye hazır mısınız? Bu romantik
            yolculukta, kodlamanın büyülü dünyasında birlikte ilerleyeceğiz.
          </p>

          <h3>💕 Neden C++?</h3>
          <p>
            C++, programlama dünyasının en güçlü ve etkileyici dillerinden biridir. Tıpkı gerçek aşk gibi, başlangıçta
            karmaşık görünebilir, ancak zamanla onun güzelliğini ve gücünü keşfedeceksiniz.
          </p>

          <h3>🌹 İlk Aşk: "Merhaba Dünya"</h3>
          <p>
            Her büyük aşk hikayesi bir "merhaba" ile başlar. C++'ta da ilk programımız geleneksel olarak "Merhaba Dünya"
            programıdır. Aşağıdaki kodu inceleyin ve çalıştırın:
          </p>

          <CodeEditor
            ref={codeEditorRef}
            code={code}
            setCode={setCode}
            output={output}
            setOutput={setOutput}
            title="💝 İlk Aşk Kodunuz"
            placeholder="Buraya sevgi dolu kodlarınızı yazın..."
          />

          <h3>💞 Kod Açıklaması</h3>
          <p>Bu basit ama güzel kod parçasında:</p>
          <ul style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto" }}>
            <li>
              <strong>#include &lt;iostream&gt;</strong> - Kalbimin kapılarını sana açtığım yer (Giriş var çıkış yok)
            </li>
            <li>
              <strong>using namespace std;</strong> - Sana sevgi dilimi belirliyorum
            </li>
            <li>
              <strong>int main()</strong> - Aşkımızın başlangıcı
            </li>
            <li>
              <strong>while (1)</strong> - Bu döngüden hiç çıkmayıp hep seni sevdiğimi haykıracağım
            </li>
            <li>
              <strong>cout</strong> - Seni ne kadar sevdiğimi haykırdığım yer
            </li>
            <li>
              <strong>return 0;</strong> - Buraya gelmiyor çünkü bende dönmek yok
            </li>
          </ul>

          <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--muted)", borderRadius: "var(--radius)" }}>
            <h4>💌 Aşk Notu</h4>
            <p>
              Seni çok seviyorum canım her şeyi başarabileceğine inanıyorum ve ben de senle başarmak istiyorum bunun için elimden geleni yapacağım
            </p>
          </div>

          <QuizSection
            moduleId="module00"
            question="Ekrana 'Merhaba Sevgilim!' yazdıran bir C++ programı yazın."
            expectedOutput="Merhaba Sevgilim!"
            initialCode={`#include <iostream>
using namespace std;

int main() {
    // Kodunuzu buraya yazın
    
    return 0;
}`}
          />
        </section>
      </main>
      {showAIPopup && (
        <AIPopup
          onClose={() => setShowAIPopup(false)}
          initialQuestion={selectedText}
          fullContent="C++ programlama diline giriş, temel kavramlar ve ilk program yazma"
          currentCode={code}
        />
      )}
    </>
  )
}

export default Module00
