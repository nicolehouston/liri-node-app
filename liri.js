require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");

function liri() {
// This runs if liri is given the command "my-tweets"
if (command === "my-tweets") {
  var params = {screen_name: 'anonymousCoder1'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log("Tweet: " + tweets[i].text);
      console.log("Date and Time Posted: " + tweets[i].created_at);
      console.log("====================================================");
    }
  }
});
}
// This runs if liri is given the command "spotify-this-song"
else if (command === "spotify-this-song") {
  spotify.search({type: 'track', query: term}, function(err, data){
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
    var result = data.tracks.items[0].album;

    var showData = [
      "Artist: " + result.artists[0].name,
      "Song Name: " + term,
      "Preview Song: " + result.external_urls.spotify,
      "Album: " + result.name,
    ].join("\n\n");

    console.log(showData);
  });
}
// This runs if liri is given the command "movie-this"
else if (command === "movie-this") {
  if(!term) {
    term = "Mr. Nobody";
  }

  var URL = "http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy";

  request(URL, function(error, response, body){
    if (!error && response.statusCode === 200) {

      var showData = [
        "Movie Title: " + JSON.parse(body).Title,
        "Year: " + JSON.parse(body).Year,
        "IMDB rating: " + JSON.parse(body).Ratings[0].Value,
        "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value,
        "Country: " + JSON.parse(body).Country,
        "Language: " + JSON.parse(body).Language,
        "Plot: " + JSON.parse(body).Plot,
        "Actors: " + JSON.parse(body).Actors
      ].join("\n\n");

      console.log(showData);
    }
  });
}
// This runs if liri is given the command "do-what-it-says"
else if(command === "do-what-it-says") {
  fs.readFile("random.txt", "utf8", function(error, data) {

    var text = data.split(",");
    command = text[0];
    term = text[1];
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }
  
    console.log("Liri has been told to " + command + " " + term);
    console.log("=====================================");
    liri();
  });
}
else {
  console.log("Sorry, Liri doesn't know that command yet.");
}
};

liri();