app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        console.log('1. Message received:', message);
        
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

        console.log('2. API Response OK');
        res.json({ reply: response.data.choices[0].message.content });

    } catch (error) {
        console.error('3. ERROR DETAILS:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data
        });
        
        res.json({ 
            reply: 'Server error: ' + (error.response?.data?.error?.message || error.message)
        });
    }
});
