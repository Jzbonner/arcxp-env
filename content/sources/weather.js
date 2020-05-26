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
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': `${weatherAlertsAPIkey}`,
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
};

export default {
  fetch,
  params,
};
