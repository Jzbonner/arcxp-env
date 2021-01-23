import { CHARTBEAT_KEY } from 'fusion:environment';
import axios from 'axios';


const ttl = 100;

const params = {
  section: 'text',
  host: 'text',
  limit: 'text',
};

const fetch = (query = {}) => {
  const { host, section = '', limit = '5' } = query;

  let requestUri = `https://api.chartbeat.com/live/toppages/v3/?apikey=${CHARTBEAT_KEY}&types=1&host=${host}`;
  const newUri = `${requestUri}&limit=6`;
  requestUri += section ? `&section=${section}` : '';
  requestUri += limit ? `&limit=${limit}` : '';

  const promiseData = axios.get(requestUri)
    .then(({ data }) => {
      if ((!section) || (data && data.pages && data.pages.length < 5)) {
        return axios.get(newUri)
          .then(({ data: siteData }) => {
            let { pages: pageData } = siteData;
            pageData = pageData.filter(page => page.stats.type === 'Article');
            return pageData;
          });
      }
      return data;
    })
    .catch(error => error);
  return promiseData;
};

export default {
  fetch,
  params,
  ttl,
};
