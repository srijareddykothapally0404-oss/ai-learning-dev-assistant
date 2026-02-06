const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/api/explain', require('./routes/explain'));
app.use('/api/debug', require('./routes/debug'));
app.use('/api/summarize', require('./routes/summarize'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/roadmap', require('./routes/roadmap'));

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});