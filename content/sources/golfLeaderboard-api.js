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
  const golfLeaderboardAPILink = `https://dry-falls-89182.herokuapp.com/https://api.sportradar.us/golf/trial/${golfTour}/${sportradarAPIVersion}/en/${year}/tournaments/${tournamentId}/leaderboard.json?api_key=${sportradarAPIkey}`;
  // const golfLeaderboardAPILink = `https://dry-falls-89182.herokuapp.com/https://api.sportradar.us/golf/trial/pga/v3/en/2020/tournaments/6ba4893c-c82e-4269-a0ab-c99a05c854a8/leaderboard.json?api_key=96bba2r5x2v8x5vsfkgzq5r`;

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
