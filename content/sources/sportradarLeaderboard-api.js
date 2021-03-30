import axios from 'axios';

const { sportradarAPIkey, sportradarAPIVersion, sportradarAccessLevel } = require('../../environment/index');

const params = {
  tour: 'text',
  year: 'text',
};

const fetch = (query) => {
  const { tour, year } = query;

  if (!tour || !year || !sportradarAPIkey || !sportradarAPIVersion) {
    return null;
  }

  const golfLeaderboardAPILink = `https://api.sportradar.us/golf/${sportradarAccessLevel}/${tour}/${sportradarAPIVersion}/en/${year}/tournaments/e8d09c79-21e7-4c40-bde4-9f3f3a1e9d65/leaderboard.json?api_key=${sportradarAPIkey}`;

  return axios
    .get(golfLeaderboardAPILink, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.log('AXIOS CATCH - sportradarLeaderboard-api => ', error);
    });
};

export default {
  fetch,
  params,
};
