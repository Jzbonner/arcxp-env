/* eslint-disable no-console */
import axios from 'axios';

const fetch = () => {
  const widgetURL = 'https://events.ajc.com/api/v1/streams?guid=methode-search-widget';
  return axios
    .get(widgetURL, {
      headers: {
        Accept: 'application/x-javascript',
        'Content-Type': 'application/x-javascript',
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
};

export default {
  fetch,
};
