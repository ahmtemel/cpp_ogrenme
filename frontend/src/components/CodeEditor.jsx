// frontend/src/components/CodeEditor.jsx
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike';
import axios from 'axios';

const CodeEditor = React.forwardRef((props, ref) => {
  const { code, setCode, output, setOutput } = props;
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    try {
      // Port 3001 olarak kalıyor, dokunulmadı
      const response = await axios.post('http://localhost:3001/api/run', { code }); 
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Kod çalıştırılırken bir hata oluştu: ' + (error.response ? error.response.data.error : error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref}>
      <h3>C++ Kod Editörü</h3>
      <CodeMirror
        value={code}
        options={{
          mode: 'text/x-c++src',
          theme: 'material',
          lineNumbers: true,
          smartIndent: true,
          indentWithTabs: true,
          tabSize: 4
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
      />
      <button onClick={handleRun} disabled={loading}>
        {loading ? 'Çalıştırılıyor...' : 'Kodu Çalıştır'}
      </button>
      <h4>Çıktı:</h4>
      <pre>{output}</pre>
    </div>
  );
});

export default CodeEditor;