import axios from 'axios';
import getProperties from 'fusion:properties';
import { CHARTBEAT_KEY, CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import filterMostRead from './helper_functions/filterMostRead';
import titleCheck from './helper_functions/titleCheck';

const ttl = 900;

const params = {
  section: 'text',
  host: 'text',
  limit: 'text',
  includeStoryContent: 'checkbox',
};


const fetch = (query = {}) => {
  const {
    host = 'ajc.com', limit = '10', arcSite = 'ajc', includeStoryContent = false,
  } = query;
  const { siteDomainURL } = getProperties(arcSite);
  let { section = '' } = query;
  const { chartbeat } = getProperties(arcSite);
  const { blacklist } = chartbeat;
  let requestUri = `https://api.chartbeat.com/live/toppages/v3/?apikey=${CHARTBEAT_KEY}&types=1&host=${host}&limit=${limit}`;

  let newUri = requestUri;
  requestUri += section ? `&section=${section}` : '';

  let mostReadContent = [];

  const promiseData = axios
    .get(requestUri)
    .then(({ data }) => {
      if (!section || (data && data.pages && titleCheck(data, data.pages.length))) {
        // keep initial existing data that matches the user's input
        const newArray = filterMostRead(data, host, blacklist);
        // grab the primary section if any
        const primarySection = `/${section.split('/')[1]}`;
        // check if the user's section input has secondary section
        if (primarySection && primarySection !== section && titleCheck(newArray, newArray.length, true)) {
          section = primarySection;
          newUri += section ? `&section=${section}` : '';
          return axios.get(newUri).then(({ data: siteData }) => {
            // update the array with the seconday data from the primary section if any
            newArray.push(...filterMostRead(siteData, host, blacklist));
            return newArray;
          });
        } if (primarySection && primarySection === section && section !== '' && titleCheck(newArray, newArray.length, true)) {
          section = '';
          newUri += section ? `&section=${section}` : '';
          return axios.get(newUri).then(({ data: siteData }) => {
            // update the array with general data if the primary section has less than 5 results
            newArray.push(...filterMostRead(siteData, host, blacklist));
            return newArray;
          });
        }
        return newArray;
      }
      return filterMostRead(data, host, blacklist);
    })
    .then((data) => {
      mostReadContent = [...data];
      if (Array.isArray(data) && includeStoryContent === '') {
        const urls = [];
        data.map((element) => {
          const path = element && element.path && element.path.replace(host, `${siteDomainURL}`);
          return urls.push(path);
        });
        const contentRequestUri = `${CONTENT_BASE}/content/v4/urls?website=${arcSite}`;
        return axios.post(contentRequestUri, urls, {
          headers: {
            Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
          },
        });
      }
      return data;
    })
    .then(({ data }) => {
      if (includeStoryContent === '') {
      /* eslint-disable camelcase */
        const { content_elements } = data;
        const mostReadWithArcData = mostReadContent.map((element, i) => {
          const path = element && element.path && `${element.path.split(host)[1]}`;
          // checking the id's and merging the two array
          if (path && content_elements[i] && content_elements[i].website_url !== undefined && path === content_elements[i].website_url) {
            return Object.assign({}, element, content_elements[i]);
          }
          return element;
        });
        return mostReadWithArcData;
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
