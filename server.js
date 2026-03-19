const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// API KEY mo (direkta na para sigurado)
const API_KEY = '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';

app.use(express.static('public'));
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'openai/gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are JHONDER AI, created by Jhonder. Be helpful.' },
                { role: 'user', content: message }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://jhonder-ai.vercel.app',
                'X-Title': 'JHONDER AI'
            }
        });

        res.json({ reply: response.data.choices[0].message.content });

    } catch (error) {
        console.log(error.message);
        res.json({ reply: 'Error: ' + error.message });
    }
});

module.exports = app;
