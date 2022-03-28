import axios from 'axios';
import {
  SOPHI_PAYWALL_CLIENT_ID,
  SOPHI_PAYWALL_CLIENT_SECRET,
  SOPHI_TOKEN_URL,
  SOPHI_PAYWALL_TOKEN_AUDIENCE,
} from 'fusion:environment';

export default async () => axios
  .post(SOPHI_TOKEN_URL, {
    client_id: SOPHI_PAYWALL_CLIENT_ID,
    client_secret: SOPHI_PAYWALL_CLIENT_SECRET,
    audience: SOPHI_PAYWALL_TOKEN_AUDIENCE,
    grant_type: 'client_credentials',
  })
  .then(({ data }) => data)
  .catch((error) => {
    console.error('AXIOS CATCH - get Sophi paywall token =>', error?.response?.data);
    return error;
  });
