// Node.js Express backend route
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.get('/api/news', async (req, res) => {
  const query = req.query.q || 'latest';
  const params = {
    api_key: 'YOUR_SERPAPI_KEY',
    engine: 'google_news',
    q: query,
    hl: 'en'
  };

  try {
    const response = await axios.get('https://serpapi.com/search', { params });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching news');
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
