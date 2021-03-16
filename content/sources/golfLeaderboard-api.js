import axios from 'axios';

const { sportradarAPIkey, sportradarAPIVersion } = require('../../environment/index');

const params = {
  golfTour: 'text',
  year: 'text',
  tournamentId: 'text',
};

const fetch = (query) => {
  const { golfTour, year, tournamentId } = query;

  if (!golfTour || !year || !sportradarAPIkey || !sportradarAPIVersion) {
    return null;
  }
  const golfLeaderboardAPILink = `https://api.sportradar.us/golf/trial/${golfTour}/${sportradarAPIVersion}/en/${year}/tournaments/${tournamentId}/leaderboard.json?api_key=${sportradarAPIkey}`;

  return axios
    .get(golfLeaderboardAPILink, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.log('AXIOS CATCH - sportradar-api => ', error);
    });
};

export default {
  fetch,
  params,
};
