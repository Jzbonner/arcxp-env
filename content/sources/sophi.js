/* eslint-disable no-console */
import axios from 'axios';
import GetSophiBearerToken from './helper_functions/getSophiBearerToken.js';

const ttl = 120;

const params = {
  page: 'text',
  widget: 'text',
};

const fetch = async ({ page, widget }, { cachedCall }) => {
  const token = await cachedCall(
    'authentication',
    GetSophiBearerToken,
    { ttl: 86400, independent: true },
  );

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
  params,
  fetch,
  ttl,
};
