const cheerio = require('cheerio');
const Table = require('cli-table');
const fetch = require('node-fetch');

var options = {
    url:"https://thepiratebay.org/top/201",//"https://www.imdb.com/chart/top",
    json: false
}

var table = new Table({
    head : ['#','Title', 'Rating'],
    colWidths: [4,35, 20,],
    style: { 'padding-left': 0, 'padding-right': 0 }
});

//Get top 250 movies
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

//get piratebay movies and their links
function getMovies(){
    return fetch(`${options.url}`)
    .then(response => response.text())
    .then(body => {
        const movies = [];
        const $ = cheerio.load(body);
       
        var rows = $("#searchResult").children('tbody').children();
        rows.each(function(i, element){
            const $titleRow = $(this).children('td').eq(1).find(".detName").find("a");
            const $title = $titleRow.text();
            const $link = $(this).children('td').eq(1).children('a').eq(0).attr('href');
            if($title){
                const movie = {
                    title: $title,
                    link: $link
                }
                movies.push(movie);
            }
            
        });
      
        return movies;
    });
}

function searchMovie(searchTerm){
    
}

module.exports = {
    getTopMovies,
    getMovies
}


