
// File: app.js or server.js (main Express application)
const express = require('express');
const path = require('path');
const aiAssistantRoutes = require('./api/ai-assistant');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/ai-assistant', aiAssistantRoutes);

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});