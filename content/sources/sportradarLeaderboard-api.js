import axios from 'axios';

const { sportradarAPIkey, sportradarAPIVersion } = require('../../environment/index');

console.log('sportradarAPIkey: ');
console.log(sportradarAPIkey);

const params = {
  golfTour: 'text',
  year: 'text',
  tournamentId: 'text',
};

const fetch = (query) => {
  const { golfTour, year, tournamentId } = query;

  if (!golfTour || !year || !tournamentId || !sportradarAPIkey || !sportradarAPIVersion) {
    return null;
  }

  const golfLeaderboardAPILink = `https://api.sportradar.us/golf/trial/${golfTour}/${sportradarAPIVersion}/en/${year}/tournaments/${tournamentId}/leaderboard.json?api_key=${sportradarAPIkey}`;

  console.log(golfLeaderboardAPILink);

  return axios
    .get(golfLeaderboardAPILink, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.log('AXIOS CATCH - golfLeaderboard-api => ', error);
    });
};

export default {
  fetch,
  params,
};
