// frontend/src/components/AIPopup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AIPopup.css';

const AIPopup = ({ onClose, initialQuestion, fullContent, currentCode }) => {
  const [question, setQuestion] = useState(initialQuestion || '');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const retryWithBackoff = async (fn, maxRetries = 3) => {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error) {
        const isLastRetry = i === maxRetries - 1;
        const isOverloaded = error.response?.status === 503 || 
                           error.response?.data?.error?.includes('overloaded') ||
                           error.response?.data?.details?.includes('overloaded');
        
        if (isOverloaded && !isLastRetry) {
          const waitTime = Math.pow(2, i) * 1000; // 1s, 2s, 4s
          console.log(`API overloaded, retrying in ${waitTime/1000} seconds...`);
          await delay(waitTime);
          continue;
        }
        throw error;
      }
    }
  };

  const handleAsk = async () => {
    setLoading(true);
    setAnswer('');
    try {
      // Enhanced prompt with context
      const contextualPrompt = `
Kullanıcı bir C++ öğrenme platformunda. Aşağıdaki bilgileri kullanarak sorusunu yanıtla:

SAYFA İÇERİĞİ:
${fullContent}

MEVCUT KOD:
${currentCode}

KULLANICI SORUSU:
${question}

Lütfen Türkçe olarak, anlaşılır ve eğitici bir şekilde yanıtla. Kod örnekleri varsa açıkla.`;

      // Log the complete prompt to console
      console.log('=== API\'ye gönderilen tam prompt ===');
      console.log(contextualPrompt);
      console.log('=== Prompt sonu ===');

      const response = await retryWithBackoff(async () => {
        return await axios.post('http://localhost:3001/api/ask-gemini', { 
          question: contextualPrompt
        });
      });
      
      if (response.data && response.data.answer) {
        setAnswer(response.data.answer);
      } else {
        setAnswer('Yanıt alınamadı. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('API hatası:', error);
      
      // Handle specific error types
      if (error.response?.status === 503 || 
          error.response?.data?.details?.includes('overloaded')) {
        setAnswer('AI servisi şu anda yoğun. Lütfen birkaç dakika sonra tekrar deneyin. 🤖');
      } else if (error.response?.status >= 500) {
        setAnswer('Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyin.');
      } else if (error.code === 'NETWORK_ERROR' || !error.response) {
        setAnswer('İnternet bağlantınızı kontrol edin ve tekrar deneyin.');
      } else {
        setAnswer('Sorunuza bir yanıt bulunamadı. Lütfen daha sonra tekrar deneyin.');
      }
    } finally {
      setLoading(false);
    }
  };

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
            {loading ? 'Yanıt aranıyor...' : 'Sor'}
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
  );
};

export default AIPopup;