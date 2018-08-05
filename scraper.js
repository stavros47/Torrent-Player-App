const cheerio = require('cheerio');
const fetch = require('node-fetch');
var ptn = require('parse-torrent-name');

//var url = 'http://sg.media-imdb.com/suggests/' + searchTerm.charAt(0) + '/' + encodeURIComponent(searchTerm)  + '.json'

var options = {
    imdbURL:'http://sg.media-imdb.com/suggests/',
    url:"https://thepiratebay.org/top/207",
    json: false
}


const movies = [];

//get piratebay movies and their links
function getMovies(){
    return fetch(`${options.url}`)
    .then(response => response.text())
    .then(body => {
       
        const $ = cheerio.load(body);
       
        var rows = $("#searchResult").children('tbody').children();
        rows.each(function(i, element){
            const $titleRow = $(this).children('td').eq(1).find(".detName").find("a");
            const $title = $titleRow.text();
            const $link = $(this).children('td').eq(1).children('a').eq(0).attr('href');
            if($title){
                
                const movie = {
                    title: ptn($title).title,
                    link: $link
                }
                movies.push(movie);
            }
            
        });
        
        return movies;
    });
}

function getMoviePoster(searchTerm){
    return fetch(`${options.imdbURL}${searchTerm.title.charAt(0).toLowerCase()}/${encodeURIComponent(searchTerm.title.replace(/[_-]/g, ""))}.json`)
    .then(response => response.text())
    .then((data)=>{      
        let json = data ? JSON.parse(data.toString().match(/{.*}/g)) : "";
        //console.log(searchTerm.title,json);
        let image = json ? (json.d[0].i[0] ? json.d[0].i[0] : "") : "";
        let id = json ? (json.d[0].id ? json.d[0].id : ""): "";

        searchTerm.image = image;
        searchTerm.imdbID = id;
            
       return searchTerm;
    });    
}

//Get top 250 movies - //"https://www.imdb.com/chart/top"
function getTopMovies(){
    return fetch(`${options.url}`)
    .then(response => response.text())
    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
        var elements = $(".lister-list").children();
        elements.each(function(i, element){
            const $title = $(this).find(".titleColumn").find("a").text();
            const $rating = $(this).find(".ratingColumn").eq(0).text();
            const movie = {
                title: $title,
                rating: $rating.replace(/[^A-Z0-9]+/ig, "")
            }
            movies.push(movie);
        });
        console.log(movies);
        return movies;
    });
}


module.exports = {
    getTopMovies,
    getMovies,
    getMoviePoster
}


