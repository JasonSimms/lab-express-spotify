const express = require("express");
const hbs = require("hbs");
const app = express();
const SpotifyWebApi = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// Remember to paste here your credentials
const clientId = "b5dc1adf84da4add925111592841d958",
  clientSecret = "82f195523c1c47fb8deb5bc506fb595a";

const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant().then(
  function(data) {
    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function(err) {
    console.log("Something went wrong when retrieving an access token", err);
  }
);

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/", (req, res, next) => {
  res.render("home");
});

app.get("/artists", (req, res) => {
  console.log("query activated");
  // const { artist } = req.query;
  // const query = req.query.artist
  console.log('query:',req.query.artist)
  //? { artist: { $regex: new RegExp('^' + artist + '.*', 'i') } } : {}
  spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8'])
  .then(function(data) {
    console.log('Artists information', data.body.artists);
    res.render("artists", { data, title: "artist list" });
  }, function(err) {
    console.error(err);
  });
  // spotifyApi.searchArtists(req.query.artist)
  // .then(function(data) {
  //   console.log(data.body.artists.items[0]);
  //   // res.send(data.body.artists.items)
  //   res.render("artists", { data, title: "artist list" });
  // }, function(err) {
  //   console.error(err);
  // })
});


// app.get("/beer", (req, res, next) => {
//   // const beer1 = punkAPI.getBeer();
//   // console.log(beer1);
//   punkAPI
//     .getBeers()
//     .then(beers => {
//       // console.log(beers);
//       res.render("beer", { beers, title: "Beer List" });
//     })
//     .catch(error => {
//       console.log(error);
//     });
// });


app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

