const prev = document.getElementById("previous");
const next = document.getElementById("next");
const search = document.getElementById("search");
const searchInput = document.getElementById("searchInput");

let currentPage = 1;
let currentQuery = "";

function buildApiUrl(page) {
  return `https://6861a00796f0cc4e34b71965.mockapi.io/fidel/fidel?page=1${page}`;
}

const fetchNews = async (page, q = "") => {
  try {
    let response = await fetch(buildApiUrl(page));
    if (!response.ok) {
      throw new Error('Failed to load news');
    }
    let articles = await response.json();

    // Filter articles by query (title or description) if q is provided
    if (q && q.trim() !== "") {
      articles = articles.filter(item =>
        (item.title && item.title.toLowerCase().includes(q.toLowerCase())) ||
        (item.description && item.description.toLowerCase().includes(q.toLowerCase()))
      );
    }

    document.getElementById("resultCount").innerText = articles.length;

    let defaultImage = "https://via.placeholder.com/286x184?text=No+Image";
    let str = "";
    for (let item of articles) {
      str += `
        <div class="card my-4 mx-2" style="width: 18rem;">
          <img height="184" src="${item.urlToImage ? item.urlToImage : defaultImage}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${item.title ? item.title.slice(0, 25) : ''}</h5>
            <p class="card-text">${item.description ? item.description.slice(0, 25) : ''}...</p>
            <a href="${item.url || '#'}" target="_blank" class="btn btn-primary">Read Article</a>
          </div>
        </div>
      `;
    }
    document.querySelector(".content").innerHTML = str;
  } catch (error) {
    console.error(error);
    document.querySelector(".content").innerHTML = `<div class="alert alert-danger">Failed to load news.</div>`;
  }
};

fetchNews(currentPage, currentQuery);

search.addEventListener("click", (e) => {
  e.preventDefault();
  let query = searchInput.value;
  currentQuery = query;
  currentPage = 1;
  fetchNews(currentPage, currentQuery);
});

prev.addEventListener("click", (e) => {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage = currentPage - 1;
    fetchNews(currentPage, currentQuery);
  }
});

next.addEventListener("click", (e) => {
  e.preventDefault();
  currentPage = currentPage + 1;
  fetchNews(currentPage, currentQuery);
});

document.getElementById("home-link").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "";
  currentPage = 1;
  fetchNews(currentPage, currentQuery);
});

document.getElementById("sports-link").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "sports";
  currentPage = 1;
  fetchNews(currentPage, currentQuery);
});

document.getElementById("weather-link").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "weather";
  currentPage = 1;
  fetchNews(currentPage, currentQuery);
});

document.getElementById("technology-link").addEventListener("click", (e) => {
  e.preventDefault();
  currentQuery = "technology";
  currentPage = 1;
  fetchNews(currentPage, currentQuery);
});