const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const dishRoutes = require('./routes/dishRoutes');

const app = express();
const port = Number(process.env.PORT || 9000);

app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8081']
}));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));

// This checks Express only. The dishes endpoint also checks MySQL.
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.use('/api/dishes', dishRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error('Request failed:', error.code || error.message);
  const status = error.status || 500;
  res.status(status).json({
    error: status === 400 ? 'Invalid JSON request body.' : 'Internal server error.'
  });
});

app.listen(port, () => {
  console.log(`Matking backend running at http://localhost:${port}`);
});
