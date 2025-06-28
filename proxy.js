const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3001; // You can change this port if needed

const NEWS_API_KEY = '90d787b6f9c9439f9437fd4afd49b7b3';

app.get('/news', async (req, res) => {
  const { q, page } = req.query;
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=2025-06-20&to=2025-06-27&pageSize=20&page=${page}&sortBy=popularity&apiKey=${NEWS_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});