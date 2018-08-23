const SpotifyWebApi = require('spotify-web-api-node');

// Remember to paste here your credentials
const clientId = 'b5dc1adf84da4add925111592841d958', // TO CHANGE
    clientSecret = '82f195523c1c47fb8deb5bc506fb595a'; // TO CHANGE 

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});