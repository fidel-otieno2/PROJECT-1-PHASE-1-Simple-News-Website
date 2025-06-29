document.addEventListener('DOMContentLoaded', function() {
  const prev = document.getElementById("previous");
  const next = document.getElementById("next");
  const search = document.getElementById("search");
  const searchInput = document.getElementById("searchInput");

  let currentPage = 1;
  let currentQuery = "sports";

  // Helper to determine if running on GitHub Pages
  function isGitHubPages() {
    return location.hostname.endsWith('github.io');
  }

  const fetchNews = async (page, q) => {
    let apiUrl;
    if (isGitHubPages()) {
      apiUrl = './project.json'; // Use local JSON for GitHub Pages
    } else {
      apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&from=2025-06-20&to=2025-06-27&pageSize=20&page=${page}&sortBy=popularity&apiKey=90d787b6f9c9439f9437fd4afd49b7b3`;
    }

    let response = await fetch(apiUrl);
    response = await response.json();

    document.getElementById("resultCount").innerHTML = response.totalResults || 0;
    let str = "";
    if (response.articles && Array.isArray(response.articles)) {
      for (let item of response.articles) {
        str += `
          <div class="card my-4 mx-2" style="width: 18rem;">
            <img height="184" src="${item.urlToImage}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${item.title ? item.title.slice(0, 25) : ''}</h5>
              <p class="card-text">${item.description ? item.description.slice(0, 25) : ''}...</p>
              <a href="${item.url}" target="_blank" class="btn btn-primary">Read Article</a>
            </div>
          </div>
        `;
      }
    } else {
      str = "<p>No articles found.</p>";
    }
    document.querySelector(".content").innerHTML = str;
  };

  fetchNews(currentPage, currentQuery);

  search.addEventListener("click", (e) => {
    e.preventDefault();
    let query = searchInput.value.trim();
    if (query) {
      currentQuery = query;
      currentPage = 1;
      fetchNews(currentPage, currentQuery);
    }
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

  // Navbar category links
  document.getElementById("home-link").addEventListener("click", (e) => {
    e.preventDefault();
    currentQuery = "news";
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
})