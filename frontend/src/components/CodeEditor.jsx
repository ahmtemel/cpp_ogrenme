"use client"

// frontend/src/components/CodeEditor.jsx
import React, { useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { cpp } from "@codemirror/lang-cpp"
import { oneDark } from "@codemirror/theme-one-dark"
import "./CodeEditor.css"
import axios from "axios"

const CodeEditor = React.forwardRef((props, ref) => {
  const { code, setCode, output, setOutput, title, placeholder, readOnly } = props
  const [loading, setLoading] = useState(false)

  const handleRun = async () => {
    setLoading(true)
    setOutput("Kod çalıştırılıyor...")

    console.log("=== Frontend: Sending code to backend ===")
    console.log("Code to send:", code)

    try {
      const response = await axios.post("https://cpp-ogrenme.onrender.com/api/run", { code })
      console.log("=== Frontend: Received response from backend ===")
      console.log("Full response:", response)
      console.log("Response data:", response.data)

      const jdoodleResult = response.data
      let result = ""

      console.log("Processing JDoodle result:", jdoodleResult)

      if (jdoodleResult.statusCode === 200) {
        if (jdoodleResult.output) {
          result = jdoodleResult.output
          console.log("Success case - output found:", result)
        } else {
          result = "Program başarıyla çalıştı ancak çıktı üretmedi."
          console.log("Success case - no output")
        }
      } else {
        result = "Derleme/Çalıştırma Hatası: " + (jdoodleResult.error || "Bilinmeyen hata")
        console.log("Error case:", result)
      }

      if (jdoodleResult.memory) {
        result += `\n\nBellek kullanımı: ${jdoodleResult.memory}`
      }
      if (jdoodleResult.cpuTime) {
        result += `\nCPU zamanı: ${jdoodleResult.cpuTime}s`
      }

      console.log("Final result to display:", result)
      setOutput(result)
    } catch (error) {
      console.error("=== Frontend: Error occurred ===")
      console.error("Full error:", error)
      console.error("Error response:", error.response)
      const errorMessage = error.response?.data?.error || error.message || "Bilinmeyen hata"
      setOutput("Kod çalıştırılırken bir hata oluştu: " + errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={ref}>
      <h3>{title || "C++ Kod Editörü"}</h3>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[cpp()]}
        theme={oneDark}
        onChange={(value) => setCode(value)}
        editable={!readOnly}
        placeholder={placeholder || "C++ kodunuzu buraya yazın..."}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          highlightSelectionMatches: false,
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handleRun} disabled={loading || readOnly} style={{ marginRight: "10px" }}>
          {loading ? "Çalıştırılıyor..." : "Kodu Çalıştır"}
        </button>
        <button onClick={() => setCode("")} disabled={readOnly} style={{ backgroundColor: "#dc3545", color: "white" }}>
          Temizle
        </button>
      </div>
      <h4>Çıktı:</h4>
      <pre
        style={{
          backgroundColor: "#f8f9fa",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #dee2e6",
          minHeight: "50px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          color: "#212529",
        }}
      >
        {output || 'Henüz çıktı yok. Kodu çalıştırmak için "Kodu Çalıştır" butonuna tıklayın.'}
      </pre>
    </div>
  )
})

export default CodeEditor
