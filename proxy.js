const express = require('express');
const cors = require('cors');
// fetch is built-in in Node.js v18+ (no need to import)
const app = express();
const PORT = 3000;

const SERPAPI_KEY = 'YOUR_SERPAPI_KEY'; // Replace with your real key

app.use(cors());

app.get('/news', async (req, res) => {
    const { q, category, from, to } = req.query;
    let url = `https://serpapi.com/search.json?engine=google_news&gl=us&hl=en&api_key=${SERPAPI_KEY}`;
    if (q) url += `&q=${encodeURIComponent(q)}`;
    if (category) url += `&category=${encodeURIComponent(category)}`;
    if (from) url += `&from=${encodeURIComponent(from)}`;
    if (to) url += `&to=${encodeURIComponent(to)}`;

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