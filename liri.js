require('dotenv').config();
const keys = require('./keys.js');
const axios = require('axios');
const moment = require('moment');
const Spotify = require('node-spotify-api');

const spotify = new Spotify(keys.spotify);

let operation = process.argv[2];
let artist = process.argv[3];

const OPERATOR = {
  concert: concert()
};

function concert(operation) {
  axios
    .get(
      // `https://rest.bandsintown.com/artists/${artist}?app_id=codingbootcamp`
      `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp&date=upcoming`
    )
    .then(res => {
      // console.log(res);
      body = res.data;
      // let iterator = body.keys();
      // for (let key of iterator) {
      //   console.log(key);
      // }

      for (let item in body) {
        const vName = body[item].venue.name;
        const vLocation = `${body[item].venue.city}, ${body[item].venue.region}`;
        const vDate = body[item].datetime;
        console.log(`Where: ${vName}\nLocation: ${vLocation}\nDate: ${moment(vDate).format('MM/DD/YYYY')}\n`)

      }
    });
}

OPERATOR[operation];
