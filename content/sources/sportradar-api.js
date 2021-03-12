/* eslint-disable eol-last */
/* eslint-disable no-console */
import axios from 'axios';

const { sportradarAPIkey, sportradarAPIVersion } = require('../../environment/index');

const params = {
  tour: 'text',
  year: 'text',
};

const fetch = (query) => {
  const { tour, year } = query;

  if (!tour || !year || !sportradarAPIkey || !sportradarAPIVersion) {
    return null;
  }

  const sportradarAPILink = `https://api.sportradar.us/${sportradarAPIVersion}/schedule/${tour}/${year}/tournaments/schedule.json?api_key=${sportradarAPIkey}`;

  return axios
    .get(sportradarAPILink, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
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