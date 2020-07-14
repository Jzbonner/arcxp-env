/* eslint-disable no-console */
import axios from 'axios';

const fetch = (query) => {
  const { url } = query;
  return axios
    .get(url)
    .then(({ data }) => data)
    .catch((error) => {
      console.log('AXIOS CATCH - widget => ', error);
    });
};

export default {
  fetch,
};
