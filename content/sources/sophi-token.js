import axios from 'axios';
import {
  SOPHI_CLIENT_ID,
  SOPHI_CLIENT_SECRET,
  SOPHI_TOKEN_URL,
  SOPHI_TOKEN_AUDIENCE,
  SOPHI_PAYWALL_CLIENT_ID,
  SOPHI_PAYWALL_CLIENT_SECRET,
  SOPHI_PAYWALL_TOKEN_AUDIENCE,
} from 'fusion:environment';

const ttl = 86400; // 24 hour cache time
const serveStaleCache = false;

const params = {
  tokenType: 'text',
};

const fetch = (tokenType) => {
  // default creds are for sophi content
  let clientId = SOPHI_CLIENT_ID;
  let clientSecret = SOPHI_CLIENT_SECRET;
  let audience = SOPHI_TOKEN_AUDIENCE;

  if (tokenType === 'paywall') {
    // but we redefine creds with paywall values, when applicable
    clientId = SOPHI_PAYWALL_CLIENT_ID;
    clientSecret = SOPHI_PAYWALL_CLIENT_SECRET;
    audience = SOPHI_PAYWALL_TOKEN_AUDIENCE;
  }

  return axios
    .post(
      SOPHI_TOKEN_URL, {
        client_id: clientId,
        client_secret: clientSecret,
        audience,
        grant_type: 'client_credentials',
      },
    )
    .then(({ data }) => data)
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export default {
  fetch,
  params,
  ttl,
  serveStaleCache,
};
