import getProperties from 'fusion:properties';
import axios from 'axios';

const params = {
  zones: 'text',
};
const { weatherAlertsAPIkey } = getProperties();

const fetch = (query) => {
  const { zones } = query;
  const weatherAPIlink = `https://services.coxnewspapers.com/weatheralerts?zones=${zones}`;
  return axios
    .get(weatherAPIlink, {
      headers: {
        Authorization: `x-api-key ${weatherAlertsAPIkey}`,
      },
    })
    .then((res) => {
      console.log('SOURCE RESPONSE', res);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  fetch,
  params,
};
