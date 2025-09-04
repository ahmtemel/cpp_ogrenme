"use client"

// frontend/src/Module00.jsx
import { useState, useRef } from "react"
import CodeEditor from "./components/CodeEditor.jsx"
import AIPopup from "./components/AIPopup.jsx"

function Module00() {
  const [showAIPopup, setShowAIPopup] = useState(false)
  const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    cout << "Merhaba Aşk Dolu Dünya!" << endl;
    return 0;
}`)
  const [output, setOutput] = useState("")
  const codeEditorRef = useRef(null)

  const handleOpenPopup = () => {
    setShowAIPopup(true)
  }

  return (
    <div className="module-content">
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
          <strong>#include &lt;iostream&gt;</strong> - Kalbin kapılarını açar (giriş/çıkış işlemleri)
        </li>
        <li>
          <strong>using namespace std;</strong> - Sevgi dilimizi belirler
        </li>
        <li>
          <strong>int main()</strong> - Aşk hikayemizin başlangıcı
        </li>
        <li>
          <strong>cout</strong> - Sevgimizi dünyaya haykırır
        </li>
        <li>
          <strong>return 0;</strong> - Mutlu son
        </li>
      </ul>

      <div style={{ marginTop: "2rem", padding: "1rem", background: "var(--muted)", borderRadius: "var(--radius)" }}>
        <h4>💌 Aşk Notu</h4>
        <p>
          Programlama öğrenmek sabır ve sevgi gerektirir. Her hata, sizi daha iyi bir programcı yapar. Kodlarınızla
          aranızda güçlü bir bağ kurun ve her satırı sevgiyle yazın!
        </p>
      </div>

      {showAIPopup && (
        <AIPopup
          onClose={() => setShowAIPopup(false)}
          initialQuestion=""
          fullContent="C++ programlama diline giriş, temel kavramlar ve ilk program yazma"
          currentCode={code}
        />
      )}

      <div style={{ marginTop: "2rem" }}>
        <button className="btn-primary" onClick={() => setShowAIPopup(true)} style={{ marginRight: "1rem" }}>
          💕 AI Aşk Danışmanı
        </button>
        <button
          className="btn-secondary"
          onClick={() =>
            setCode(
              '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Merhaba Aşk Dolu Dünya!" << endl;\n    return 0;\n}',
            )
          }
        >
          🌹 Örnek Kodu Yükle
        </button>
      </div>
    </div>
  )
}

export default Module00
