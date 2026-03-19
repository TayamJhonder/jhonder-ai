const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// BAGONG API KEY MO
const API_KEY = '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';

app.use(express.static('public'));
app.use(express.json());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: 'openai/gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are Jhonder AI Assistant, created by Jhonder. Be helpful and friendly.'
                },
                {
                    role: 'user',
                    content: message
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://jhonder-ai.vercel.app',
                'X-Title': 'Jhonder AI'
            }
        });

        res.json({ reply: response.data.choices[0].message.content });

    } catch (error) {
        res.json({ reply: 'Error: ' + error.message });
    }
});

// For Vercel
module.exports = app;

// For local
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`✅ Jhonder AI running at http://localhost:${PORT}`);
    });
}
