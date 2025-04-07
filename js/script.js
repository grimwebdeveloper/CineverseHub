const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPage: 1,
  },
  api: {
    key: '8e910b8001b97796872ce25e3010e43b',
    url: 'https://api.themoviedb.org/3',
  },
};

// This function will display the popular movies on the home page. It fetches the data from the API and creates a card for each movie with its poster, title, and release date. It also adds an event listener to the "See All Movies" button to redirect to the movies page when clicked.
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  console.log('Result:', results);

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                ${
                  movie.poster_path
                    ? `<img src="http://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${
                      movie.release_date
                    }</small>
                </p>
            </div>`;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

// This function will display the popular TV shows on the home page. It fetches the data from the API and creates a card for each show with its poster, title, and air date. It also adds an event listener to the "See All Shows" button to redirect to the shows page when clicked.
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  console.log('Result:', results);

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
                ${
                  show.poster_path
                    ? `<img src="http://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}" />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                    <small class="text-muted">Air Date: ${
                      show.first_air_date
                    }</small>
                </p>
            </div>`;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  console.log(movieId);

  const movie = await fetchAPIData(`movie/${movieId}`);
  console.log('Movie:', movie);

  displayBackgroundImage('movie', movie.backdrop_path); // Set the background image for the movie details page

  const div = document.createElement('div');
  div.innerHTML = `
        <div class="details-top">
            <div>
                ${
                  movie.poster_path
                    ? `<img src="http://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}" />`
                    : `<img src="images/no-image.jpg" class="card-img-top" alt="${movie.title}" />`
                }
            </div>
            <div>
                <h2>${movie.title}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${movie.vote_average.toFixed(1)} / 10
                </p>
                <p class="text-muted">Release Date: ${movie.release_date}</p>
                <p>${movie.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${movie.genres
                      .map((genre) => `<li>${genre.name}</li>`)
                      .join('')}
                </ul>
                <a href="${
                  movie.homepage
                }" target="_blank" class="btn">Visit Movie Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Movie Info</h2>
            <ul>
                <li><span class="text-secondary">Budget:</span> $${movie.budget
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
                <li><span class="text-secondary">Revenue:</span> $${movie.revenue
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
                <li><span class="text-secondary">Runtime:</span> ${
                  movie.runtime
                } minutes</li>
                <li><span class="text-secondary">Status:</span> ${
                  movie.status
                }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${movie.production_companies
              .map((company) => company.name)
              .join(', ')}</div>
        </div>
    `;

  document.querySelector('#movie-details').appendChild(div);
}

async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  console.log(showId);

  const show = await fetchAPIData(`tv/${showId}`);
  console.log('show:', show);

  displayBackgroundImage('tv', show.backdrop_path); // Set the background image for the movie details page

  const div = document.createElement('div');
  div.innerHTML = `
        <div class="details-top">
            <div>
                ${
                  show.poster_path
                    ? `<img src="http://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="${show.name}" />`
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${show.name}" />`
                }
            </div>
            <div>
                <h2>${show.name}</h2>
                <p>
                    <i class="fas fa-star text-primary"></i>
                    ${show.vote_average.toFixed(1)} / 10
                </p>
                <p class="text-muted">First Air Date: ${show.first_air_date}</p>
                <p>${show.overview}</p>
                <h5>Genres</h5>
                <ul class="list-group">
                    ${show.genres
                      .map((genre) => `<li>${genre.name}</li>`)
                      .join('')}
                </ul>
                <a href="${
                  show.homepage
                }" target="_blank" class="btn">Visit Show Homepage</a>
            </div>
        </div>
        <div class="details-bottom">
            <h2>Show Info</h2>
            <ul>
                <li><span class="text-secondary">Number Of Episodes:</span> ${
                  show.number_of_episodes
                }</li>
                <li><span class="text-secondary">Last Episode To Air:</span> ${
                  show.last_air_date
                }</li>
                <li><span class="text-secondary">Status:</span> ${
                  show.status
                }</li>
            </ul>
            <h4>Production Companies</h4>
            <div class="list-group">${show.production_companies
              .map((company) => company.name)
              .join(', ')}</div>
        </div>
    `;

  document.querySelector('#show-details').appendChild(div);
}

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100%';
  overlayDiv.style.width = '100%';
  overlayDiv.style.position = 'fixed';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.05';
  overlayDiv.style.backdropFilter = 'blur(10px)';
  overlayDiv.style.borderRadius = '15px';
  overlayDiv.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}
async function search() {
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  console.log(urlParams);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.type !== '' && global.search.term !== null) {
    const { page, results, total_pages, total_results } = await searchAPIData();
    console.log('Results: ', results);
    console.table('Page: ', page);
    console.table('Total Pages: ', total_pages);
    console.table('Total Results: ', total_results);

    if (results.length === 0) {
      showAlert('No results found for your search term');
    }
    displaySearchResult(results);
    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Please enter a search term');
  }
}

function displaySearchResult(results) {
  results.forEach((result) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
                ${
                  result.poster_path
                    ? `<img src="http://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}" />`
                    : `<img src="../images/no-image.jpg" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}" />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
                <p class="card-text">
                    <small class="text-muted">${global.search.type === 'movie' ? 'Release' : 'Air Data'}: ${
                      global.search.type === 'movie' ? result.release_date : result.first_air_date
                    }</small>
                </p>
            </div>`;

    document.querySelector('#search-results').appendChild(div);
  });
}

async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');
  console.log('Slider results: ', results);
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt='${
      movie.title
    }' />
    </a>
    <h4 class="swiper-rating">
    <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
      1
    )} / 10
    </h4>
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 'auto', // Use 'auto' for better responsiveness
    spaceBetween: 20, // Reduced space for smaller screens
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 3000, // Faster autoplay for better engagement
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { slidesPerView: 1 }, // Added breakpoint for very small screens
      480: { slidesPerView: 1.5 }, // Adjusted for small devices
      640: { slidesPerView: 2 }, // Adjusted for medium devices
      768: { slidesPerView: 3 }, // Adjusted for tablets
      1024: { slidesPerView: 4 }, // Adjusted for larger tablets
      1200: { slidesPerView: 5 }, // Standard for desktops
    },
    pagination: {
      el: '.swiper-pagination', // Added pagination for better navigation
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next', // Added navigation buttons
      prevEl: '.swiper-button-prev',
    },
  });
}

// This function will fetch data from the API using the provided endpoint. It constructs the URL with the API key and language parameters and returns the parsed JSON data.
async function fetchAPIData(endpoint) {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  showSpinner(); // Show the spinner while fetching data

  const response = await fetch(
    `${API_URL}/${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  hideSpinner(); // Hide the spinner after fetching data

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

async function searchAPIData() {
  const API_KEY = global.api.key;
  const API_URL = global.api.url;
  showSpinner(); // Show the spinner while fetching data

  const response = await fetch(
    `${API_URL}/search/${
      global.search.type
    }?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      global.search.term
    )}&page=${global.search.page}`
  );
  const data = await response.json();
  hideSpinner(); // Hide the spinner after fetching data

  return data;
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// This function will highlight the active link in the navigation bar by adding the 'active' class to the link that matches the current page
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.pathname === global.currentPage) {
      link.classList.add('active');
    }
  });
}

function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);
}

// Function to handle the initialization of the page. This function will run when the DOM is fully loaded
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('Home Page / Movies');
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      console.log('TV Shows Page');
      displayPopularShows();
      break;
    case '/movie-details.html':
      console.log('Movie Details Page');
      displayMovieDetails();
      break;
    case '/tv-details.html':
      console.log('TV Details Page');
      displayShowDetails();
      break;
    case '/search.html':
      console.log('Search Page');
      search();
      break;
  }
  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
