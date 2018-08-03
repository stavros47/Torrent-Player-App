
function createMovieContainer(){
    var div = document.createElement("div");
    div.classList.add("movieContainer");
    div.classList.add("row");
   
    return div;
}

function createMovieComponent(movie){
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
        //var spawn = require('child_process').spawn;
        const { spawn } = require('child_process');
        const child = spawn(`peerflix \"${movieLink}\" --vlc`, {
            detached: true,
            stdio: 'ignore',
            shell: true,
            windowsHide: true
          });

          child.on('error', (err) => {
            console.log('Failed to start subprocess. ');
            console.log(err);
          });

          child.on('exit', function (code, signal) {
            console.log('child process exited with ' +
                        `code ${code} and signal ${signal}`);
          });
        //console.log(movieLink);
        // exec(`peerflix \"${movieLink}\" --vlc`, function(error, stdout, stderr) {
        //     console.log('stdout: ' + stdout);
        //     console.log('stderr: ' + stderr);
        //     if (error !== null) {
        //         console.log('exec error: ' + error);
        //     }
        // });
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