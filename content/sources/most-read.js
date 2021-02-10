import axios from 'axios';
import getProperties from 'fusion:properties';
import { CHARTBEAT_KEY } from 'fusion:environment';
import filterMostRead from './helper_functions/filterMostRead';
import titleCheck from './helper_functions/titleCheck';

const ttl = 900;

const params = {
  section: 'text',
  host: 'text',
  limit: 'text',
};

const fetch = (query = {}) => {
  const {
    host = 'ajc.com', section = '', limit = '10', arcSite = 'ajc',
  } = query;
  const { chartbeat } = getProperties(arcSite);
  const { blacklist } = chartbeat;
  let requestUri = `https://api.chartbeat.com/live/toppages/v3/?apikey=${CHARTBEAT_KEY}&types=1&host=${host}&limit=${limit}`;

  const newUri = requestUri;
  requestUri += section ? `&section=${section}` : '';

  const promiseData = axios.get(requestUri)
    .then(({ data }) => {
      if ((!section) || (data && data.pages && titleCheck(data, data.pages.length))) {
        return axios.get(newUri)
          .then(({ data: siteData }) => filterMostRead(siteData, host, blacklist));
      }
      return filterMostRead(data, host, blacklist);
    })
    .catch((error) => {
      console.error('Error: ', error);
    });
  return promiseData;
};

export default {
  fetch,
  params,
  ttl,
};
