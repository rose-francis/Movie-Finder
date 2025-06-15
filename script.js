const searchInput=document.querySelector('#searchInput');
const searchButton=document.querySelector('#searchButton');
const resultsContainer=document.querySelector('#results');

searchButton.addEventListener("click",()=>{
    const searchItem=searchInput.value.trim();
        if(searchItem){
            searchMovies(searchItem);
        }  
    });

 const apiKey="ad23bdce";
 function searchMovies(query){
    const url=`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`;
    
    fetch(url)
        .then(res => res.json())
        .then(data=>{
            displayMovies(data.Search);
        })
        .catch(err=> {
            resultsContainer.innerHTML = `<p class="text-red-500">Something went wrong.Try again</div>`; // Display error message
        }
        );
    }

    function displayMovies(movies){
        if(!movies){
            resultsContainer.innerHTML = "<p class='text-gray-500'>No results found.</p>";
            return;
        }

        resultsContainer.innerHTML="";
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = "bg-white rounded shadow p-4 text-left";
           
            movieCard.innerHTML = `
                <h2 class="text-xl font-semibold">${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/80x120?text=No+Image'}" alt="${movie.Title}" class="w-20 h-32 object-cover rounded mr-4">
                `;
            
                resultsContainer.appendChild(movieCard);
        });
        }