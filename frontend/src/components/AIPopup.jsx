// frontend/src/components/AIPopup.jsx
import { useState } from "react"
import axios from "axios"
import "./AIPopup.css"

const AIPopup = ({ onClose, initialQuestion, fullContent, currentCode }) => {
  const [question, setQuestion] = useState(initialQuestion || "")
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    setLoading(true)
    setAnswer("")

    console.log("=== Frontend: Sending question to Gemini ===")
    console.log("Question:", question)
    console.log("Full content length:", fullContent ? fullContent.length : 0)
    console.log("Current code length:", currentCode ? currentCode.length : 0)

    try {
      const response = await axios.post("https://cpp-ogrenme.onrender.com/api/ask-gemini", {
        question: question,
        fullContent: fullContent,
        currentCode: currentCode,
      })

      console.log("=== Frontend: Received response from Gemini ===")
      console.log("Full response:", response)
      console.log("Answer received:", response.data.answer)

      setAnswer(response.data.answer)
    } catch (error) {
      console.error("=== Frontend: Gemini API Error ===")
      console.error("Full error:", error)
      console.error("Error response:", error.response)
      setAnswer("Sorunuza bir yanıt bulunamadı. Lütfen daha sonra tekrar deneyin.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ai-popup-container">
      <div className="ai-popup-content">
        <div className="ai-popup-header">
          <h3>Gemini Yardımcı</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="ai-popup-body">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Anlamadığınız kısmı buraya yazın..."
          />
          <button onClick={handleAsk} disabled={loading}>
            {loading ? "Yanıt aranıyor..." : "Sor"}
          </button>
          {answer && (
            <div className="answer-box">
              <h4>Yanıt:</h4>
              <div className="answer-content">{answer}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIPopup
