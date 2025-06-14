document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY >= 100) {
      nav.classList.add('nav__black');
    } else {
      nav.classList.remove('nav__black');
    }
  });

  // Mock data for movies (in a real app, this would come from an API)
  const movieData = {
    netflixOriginals: [
      { id: 1, title: "Luis Miguel: The Series", image: "images/large-movie1.jpg", match: 98, rating: "TV-MA", genres: ["Biographical", "Drama"] },
      { id: 2, title: "Lucifer", image: "images/large-movie2.jpg", match: 95, rating: "TV-MA", genres: ["Urban Fantasy", "Police Procedural"] },
      { id: 3, title: "Haunted: Latin America", image: "images/large-movie3.jpg", match: 80, rating: "TV-MA", genres: ["Horror", "Reality"] },
      { id: 4, title: "Who Killed Sara?", image: "images/large-movie4.jpg", match: 92, rating: "TV-MA", genres: ["Mystery", "Thriller"] }
      // Add more Netflix Originals here
    ],
    trending: [
      { id: 5, title: "Nobody", image: "images/small-movie7.jpg", match: 90, rating: "R", genres: ["Action", "Thriller"] },
      { id: 6, title: "Demon Slayer: Mugen Train", image: "images/small-movie8.jpg", match: 99, rating: "TV-MA", genres: ["Anime", "Action"] }
      // Add more trending movies here
    ]
    // You can add more categories like "Top Rated", "Action Movies", etc.
  };

  // Function to create movie elements
  function createMovieElement(movie, isLarge) {
    const item = document.createElement('div');
    item.className = 'row__item';
    
    const img = document.createElement('img');
    img.className = isLarge ? 'row__poster row__posterLarge' : 'row__poster';
    img.src = movie.image;
    img.alt = movie.title;
    
    const hover = document.createElement('div');
    hover.className = 'row__hover';
    
    const buttons = document.createElement('div');
    buttons.className = 'row__buttons';
    buttons.innerHTML = `
      <button class="row__button"><i class="fas fa-play"></i></button>
      <button class="row__button"><i class="fas fa-plus"></i></button>
      <button class="row__button"><i class="fas fa-thumbs-up"></i></button>
    `;
    
    const details = document.createElement('div');
    details.className = 'row__details';
    details.innerHTML = `
      <span class="row__match">${movie.match}% Match</span>
      <span class="row__rating">${movie.rating}</span>
    `;
    
    const genres = document.createElement('div');
    genres.className = 'row__genres';
    genres.innerHTML = movie.genres.map(genre => `<span>${genre}</span>`).join('');
    
    hover.appendChild(buttons);
    hover.appendChild(details);
    hover.appendChild(genres);
    
    item.appendChild(img);
    item.appendChild(hover);
    
    return item;
  }

  // Function to populate rows (in a real app, this would be API calls)
  function populateRows() {
    const rows = document.querySelectorAll('.row');
    
    rows.forEach(row => {
      const title = row.querySelector('.row__title').textContent;
      const postersContainer = row.querySelector('.row__posters');
      
      // Clear existing content
      postersContainer.innerHTML = '';
      
      // Get appropriate data based on row title
      let movies = [];
      let isLarge = false;
      
      if (title.includes('ORIGINALS')) {
        movies = movieData.netflixOriginals;
        isLarge = true;
      } else if (title.includes('Trending')) {
        movies = movieData.trending;
        isLarge = false; // Trending items usually have smaller posters
      }
      // Add other conditions for different rows here, e.g.:
      // else if (title.includes('Top Rated')) {
      //   movies = movieData.topRated;
      // }
      
      // Add movies to row
      movies.forEach(movie => {
        postersContainer.appendChild(createMovieElement(movie, isLarge));
      });
    });
  }

  // Initialize the page
  populateRows();
});