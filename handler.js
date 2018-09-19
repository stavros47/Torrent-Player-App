const { settings } = require('./config/config');
const scraper = require('./scraper.js');
const _ = require('underscore');
const electron = require('electron');
const ipc = electron.ipcRenderer;

function createMovieContainer(){
    var div = document.createElement("div");
    div.classList.add("movieContainer");
    div.classList.add("row");
   
    return div;
}

function createMovieComponent(movie){
    //console.log(`Movie: ${movie.title}`);
    let movieTitle = movie.title;
    let movieLink = movie.link;
    let moviePoster = movie.image;

    let div = document.createElement("div");
    div.classList.add("movie");
   
    div.classList.add("col-md-2");
    //div.innerHTML = movieTitle;
    var thumb = document.createElement("div");
    thumb.classList.add("thumbnail");

    var elem = document.createElement("IMG");
    elem.classList.add("poster");
    elem.setAttribute("src", moviePoster);

    thumb.appendChild(elem);
    div.appendChild(thumb);
    
    //https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a
    div.addEventListener('click', function(){

        ipc.send('play', movieLink);
        // const { spawn } = require('child_process');
        // const child = spawn(`peerflix \"${movieLink}\" --vlc`, {
        //     detached: true,
        //     stdio: 'inherit',
        //     windowsHide: true,
        //     shell: true
            
        //   });

        //   child.on('error', (err) => {
        //     console.log('Failed to start subprocess. ');
        //     console.log(err);
        //   });

        //   child.on('exit', function (code, signal) {
        //     console.log('child process exited with ' +
        //                 `code ${code} and signal ${signal}`);
        //   });

    }); 

    return div;
}

function generateMovieComponents(jsonArray){
    //console.log(`Array: ${jsonArray}`);
    var movieContainer = createMovieContainer();

    for(i = 0; i < jsonArray.length; i++){

        var div = createMovieComponent(jsonArray[i]);       
        movieContainer.appendChild(div);
    }

    return movieContainer;
}

function loadMovies(){ 
    //console.log('Loading Movies...')
    scraper
    .getMovies()
    .then(async movies =>{
       
        const promises = movies.map(scraper.getMoviePoster);
        await Promise.all(promises)
        .then((myMovies)=>{
            myMovies = _.uniq(myMovies, 'title');//Remove duplicates
            let moviesContainer = generateMovieComponents(myMovies);
            if(document.getElementById("main") && moviesContainer){
                document.getElementById("main").appendChild(moviesContainer);
            }
        }).catch(e => console.log(`Error: ${e}`));
       
       //console.log(myMovies);
    });
}

module.exports = {
    generateMovieComponents,
    loadMovies
}