import React, { useState } from "react"
import CodeEditor from "./CodeEditor.jsx"
import axios from "axios"
import "./QuizSection.css"

const QuizSection = ({ moduleId, question, expectedOutput, initialCode = "" }) => {
  const [userCode, setUserCode] = useState(initialCode)
  const [userOutput, setUserOutput] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorDetails, setErrorDetails] = useState({ expected: "", actual: "" })
  const [showHint, setShowHint] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  const checkSolution = async () => {
    if (!userCode.trim()) {
      setErrorDetails({ 
        expected: "Bir kod yazmanız", 
        actual: "Boş kod alanı" 
      })
      setShowError(true)
      setTimeout(() => setShowError(false), 4000)
      return
    }

    setIsChecking(true)

    try {
      // Kodu API'ye gönder ve sonucu al
      const response = await axios.post("https://cpp-ogrenme.onrender.com/api/run", { code: userCode })
      console.log("Quiz API Response:", response.data)

      const jdoodleResult = response.data
      let actualOutput = ""

      if (jdoodleResult.statusCode === 200) {
        actualOutput = jdoodleResult.output || ""
      } else {
        setErrorDetails({ 
          expected: "Hatasız derleme", 
          actual: jdoodleResult.error || "Bilinmeyen derleme hatası" 
        })
        setShowError(true)
        setTimeout(() => setShowError(false), 4000)
        setIsChecking(false)
        return
      }

      // Çıktıları temizle ve karşılaştır
      const cleanActualOutput = actualOutput.trim().replace(/\r\n/g, '\n')
      const cleanExpectedOutput = expectedOutput.trim().replace(/\r\n/g, '\n')
      
      console.log("Expected:", cleanExpectedOutput)
      console.log("Actual:", cleanActualOutput)
      
      if (cleanActualOutput === cleanExpectedOutput) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        setErrorDetails({ 
          expected: cleanExpectedOutput, 
          actual: cleanActualOutput 
        })
        setShowError(true)
        setTimeout(() => setShowError(false), 4000)
      }

    } catch (error) {
      console.error("Quiz check error:", error)
      setErrorDetails({ 
        expected: "Başarılı kod çalıştırma", 
        actual: error.message || "Bilinmeyen hata" 
      })
      setShowError(true)
      setTimeout(() => setShowError(false), 4000)
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <div className="quiz-section">
      <div className="quiz-header">
        <h3>🧩 Kod Yazma Görevi</h3>
        <button 
          className="hint-button"
          onClick={() => setShowHint(!showHint)}
        >
          {showHint ? "İpucunu Gizle" : "💡 İpucu"}
        </button>
      </div>
      
      <div className="quiz-question">
        <h4>📝 Görev:</h4>
        <p>{question}</p>
      </div>

      {showHint && (
        <div className="quiz-hint">
          <h4>💡 İpucu:</h4>
          <p>Beklenen çıktı:</p>
          <pre className="expected-output">{expectedOutput}</pre>
        </div>
      )}

      <CodeEditor
        code={userCode}
        setCode={setUserCode}
        output={userOutput}
        setOutput={setUserOutput}
        title="💻 Kodunuzu Yazın"
        placeholder="Kodunuzu buraya yazın..."
      />

      <div className="quiz-actions">
        <button 
          className="btn-primary" 
          onClick={checkSolution}
          disabled={isChecking}
        >
          {isChecking ? "⏳ Kontrol Ediliyor..." : "💖 Çözümü Kontrol Et"}
        </button>
      </div>

      {showSuccess && (
        <div className="success-popup">
          <div className="success-content">
            <h3>💕 Doğru bildin zeki güzelim benim! 💕</h3>
            <p>Kodunuz mükemmel çalışıyor aşkım! Sen harikasın! 🎉</p>
            <div className="hearts">💖💕💝💗💞💓💘</div>
          </div>
        </div>
      )}

      {showError && (
        <div className="error-popup">
          <div className="error-content">
            <h3>💔 Aşkım sen doğrusunu biliyorsundur</h3>
            <p>Kim bu köpek de sana hatalı diyor!</p>
            <div className="error-details">
              <div className="error-section">
                <h4>💝 Beklenen Çıktı:</h4>
                <pre className="error-output expected">{errorDetails.expected}</pre>
              </div>
              <div className="error-section">
                <h4>😢 Alınan Çıktı:</h4>
                <pre className="error-output actual">{errorDetails.actual}</pre>
              </div>
            </div>
            <div className="comfort-hearts">💙💜🧡💚❤️</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default QuizSection
