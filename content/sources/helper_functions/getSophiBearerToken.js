import axios from 'axios';
import { SOPHI_CLIENT_ID, SOPHI_CLIENT_SECRET } from 'fusion:environment';
import fetchEnv from '../../../components/_helper_components/global/utils/environment';

export default async () => {
  const currentEnv = fetchEnv();

  return axios
    .post(`https://${currentEnv === 'prod' ? 'login.sophi.io' : 'sophi-works.auth0.com'}/oauth/token`, {
      client_id: SOPHI_CLIENT_ID,
      client_secret: SOPHI_CLIENT_SECRET,
      audience: currentEnv === 'prod' ? 'https://api.sophi.io' : 'https://api.sophi.works',
      grant_type: 'client_credentials',
    })
    .then(({ data }) => data)
    .catch(err => console.log(err));
};
