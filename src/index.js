
const handler = require('../handler.js');
const scraper = require('../scraper.js');
const _ = require('underscore');

function loadMovies(){
 
    scraper
    .getMovies()
    .then(async movies =>{
       
        const promises = movies.map(scraper.getMoviePoster);
        await Promise.all(promises);
        let myMovies = _.uniq(movies, 'title');
        let moviesContainer = handler.generateMovieComponents(myMovies);
        document.getElementById("main").appendChild(moviesContainer);
       console.log(myMovies);
    });
}

loadMoviesBtn = document.getElementById("loadMoviesBtn");

if(loadMoviesBtn){ 
    loadMoviesBtn.addEventListener('click', loadMovies);
}
