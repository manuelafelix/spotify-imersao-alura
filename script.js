// parte que define se o greeting será bom dia, boa tarde ou boa noite
const greeting = document.getElementById('greeting');
const currentHour = new Date().getHours();

const greetingMessage = 
    currentHour > 5 && currentHour < 12
    ? "Bom dia"
    : currentHour > 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite"

greeting.textContent = greetingMessage;
    
// parte da requisição da API + busca dos artistas
const searchInput = document.getElementById('search-input');
const resultPlaylists = document.getElementById('result-playlists');
const resultArtist = document.getElementById('result-artist');

function requestApi(searchTerm) {
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((results) => displayResult(results));
}

function displayResult(results) {
    resultPlaylists.classList.add('hidden');

    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    results.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}

document.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultArtist.classList.add('hidden');
        resultPlaylists.classList.remove('hidden');
        return
    }
    requestApi(searchTerm);
})