/* eslint-disable no-console */
import axios from 'axios';

import { WEATHER_ALERTS_KEY } from 'fusion:environment';

const params = {
  endpoint: 'text',
  lookup: 'text',
};

const fetch = (query) => {
  const { endpoint, lookup } = query;

  if (!endpoint || !lookup || !WEATHER_ALERTS_KEY) {
    return null;
  }

  const weatherAPIlink = `https://services.coxnewspapers.com/weather/${endpoint}?${lookup}`;
  return axios
    .get(weatherAPIlink, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': `${WEATHER_ALERTS_KEY}`,
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error('AXIOS CATCH - weather => ', error);
      return error;
    });
};

export default {
  fetch,
  params,
};
