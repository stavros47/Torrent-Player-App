const express = require('express');
const scraper = require('./scraper');

const app = express();

app.use(express.static(__dirname)); //??


app.get('/movies', (req, res) =>{
    scraper
    .getMovies()
    .then(movies =>{
        res.json(movies);
    });
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Listening on ${port}`);
    console.log();
});



//Serve html
// app.get('/', (req, res) =>{
//     res.sendFile(__dirname + '/src/index.html');
//     scraper
//     .getMovies()
//     .then(movies =>{
//         res.json(movies);
//     });
// });


// //Search movies Not implemented yet.
// app.get('/search/:title', (req, res) =>{
//     scraper
//     .searchMovies(req.params.title)
//     .then(movies =>{
//         res.json(movies);
//     });
// });

