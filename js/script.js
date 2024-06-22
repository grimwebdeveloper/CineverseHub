const global = {
  currentPage: window.location.pathname,
};

// Initial App
function initial() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            console.log('Home');
            break;
    
        case '/shows.html':
            console.log('Shows / TV Shows');
            break;
    
        case '/movie-details.html':
            console.log('Movie Details');
            break;
    
        case '/tv-details.html':
            console.log('TV Details');
            break;
    
        case '/search.html':
            console.log('Search');
            break;
    
        default:
            break;
    }

    highlightActiveLink();
}

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// Events
document.addEventListener('DOMContentLoaded', initial);