window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Ajusta a opacidade do gradiente preto conforme o scroll
    if (scrollPosition <= windowHeight) {
        // Progresso do fade (de 0 a 1) baseado na altura da tela
        const fadeAmount = scrollPosition / windowHeight;
        // Aplica o gradiente com a opacidade ajustada
        heroSection.style.backgroundImage = `
            url('assets/sunflower.webp'), 
            linear-gradient(to bottom, rgba(0, 0, 0, ${fadeAmount}), rgba(0, 0, 0, 1))
        `;
    } else {
        // Após ultrapassar o limite da tela, mantém o fundo totalmente preto
        heroSection.style.backgroundImage = `
            url('assets/sunflower.jpg'), 
            linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))
        `;
    }
});
// Get the movie elements and container
let movies = Array.from(document.querySelectorAll('.movie'));
const movieContainer = document.querySelector('.movie-container');

// Function to refresh the slider
function refreshSlider() {
    movieContainer.innerHTML = ''; // Clear the container
    movies.forEach(movie => movieContainer.appendChild(movie)); // Rebuild the container
}

// Function to update the movie layout and apply styles
function updateSlider() {
    movies.forEach((movie, index) => {
        movie.classList.remove('big');
        movie.style.opacity = '0.5';

        // Apply styles to the second (big) movie
        if (index === 1) {
            movie.classList.add('big');
            movie.style.opacity = '1';
        }

        // Fade the first and last movies
        if (index === 0 || index === movies.length - 1) {
            movie.style.opacity = '0.3';
        }
    });
}

// Event listener for left arrow
document.getElementById('left-arrow').addEventListener('click', () => {
    console.log('Left arrow clicked');
    // Move the last movie to the front
    const lastMovie = movies.pop(); // Remove the last movie
    movies.unshift(lastMovie); // Add it to the front
    refreshSlider(); // Rebuild and update the slider
    updateSlider(); // Apply the styles
});

// Event listener for right arrow
document.getElementById('right-arrow').addEventListener('click', () => {
    console.log('Right arrow clicked');
    // Move the first movie to the end
    const firstMovie = movies.shift(); // Remove the first movie
    movies.push(firstMovie); // Add it to the end
    refreshSlider(); // Rebuild and update the slider
    updateSlider(); // Apply the styles
});

// Initial setup
updateSlider();

// Help button functionality
const infoButton = document.getElementById('info-button');
const infoBox = document.getElementById('info-box');

infoButton.addEventListener('click', function () {
    infoBox.style.display = 'block';

    // Hide the instruction box after 5 seconds
    setTimeout(function () {
        infoBox.style.display = 'none';
    }, 5000);
});