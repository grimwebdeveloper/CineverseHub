const links = document.querySelectorAll('.nav-link');
const global = {
    currentPage: window.location.pathname,
};

function highlightActiveLink() {
    links.forEach(link => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

function init() {
    switch (global.currentPage) {
        case '/':   
        case '/index.html':
            console.log('Home', `and the path is '${global.currentPage}'`);
            break;

        case '/shows.html':
            console.log('Shows', `and the path is '${global.currentPage}'`);
            break;

        case '/movie-details.html':
            console.log('Movie details', `and the path is '${global.currentPage}'`);
            break;

        case '/tv-details.html':
            console.log('TV details', `and the path is '${global.currentPage}'`);
            break;

        case '/search.html':
            console.log('Search', `and the path is '${global.currentPage}'`);
            break;

        default:
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
