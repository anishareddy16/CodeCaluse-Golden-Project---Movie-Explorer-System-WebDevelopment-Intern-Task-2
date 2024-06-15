document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('form');
    const movieContainer = document.querySelector('.movie-container');
    const inputBox = document.querySelector('.inputBox');

    // Function to fetch movie details using OMDB API key
    const getMovieInfo = async (movie) => {
        const apiKey = "81bf99c2"; // Replace with your OMDB API key
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            showMovieData(data);
        } catch (error) {
            console.error('Error fetching movie information:', error);
        }
    };

    // Function to display movie data
    const showMovieData = (data) => {
        if (data.Response === "False") {
            movieContainer.innerHTML = `<p>Movie not found!</p>`;
            return;
        }
        const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

        const movieElement = document.createElement('div');
        movieElement.innerHTML = `
            <h2><strong>${Title}</strong></h2>
        <p><strong>Rating:</strong> ${imdbRating} &#11088;</p>
        <p><strong>Genre:</strong> ${Genre}</p>
        <p><strong>Released:</strong> ${Released}</p>
        <p><strong>Runtime:</strong> ${Runtime}</p>
        <p><strong>Actors:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
        <img src="${Poster}" alt="Movie Poster" />
        `;
        movieContainer.innerHTML = ''; // Clear previous results
        movieContainer.appendChild(movieElement);
    };

    // Event listener for form submission
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const movieName = inputBox.value.trim();
        if (movieName !== '') {
            getMovieInfo(movieName);
        }
        else{
            movieContainer.innerHTML = `<h2>Enter Movie Name To Get Movie Information</h2>`;
        }
    });
});

