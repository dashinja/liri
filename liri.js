//defaults need work

// imports
require('dotenv').config();
const keys = require('./keys.js');
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');
const fs = require('fs');

// globals
const spotify = new Spotify(keys.spotify);
let operation = process.argv[2];
let queryCLI = process.argv[3];

//input handler
const OPERATOR = {
  concert: concert,
  spotify: spotifySearch,
  movie: movie,
  doit: doWhatItSays
};

// all the things (functions)

function movie() {
  const MOVIE_API_KEY = `15486eac`;

  // if (process.argv[3] === undefined) {
  //   queryCLI = process.argv[3];
  // }
  queryCLI = process.argv[3];
  let queryURL = `http://www.omdbapi.com/?apikey=${MOVIE_API_KEY}&t=${queryCLI}`;

  axios
    .get(queryURL)
    .then(res => {
      let data = res.data;
      let title = data.Title;
      let releaseYear = data.Released;
      let ratingIMDB = data.imdbRating;
      // let ratingTomatoes = data.Ratings[1].Value;

      let country = data.Country;
      let countryTest = country.split(',');
      if (countryTest.length > 1) {
        countryTest.splice(-1, 0, ' and').join();
        country = countryTest;
      }

      let language = data.Language.split(', ')
        .slice(0, 1)
        .join();

      let actors = data.Actors;
      let plot = data.Plot;

      let results = `${title} debuted primarily in ${language} on ${releaseYear} in ${country} with a ${ratingIMDB} rating from IMDB.\n The actors include ${actors}, and who ever else to boot.\nPlot: ${plot}\n----------------------------------------------------------------------------\n\n`;
      console.log(results);
      writeToLog(results);
    })
    .catch(err =>
      console.error(
        `Item not found for given request. Specified data does not exist for given entry. Response string truncated of undefined data. Plausible culprit: Rotten Tomatoes rating does not exist. ${err}`
      )
    );
}

function writeToLog(data) {
  // silent logging
  fs.appendFile('./log.txt', `${data}\n\r`, err => {
    if (err) throw err;
  });
}

function spotifySearch() {
  spotify
    .search({
      type: 'track',
      query: queryCLI,
      limit: 1
    })
    .then(res => {
      let body = res.tracks.items[0].album;
      for (let item in body) {
        let results = `Song Result: ${queryCLI}\nArtist(s): ${
          body.artists[0].name
        }\nAlbum Name: ${body.name}\nPreview Lin: ${
          body.external_urls.spotify
        }\n`;
        console.log(results);

        writeToLog(results);
        break;
      }
    })
    .catch(err => console.log(err));
}

function concert() {
  axios
    .get(
      `https://rest.bandsintown.com/artists/${queryCLI}/events?app_id=codingbootcamp&date=upcoming`
    )
    .then(res => {
      body = res.data;

      let titleResults = `${queryCLI}`;
      console.log(`${titleResults} Concert Locations:\n`);
      writeToLog(`///////// ${titleResults} Concert Locations: /////////`);

      for (let item in body) {
        const vName = body[item].venue.name;
        const vLocation = `${body[item].venue.city}, ${
          body[item].venue.region
        }`;
        const vDate = body[item].datetime;

        let results = `Where: ${vName}\nLocation: ${vLocation}\nDate: ${moment(
          vDate
        ).format('MM/DD/YYYY')}\n`;
        console.log(results);
        writeToLog(results);
      }
    })
    .catch(err => console.log('Sorry, no information found', err));
}

function doWhatItSays() {
  fs.readFile('./random.txt', 'utf8', (err, data) => {
    if (err) throw err;
    let dataSplit10 = data.split(', ');
    // console.log(dataSplit10)

    for (let i = 0; i < dataSplit10.length; i += 2) {
      operation = dataSplit10[i];
      queryCLI = dataSplit10[i + 1]
      process.argv[3] = dataSplit10[i + 1];
      // console.log("Operator[operation]:", OPERATOR[operation])
      OPERATOR[operation]();
    }
  });
}

OPERATOR[operation]();
