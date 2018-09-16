# Torrent Player App
Stream your favourite movies

## How it works

Scrape movies from a provider(Title and magnet link) and then scrape their posters from IMDB
Present the movie posters in a window(as a grid) and then stream them while downloading using [Peerflix](https://www.npmjs.com/package/peerflix).

Currently the scraper , scrapes PrtBay for top 100 HD movies

## Quick Start - Notes

it is not packaged yet, so to use just clone the repository and then install dependencies and run.
Opens/streams in a new window (**default**) or VLC (optional).

```sh
npm install
npm start
```
It will execute the `elecron .` command and open the main window. Until I figure the best way to load movies, the movie list is not loaded when the application starts. Load movies button sends the requests and loads the movies pretty fast for now.
 
The main plan is to remove peerflix at some point and implement streaming natively using another bitTorrent streaming library.

---

**Possible candidate for native torrent streaming implementation:** 
> [webtorrent](https://github.com/webtorrent/webtorrent)

---

## What this is

This project is for my personal education purposes, mainly for creating a feature-rich development environment:

* **Learning Electron** - Creating Desktop applications using a web stack.
* **Packaging Electron Apps** (Not yet implemented)
* **Improving the project's Architecture as I am learning more about web technologies**
* **Expand JS Knowledge** using ElectronJS and NodeJS with express.
* **Implement a React based UI** (Not yet implemented)

### To Do:

    * Create a Settings window to provide adjustable settings e.x subtitle language, default player, movie provider etc
    * Adjust the video player to scale according to it's parent window.
    * Add subtitle support using the OpenSubtitles API
    * Load all elements properly before they appear on window
    * Implement the UI using React
    * TV Show Scrapper/provider
    * Clicking a movie could show more details/settings for a movie before choosing to play it
    * Fix slow loading issues on Linux
    * Set up the packaging with electron packager

**The Code needs alot of improvement, and I will do so as I find free time from University. The architecture and techniques used need alot of improvement. This was put together in a few hours, and I hope to find time to improve this in the future**
