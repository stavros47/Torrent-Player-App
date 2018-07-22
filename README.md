# Torrent Player App
Stream Torrents to VLC or MPlayer using [Peerflix](https://www.npmjs.com/package/peerflix).


## Quick Start - Notes

```sh
npm start
```
It will execute the `elecron .` command and open the main window.
Currently the scraper , scrapes PrtBay for 100 movie titles and their magnet links.
Then it uses [Peerflix](https://www.npmjs.com/package/peerflix)  to open and stream them on VLC or MPlayer(**default**).

The plan is to remove peerflix at some point and implement streaming natively using another bitTorrent streaming library, 
for example [torrent-stream](https://github.com/mafintosh/torrent-stream)

## What this is

This project is for my personal education purposes, mainly for:

* **Learning Electron** and creating a feature-rich development environment.
* **Packaging Electron Apps**
* **Improving the project's Architecture as I am learning more about these technologies**
* **Expand JS Knowledge** using ElectronJS and NodeJS with express.

**The Code needs alot of improvement, and I will do so as I find free time from University. The architecture and techniques used
need alot of improvement. This was put together in a few hours, and I hope to find time to improve this in the future**
