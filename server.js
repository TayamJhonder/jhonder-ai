const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    
    // Simpleng reply lang muna para ma-test
    res.json({ reply: "👋 Hello! Working na ito! Message mo: " + message });
});

module.exports = app;
