import axios from 'axios';
import {
  SOPHI_CLIENT_ID, SOPHI_CLIENT_SECRET, SOPHI_TOKEN_URL, SOPHI_TOKEN_AUDIENCE,
} from 'fusion:environment';

export default async () => axios
  .post(SOPHI_TOKEN_URL, {
    client_id: SOPHI_CLIENT_ID,
    client_secret: SOPHI_CLIENT_SECRET,
    audience: SOPHI_TOKEN_AUDIENCE,
    grant_type: 'client_credentials',
  })
  .then(({ data }) => data)
  .catch(err => console.error(err));
