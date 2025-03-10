// File: api/ai-assistant.js
// This is a simple Express.js API endpoint to handle AI assistant requests

require('dotenv').config();
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  try {
    const { query, pageContext } = req.body;
    
    // Get API key from environment variables
    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant helping a machine learning engineer and artist named Femi Adeniran. Focus on providing helpful, concise responses about machine learning, algorithms, neural networks, time series forecasting, and creative technology projects. Keep responses under 3 paragraphs and be technically accurate. The following is the text content of the current webpage: "${pageContext.text}". The url of the current page is: "${pageContext.url}"`
          },
          {
            role: "user",
            content: query
          }
        ],
        max_tokens: 500
      })
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      throw new Error(`OpenAI API Error: ${errorData.error?.message || openaiResponse.statusText}`);
    }

    const data = await openaiResponse.json();
    res.json({ response: data.choices[0].message.content });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
