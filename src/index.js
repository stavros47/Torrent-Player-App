const handler = require('../handler.js');
const electron = require('electron');
const ipc = electron.ipcRenderer;
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