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
    host = 'ajc.com', limit = '10', arcSite = 'ajc',
  } = query;
  let { section = '' } = query;
  const { chartbeat } = getProperties(arcSite);
  const { blacklist } = chartbeat;
  let requestUri = `https://api.chartbeat.com/live/toppages/v3/?apikey=${CHARTBEAT_KEY}&types=1&host=${host}&limit=${limit}`;

  let newUri = requestUri;
  requestUri += section ? `&section=${section}` : '';

  const promiseData = axios
    .get(requestUri)
    .then(({ data }) => {
      if (!section || (data && data.pages && titleCheck(data, data.pages.length))) {
        // keep initial existing data that matches the user's input
        const newArray = filterMostRead(data, host, blacklist);
        // grab the primary section if any
        const primarySection = `/${section.split('/')[1]}`;
        // check if the user's section input has secondary section
        if (primarySection && primarySection !== section && newArray.length < 5) {
          section = primarySection;
          newUri += section ? `&section=${section}` : '';
          return axios.get(newUri).then(({ data: siteData }) => {
            // update the array with the seconday data from the primary section if any
            newArray.push(...filterMostRead(siteData, host, blacklist));
            return newArray;
          });
        }
        return newArray;
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
