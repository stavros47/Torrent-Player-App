
function createMovieContainer(){
    var div = document.createElement("div");
    div.classList.add("movieContainer");
    div.classList.add("col-md-12");
   
    return div;
}

function createMovieComponent(movie){
    let movieTitle = movie.title;
    let movieLink = movie.link;
    let moviePoster = movie.image;

    var div = document.createElement("div");
    div.classList.add("movie");
    //div.classList.add("row");
    div.classList.add("col-md-12");
    div.innerHTML = movieTitle;
    
    div.addEventListener('click', function(){
        var exec = require('child_process').exec;
        console.log(link);
        exec(`peerflix \"${movieLink}\" --vlc`, function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    });

    div.addEventListener('mouseover', function(){
        let poster = new Image(200,200);
        poster.src = moviePoster;
       document.getElementById('poster').src = poster.src;
    });

    return div;

}

function generateMovieComponents(jsonArray){

    var movieContainer = createMovieContainer();

    for(i = 0; i < jsonArray.length; i++){

        var div = createMovieComponent(jsonArray[i]);       
        movieContainer.appendChild(div);
    }

    return movieContainer;
}

module.exports = {
    generateMovieComponents
}