# liri-node-app

## Instructions

* <bold>This is a CLI program.
* <bold>There are 4 commands that can be given to liri:
    - node liri.js spotify-this-song [song name] <br/>
        (liri will give back to you the name of the song, the artist(s), a link to the song, and the album name)
    - node liri.js my-tweets [screen name]<br/>
        (liri will give back to you the last 20 tweets made from the given account, as well as when they were created)
    - node liri.js movie-this [movie name]<br/>
        (liri will give back to you the title, year of release, IMDB rating, Rotten Tomatos rating, country, language, plot, and actors of the requested movie)
    - node liri.js do-what-it-says<br/>
        (liri will read the text from a file and perform what it says to do if it follows one of the given commands)

* <bold>This node app makes use of the following npm packages:
    - [Twitter]
    - [Node-Spotify-API]
    - [Request]
    - [DotEnv]
