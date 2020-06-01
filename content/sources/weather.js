/* eslint-disable no-console */
import axios from 'axios';

const { weatherAlertsAPIkey } = require('../../environment/index');

const params = {
  zones: 'text',
};

const fetch = (query) => {
  const { zones } = query;
  if (!zones || !weatherAlertsAPIkey) {
    return null;
  }
  const weatherAPIlink = `https://services.coxnewspapers.com/weather/alerts?zones=${zones}`;
  return axios
    .get(weatherAPIlink, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': `${weatherAlertsAPIkey}`,
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
};

export default {
  fetch,
  params,
};
