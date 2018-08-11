
const handler = require('../handler.js');

const { settings } = require('../config/config');

loadMoviesBtn = document.getElementById("loadMoviesBtn");

if(loadMoviesBtn){ 
    loadMoviesBtn.addEventListener('click', handler.loadMovies);
}

var select = document.getElementById('subtitles');

select.addEventListener('change', ()=>{
    console.log(select.value);
    settings.subtitles = select.value;
});