
const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search');
const refreshBtn = document.getElementById('refresh');

// Base SerpApi endpoint (you should route through your own backend/proxy)
const API_ENDPOINT = 'http://localhost:3000/news';// adjust this to your server route

async function fetchNews(query = '') {
  newsContainer.innerHTML = '<p>Loading...</p>';
  try {
    const response = await fetch(`${API_ENDPOINT}?q=${encodeURIComponent(query)}`);
    const data = await response.json();
    const articles = data.news_results || [];

    newsContainer.innerHTML = '';

    if (!articles.length) {
      newsContainer.innerHTML = '<p>No news articles found.</p>';
      return;
    }

    articles.forEach(article => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.innerHTML = `
        <img src="${article.thumbnail || 'https://via.placeholder.com/300x150'}" alt="Thumbnail">
        <h3>${article.title}</h3>
        <p>${article.snippet || 'No summary available.'}</p>
        <a href="${article.link}" target="_blank">Read More</a>
      `;
      newsContainer.appendChild(card);
    });
  } catch (err) {
    newsContainer.innerHTML = '<p>Error fetching news.</p>';
    console.error(err);
  }
}

refreshBtn.addEventListener('click', () => fetchNews(searchInput.value));

searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') fetchNews(searchInput.value);
});

document.addEventListener('DOMContentLoaded', () => fetchNews());
fetch('news.json')
  .then(res => res.json())
  .then(data => {
    const articles = data.news_results || [];
    const container = document.getElementById('news-container');

    container.innerHTML = '';

    articles.forEach(item => {
      // Use `highlight` if present
      const article = item.highlight || item;
      const title = article.title;
      const link = article.link;
      const thumb = article.thumbnail || 'https://via.placeholder.com/300x150';
      const source = article.source?.name || 'Unknown';
      const date = article.date || '';

      const card = document.createElement('div');
      card.className = 'news-card';
      card.innerHTML = `
        <img src="${thumb}" alt="Image">
        <h3>${title}</h3>
        <p><strong>${source}</strong> — ${date}</p>
        <a href="${link}" target="_blank">Read more</a>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading local JSON:', err));

