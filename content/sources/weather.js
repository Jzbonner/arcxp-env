/* eslint-disable no-console */
import axios from 'axios';

const { weatherAlertsAPIkey } = require('../../environment/index');

const params = {
  endpoint: 'text',
  lookup: 'text',
};

const fetch = (query) => {
  const { endpoint, lookup } = query;

  if (!endpoint || !lookup || !weatherAlertsAPIkey) {
    return null;
  }

  const weatherAPIlink = `https://services.coxnewspapers.com/weather/${endpoint}?${lookup}`;
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
