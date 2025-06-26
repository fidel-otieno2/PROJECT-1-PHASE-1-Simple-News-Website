const SerpAPI = ' http://localhost:3000/news_results';

const SERPAPI_KEY = 'YOUR_SERPAPI_KEY'; // Replace with your real SerpAPI key
const newsContainer = document.getElementById('news-container');
const categorySelect = document.getElementById('category');
const searchInput = document.getElementById('search');
const fromDate = document.getElementById('fromDate');
const toDate = document.getElementById('toDate');
const themeToggle = document.getElementById('themeToggle');
const refreshBtn = document.getElementById('refresh');

// Modal elements
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalImage = document.getElementById('modal-image');
const modalDescription = document.getElementById('modal-description');
const modalLink = document.getElementById('modal-link');
const closeModal = document.querySelector('.close');

function showModal(article) {
    modalTitle.textContent = article.title;
    modalDescription.textContent = article.snippet || article.description || 'No summary available.';
    modalLink.href = article.link || article.url || '#';
    modalLink.textContent = "Read Full Article";
    modalImage.src = article.thumbnail || article.urlToImage || 'https://via.placeholder.com/600x300';
    modal.classList.remove('hidden');
}

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

// ...existing code...
async function fetchNews() {
    newsContainer.innerHTML = '<p>Loading...</p>';
    let url = 'http://localhost:3000/news';

    const keyword = searchInput.value.trim();
    const category = categorySelect.value;
    const from = fromDate.value;
    const to = toDate.value;

    const params = [];
    if (keyword) params.push(`q=${encodeURIComponent(keyword)}`);
    if (category) params.push(`category=${encodeURIComponent(category)}`);
    if (from) params.push(`from=${encodeURIComponent(from)}`);
    if (to) params.push(`to=${encodeURIComponent(to)}`);
    if (params.length) url += '?' + params.join('&');

    try {
        const res = await fetch(' http://localhost:3000/news_results');
        const json = await res.json();

        newsContainer.innerHTML = '';
        const articles = json.news_results || [];

        if (!articles.length) {
            newsContainer.innerHTML = '<p>No articles found.</p>';
            return;
        }

        articles.forEach(article => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.innerHTML = `
                <img src="${article.thumbnail || 'https://via.placeholder.com/300x150'}" alt="News Image" style="width:100%;height:auto;">
                <h3>${article.title}</h3>
                <p>${article.snippet || 'No description.'}</p>
                <button class="read-more-btn">Read More</button>
            `;
            card.querySelector('.read-more-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                showModal(article);
            });
            newsContainer.appendChild(card);
        });
    } catch (error) {
        newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
        console.error(error);
    }
}
// ...existing code...

// Events
categorySelect.addEventListener('change', fetchNews);
refreshBtn.addEventListener('click', fetchNews);
searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') fetchNews();
});

themeToggle.addEventListener('click', () => {
    const mode = document.documentElement.getAttribute('data-theme');
    const newMode = mode === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newMode);
    localStorage.setItem('theme', newMode);
});

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    fetchNews();
})