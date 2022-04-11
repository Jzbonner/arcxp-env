/* eslint-disable no-console */
import axios from 'axios';
import { SOPHI_PAYWALL_ENDPOINT } from 'fusion:environment';
import sophiToken from './sophi-token';

const ttl = 21600; // 6 hour cache time
const serveStaleCache = false;
const backoff = {
  enabled: false,
};

const params = {
  ids: 'text',
};

const fetch = async ({ ids }) => {
  const token = await sophiToken.fetch('paywall');

  const idString = typeof ids === 'object' ? ids.join(',') : ids;

  return axios
    .get(
      `${SOPHI_PAYWALL_ENDPOINT}?contentIds=${idString}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    )
    .then(({ data, status }) => {
      if (status !== 200 || !data) {
        throw new Error(`SOPHI ERROR - Sophi paywall status for ${idString} is unavailable or empty.  Endpoint: ${SOPHI_PAYWALL_ENDPOINT}.`);
      }
      return data.map(resp => resp?.paywallStatus);
    });
};

export default {
  fetch,
  params,
  ttl,
  serveStaleCache,
  backoff,
};
