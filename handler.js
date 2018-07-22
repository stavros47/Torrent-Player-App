
function createMovieContainer(){
    var div = document.createElement("div");
    div.classList.add("movieContainer");
    div.classList.add("container");

    return div;
}

function createMovieComponent(title, link){
    var div = document.createElement("div");
    div.classList.add("movie");
    div.classList.add("col-md-12");
    div.innerHTML = title;
    
    div.addEventListener('click', function(){
        var exec = require('child_process').exec;
        console.log(link);
        exec(`peerflix \"${link}\" --vlc`, function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    });

    return div;

}

function generateMovieComponents(jsonArray){

    var movieContainer = createMovieContainer();

    for(i = 0; i < jsonArray.length; i++){
        let movieTitle = jsonArray[i].title;
        let movieLink = jsonArray[i].link;

        var div = createMovieComponent(movieTitle,movieLink);       
        movieContainer.appendChild(div);
    }

    return movieContainer;
}

module.exports = {
    generateMovieComponents
}