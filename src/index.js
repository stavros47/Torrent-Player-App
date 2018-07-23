
const handler = require('../handler.js');
const scraper = require('../scraper.js');


function loadMovies(){
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         // Typical action to be performed when the document is ready:
    //         //document.getElementById("demo").innerHTML = xhttp.responseText;
    //         console.log(JSON.parse(this.responseText));
    //         generateMovieComponents(JSON.parse(this.responseText));
    //     }
    // };
    // xhttp.open("GET", "http://localhost:3000/movies", true);
    // xhttp.send();
    scraper
    .getMovies()
    .then(async movies =>{
       
        const promises = movies.map(scraper.searchMovie);
        await Promise.all(promises);
        let moviesContainer = handler.generateMovieComponents(movies);
        document.getElementById("main").appendChild(moviesContainer);
        console.log(movies);
    });
}

loadMoviesBtn = document.getElementById("loadMoviesBtn");

if(loadMoviesBtn){
    console.log("Load Movies Button");
    loadMoviesBtn.addEventListener('click', loadMovies);
}
