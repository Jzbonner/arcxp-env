import axios from 'axios';
import pick from 'lodash/pick';
import getProperties from 'fusion:properties';
import { CHARTBEAT_KEY, CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import filterMostRead from './helper_functions/filterMostRead';
import titleCheck from './helper_functions/titleCheck';
import fetchEnv from '../../components/_helper_components/global/utils/environment';
import filter from '../filters/collectionApiFilter';

const ttl = 900;

const params = {
  section: 'text',
  host: 'text',
  limit: 'text',
  includeStoryContent: 'text',
};

const env = fetchEnv();


const fetch = (query = {}) => {
  const {
    host = 'ajc.com', limit = '10', arcSite = 'ajc', includeStoryContent,
  } = query;
  let { section = '' } = query;
  const { chartbeat } = getProperties(arcSite);
  const { blacklist } = chartbeat;
  // If env is not prod then host will be sandbox.ajc.com
  const hostBasedonEnv = `${env !== 'prod' && host.indexOf('sandbox') === -1 ? 'sandbox.' : ''}${host}`;
  let requestUri = `https://api.chartbeat.com/live/toppages/v3/?apikey=${CHARTBEAT_KEY}&types=1&host=${hostBasedonEnv}&limit=${limit}`;
  let newUri = requestUri;
  requestUri += section ? `&section=${section}` : '';
  const fetchStoryData = includeStoryContent !== '';

  let mostReadContent = [];

  const promiseData = axios
    .get(requestUri)
    .then(({ data }) => {
      if (!section || (data && data.pages && titleCheck(data, data.pages.length))) {
        // keep initial existing data that matches the user's input
        const newArray = filterMostRead(data, hostBasedonEnv, blacklist);
        // grab the primary section if any
        const primarySection = section && `/${section.split('/')[1]}`;
        // check if the user's section input has secondary section
        if (primarySection && primarySection !== section && newArray && titleCheck(newArray, newArray.length, true)) {
          section = primarySection;
          newUri += section ? `&section=${section}` : '';
          return axios.get(newUri).then(({ data: siteData }) => {
            // update the array with the seconday data from the primary section if any
            newArray.push(...filterMostRead(siteData, hostBasedonEnv, blacklist));
            return newArray;
          });
        }
        return newArray;
      }
      return filterMostRead(data, hostBasedonEnv, blacklist);
    })
    .then((data) => {
      mostReadContent = [...data];
      if (Array.isArray(data) && fetchStoryData) {
        const urls = [];
        data.map((element) => {
          const pathStart = element?.path.indexOf('/') || 0;
          const path = element?.path.substr(pathStart) || null;
          return urls.push(path);
        });
        if (urls.length) {
          return axios.get(`${CONTENT_BASE}/content/v4/urls?website=${arcSite}&website_urls=${urls.toString()}`, {
            headers: {
              Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
            },
          }).then(({ data: finalData }) => {
            const { content_elements: contentElements = [] } = finalData || {};
            if (fetchStoryData && contentElements.length) {
              const mostReadWithArcData = mostReadContent.map((element, i) => {
                const pathStart = element?.path.indexOf('/') || 0;
                const path = element?.path.substr(pathStart) || null;
                // checking the paths and merging the two array
                if (path && contentElements[i] && contentElements[i].canonical_url === path) {
                  const storyEl = pick(contentElements[i], filter);
                  return Object.assign({}, element, storyEl);
                }
                return element;
              });
              return mostReadWithArcData;
            }
            return mostReadContent;
          });
        }
      }
      return mostReadContent;
    })
    .catch((error) => {
      /* eslint-disable no-console */
      console.error('Error: ', error);
    });
  return promiseData;
};

export default {
  fetch,
  params,
  ttl,
};
