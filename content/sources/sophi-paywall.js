/* eslint-disable no-console */
import axios from 'axios';
import { SOPHI_PAYWALL_ENDPOINT } from 'fusion:environment';
import GetSophiPaywallBearerToken from './helper_functions/getSophiPaywallBearerToken.js';

const ttl = 0;

const params = {
  ids: 'text',
};

const fetch = async ({ ids }, { cachedCall }) => {
  const token = await cachedCall(
    'sophi bearer token',
    GetSophiPaywallBearerToken,
    { ttl: 86400, independent: true },
  );

  if (!ids) return null;

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
    .then(({ data }) => data.map((resp) => {
      if (!resp) {
        throw new Error(`SOPHI ERROR - Sophi paywall status for ${idString} is unavailable or empty.  Endpoint: ${SOPHI_PAYWALL_ENDPOINT}.  Token: ${token}.`);
      }

      return resp?.paywallStatus;
    }))
    .catch((error) => {
      console.error(`AXIOS CATCH - get Sophi paywall status for ${idString} =>`, error?.response?.data);
      return error;
    });
};

export default {
  fetch,
  params,
  ttl,
};
