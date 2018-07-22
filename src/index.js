console.log("Index js loaded!");
const scraper = require('../scraper.js');

loadMoviesBtn = document.getElementById("loadMoviesBtn");

function requestMovies(){
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         // Typical action to be performed when the document is ready:
    //         //document.getElementById("demo").innerHTML = xhttp.responseText;
    //         console.log(JSON.parse(this.responseText));
    //         handleResponse(JSON.parse(this.responseText));
    //     }
    // };
    // xhttp.open("GET", "http://localhost:3000/movies", true);
    // xhttp.send();
    scraper
    .getMovies()
    .then(movies =>{
        handleResponse(movies);
    });
}

if(loadMoviesBtn){
    console.log("Load Movies Button");
    loadMoviesBtn.addEventListener('click', requestMovies);
}

function createComponent(title){
    var div = document.createElement("div");
    div.classList.add("movie");
   // div.style.width = "300px";
   // div.style.height = "100px";
   // div.style.background = "red";
   // div.style.color = "white";
    div.innerHTML = title;
    
    return div;

}

function handleResponse(jsonArray){
    for(i = 0; i < jsonArray.length; i++){
        // console.log(jsonArray[i].title);
        // console.log();
        var div = createComponent(jsonArray[i].title);
        let link = jsonArray[i].link;

        div.addEventListener('click', function(){
            var exec = require('child_process').exec;
            console.log(link);
            exec(`peerflix \"${link}\" --mplayer`, function(error, stdout, stderr) {
                console.log('stdout: ' + stdout);
                console.log('stderr: ' + stderr);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });
        });
        document.getElementById("demo").appendChild(div);
    }
}