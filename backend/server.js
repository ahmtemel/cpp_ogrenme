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
    if (!code) {
        return res.status(400).json({ error: 'Kod bulunamadı.' });
    }
    
    const program = {
        script: code,
        language: 'cpp',
        versionIndex: '5', // C++ 17 versiyonu
        clientId: process.env.JDOODLE_CLIENT_ID,
        clientSecret: process.env.JDOODLE_CLIENT_SECRET
    };
    
    try {
        const response = await axios.post('https://api.jdoodle.com/v1/execute', program);
        res.json(response.data);
    } catch (error) {
        console.error('JDoodle API hatası:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Kod çalıştırılırken bir hata oluştu.' });
    }
});

// Gemini API ile soru sorma endpoint'i
app.post('/api/ask-gemini', async (req, res) => {
    const { question } = req.body;
    if (!question) {
        return res.status(400).json({ error: 'Soru bulunamadı.' });
    }
    
    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash-lite",
            generationConfig: {
                temperature: 0.7,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 8192,
            }
        });
        
        const result = await model.generateContent(question);
        const response = await result.response;
        const text = response.text();
        
        console.log('Gemini yanıtı alındı:', text.substring(0, 100) + '...');
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