import { CHARTBEAT_KEY } from 'fusion:environment';
import axios from 'axios';
import _ from 'lodash';
import getProperties from 'fusion:properties';
import filter from '../filters/most-read';


const ttl = 100;

const params = {
  section: 'text',
  host: 'text',
  limit: 'text',
};

const fetch = (query = {}) => {
  const {
    host, section = '', limit = '10', arcSite = 'ajc',
  } = query;

  const { chartbeat } = getProperties(arcSite);
  const { blacklist } = chartbeat;
  let requestUri = `https://api.chartbeat.com/live/toppages/v3/?apikey=${CHARTBEAT_KEY}&types=1&host=${host}&limit=${limit}`;
  const newUri = requestUri;
  requestUri += section ? `&section=${section}` : '';

  const promiseData = axios.get(requestUri)
    .then(({ data }) => {
      if ((!section) || (data && data.pages && data.pages.length < 5)) {
        return axios.get(newUri)
          .then(({ data: siteData }) => {
            // / TURN INTO FUNCTION AND ALSO USE OUTSIDE OF IF STATEMENT//
            let { pages: pageData } = siteData;
            pageData = pageData.filter(
              page => !blacklist.some(listItem => `${host}${listItem.uri}` === page.path),
            );
            return pageData.map(el => _.pick(el, filter));
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
