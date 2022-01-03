/* eslint-disable no-console */
import axios from 'axios';
import GetSophiBearerToken from './helper_functions/GetSophiBearerToken';

const fetch = async ({ page = 'politics', widget = 'topstories' }) => {
  const token = await GetSophiBearerToken();

  return axios
    .get(
      `https://site-automation-api.ml.sophi.works/curatedHosts/www.ajc.com/curator?page=${page}&widget=${widget}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    )
    .then(({ data }) => data)
    .catch((error) => {
      console.log('AXIOS CATCH - sophi => ', error);
    });
};

export default {
  fetch,
};
