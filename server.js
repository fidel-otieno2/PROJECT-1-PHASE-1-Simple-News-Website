const express = require('express');
const path = require('path');
const fetch = require('node-fetch');  // Ensure you're using the right fetch

const app = express();
const PORT = 3000;

// Serve static files (your frontend)
app.use(express.static(path.join(__dirname, 'public')));

// News API endpoint
app.get('/api/news', async (req, res) => {
    try {
        // Your API endpoint with the necessary query parameters
        const url = 'https://6861a00796f0cc4e34b71965.mockapi.io/fidel/fidel' +
            'q=Apple&' +
            'from=2025-06-29&' +
            'sortBy=popularity&' +
            'apiKey=90d787b6f9c9439f9437fd4afd49b7b3';

        // Fetch the data from the API
        const response = await fetch(url);

        // Check if the response is successful (status code 200)
        // Parse the JSON data from the response
        const data = await response.json();

        if (!data.articles) {
            throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        // Send the data back as a JSON response
        res.json(data);
    } catch (error) {
        // If any error occurs, send a 500 status code and the error message
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to fetch news', details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
