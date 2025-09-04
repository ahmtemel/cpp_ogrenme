import dynamic from "next/dynamic"

const CodeEditor = dynamic(() => import("./CodeEditor.jsx"), {
  ssr: false,
})

export default CodeEditor
