const newsContainer = document.getElementById('news-container');
const searchInput = document.getElementById('search');
const refreshBtn = document.getElementById('refresh');

// Fetch and display news from local JSON
async function fetchNews(query = '') {
  newsContainer.innerHTML = '<p>Loading...</p>';
  try {
    // Fetch local JSON file (rename db.json to news.json or adjust path)
    const response = await fetch('news.json');
    const data = await response.json();
    let articles = data.news_results || [];

    // If searching, filter articles by title/snippet
    if (query) {
      const q = query.toLowerCase();
      articles = articles.filter(
        article =>
          article.title.toLowerCase().includes(q) ||
          (article.snippet && article.snippet.toLowerCase().includes(q))
      );
    }

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
    newsContainer.innerHTML = '<p>Error loading news.</p>';
    console.error(err);
  }
}

refreshBtn.addEventListener('click', () => fetchNews(searchInput.value));

searchInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') fetchNews(searchInput.value);
});

document.addEventListener('DOMContentLoaded', () => fetchNews());