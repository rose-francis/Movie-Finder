// filepath: [script.js](http://_vscodecontentref_/2)
const apiKey = 'ad23bdce'; // <-- Replace with your API key

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') searchMovies();
});

async function searchMovies() {
    const query = searchInput.value.trim();
    resultsDiv.innerHTML = '';
    if (!query) return;

    resultsDiv.innerHTML = '<div class="text-gray-500">Searching...</div>';

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.Response === 'True') {
            resultsDiv.innerHTML = data.Search.map(movie => `
                <div class="bg-white rounded shadow p-4 flex items-center">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x120?text=No+Image'}" alt="${movie.Title}" class="w-20 h-32 object-cover rounded mr-4">
                    <div class="text-left">
                        <div class="font-bold text-lg">${movie.Title}</div>
                        <div class="text-gray-600">${movie.Year}</div>
                        <div class="text-gray-400 text-sm">${movie.Type}</div>
                    </div>
                </div>
            `).join('');
        } else {
            resultsDiv.innerHTML = `<div class="text-red-500">${data.Error}</div>`;
        }
    } catch (err) {
        resultsDiv.innerHTML = `<div class="text-red-500">Error fetching data.</div>`;
    }
}