// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Gemini API için anahtarı ayarla
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

// Manual CORS middleware - kesin çözüm
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  
  // Preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Middleware'ler
app.use(express.json());

// Ana sayfa route'u
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Server çalışıyor!',
        status: 'OK',
        endpoints: {
            'POST /api/run': 'Kod çalıştırma',
            'POST /api/ask-gemini': 'Gemini AI sorguları'
        }
    });
});

// JDoodle API ile kod derleme endpoint'i
app.post('/api/run', async (req, res) => {
    const { code } = req.body;
    console.log('=== /api/run endpoint called ===');
    console.log('Received code:', code);
    
    if (!code) {
        console.log('Error: No code provided');
        return res.status(400).json({ error: 'Kod bulunamadı.' });
    }
    
    const program = {
        script: code,
        language: 'cpp',
        versionIndex: '5', // C++ 17 versiyonu
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET
    };
    
    console.log('Sending to JDoodle:', program);
    
    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
        console.log('JDoodle Response:', response.data);
        console.log('Sending response to frontend:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('JDoodle API hatası:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Kod çalıştırılırken bir hata oluştu.' });
    }
});

// Gemini API ile soru sorma endpoint'i
app.post('/api/ask-gemini', async (req, res) => {
    const { question, fullContent, currentCode } = req.body;
    console.log('=== /api/ask-gemini endpoint called ===');
    console.log('Received question:', question);
    console.log('Received fullContent length:', fullContent ? fullContent.length : 0);
    console.log('Received currentCode length:', currentCode ? currentCode.length : 0);
    
    if (!question) {
        console.log('Error: No question provided');
        return res.status(400).json({ error: 'Soru bulunamadı.' });
    }
    
    try {
        // Enhanced prompt with context
        const contextualPrompt = `
Kullanıcı bir C++ öğrenme platformunda. Aşağıdaki bilgileri kullanarak sorusunu yanıtla:

SAYFA İÇERİĞİ:
${fullContent || 'İçerik mevcut değil'}

MEVCUT KOD:
${currentCode || 'Kod mevcut değil'}

KULLANICI SORUSU:
${question}

Lütfen Türkçe olarak, anlaşılır ve eğitici bir şekilde yanıtla. Kod örnekleri varsa açıkla.`;

        console.log('Sending to Gemini API:', contextualPrompt.substring(0, 200) + '...');

        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash-lite",
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
            }
        });
        
        const result = await model.generateContent(contextualPrompt);
        const response = await result.response;
        const text = response.text();
        
        console.log('Gemini yanıtı alındı (ilk 200 karakter):', text.substring(0, 200) + '...');
        console.log('Sending response to frontend:', { answer: text });
        res.json({ answer: text });
    } catch (error) {
        console.error('Gemini API hatası:', error);
        res.status(500).json({ 
            error: 'Sorunuz işlenirken bir hata oluştu.',
            details: error.message 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
});