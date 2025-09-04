// frontend/src/components/CodeEditor.jsx
import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import './CodeEditor.css'; // Yeni CSS dosyasını import et
import axios from 'axios';

const CodeEditor = React.forwardRef((props, ref) => {
  const { code, setCode, output, setOutput, title, placeholder, readOnly } = props;
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput('Kod çalıştırılıyor...');
    
    console.log('=== Frontend: Sending code to backend ===');
    console.log('Code to send:', code);
    
    try {
      const response = await axios.post('http://localhost:3001/api/run', { code });
      console.log('=== Frontend: Received response from backend ===');
      console.log('Full response:', response);
      console.log('Response data:', response.data);
      
      const jdoodleResult = response.data;
      let result = '';
      
      console.log('Processing JDoodle result:', jdoodleResult);
      
      if (jdoodleResult.statusCode === 200) {
        if (jdoodleResult.output) {
          result = jdoodleResult.output;
          console.log('Success case - output found:', result);
        } else {
          result = 'Program başarıyla çalıştı ancak çıktı üretmedi.';
          console.log('Success case - no output');
        }
      } else {
        result = 'Derleme/Çalıştırma Hatası: ' + (jdoodleResult.error || 'Bilinmeyen hata');
        console.log('Error case:', result);
      }
      
      if (jdoodleResult.memory) {
        result += `\n\nBellek kullanımı: ${jdoodleResult.memory}`;
      }
      if (jdoodleResult.cpuTime) {
        result += `\nCPU zamanı: ${jdoodleResult.cpuTime}s`;
      }
      
      console.log('Final result to display:', result);
      setOutput(result);
    } catch (error) {
      console.error('=== Frontend: Error occurred ===');
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      const errorMessage = error.response?.data?.error || error.message || 'Bilinmeyen hata';
      setOutput('Kod çalıştırılırken bir hata oluştu: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={ref}>
      <h3>{title || 'C++ Kod Editörü'}</h3>
      <CodeMirror
        value={code}
        options={{
          mode: 'text/x-c++src',
          theme: 'material',
          lineNumbers: true,
          smartIndent: true,
          indentWithTabs: false,
          indentUnit: 2,
          tabSize: 2,
          autoCloseBrackets: true,
          matchBrackets: true,
          readOnly: readOnly,
          lineWrapping: true,
          extraKeys: {
            'Tab': 'indentMore',
            'Shift-Tab': 'indentLess',
            'Ctrl-A': 'selectAll'
          },
          placeholder: placeholder || 'C++ kodunuzu buraya yazın...',
          // Otomatik boyutlandırma için eklenen ayarlar
          scrollbarStyle: null,
          viewportMargin: Infinity
        }}
        onBeforeChange={(editor, data, value) => {
          setCode(value);
        }}
        onChange={(editor, data, value) => {
          // Bu callback'i de ekleyerek değişikliklerin düzgün takip edilmesini sağlıyoruz
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleRun} disabled={loading || readOnly} style={{ marginRight: '10px' }}>
          {loading ? 'Çalıştırılıyor...' : 'Kodu Çalıştır'}
        </button>
        <button onClick={() => setCode('')} disabled={readOnly} style={{ backgroundColor: '#dc3545', color: 'white' }}>
          Temizle
        </button>
      </div>
      <h4>Çıktı:</h4>
      <pre style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '10px', 
        borderRadius: '4px', 
        border: '1px solid #dee2e6',
        minHeight: '50px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        color: '#212529'
      }}>
        {output || 'Henüz çıktı yok. Kodu çalıştırmak için "Kodu Çalıştır" butonuna tıklayın.'}
      </pre>
    </div>
  );
});

export default CodeEditor;