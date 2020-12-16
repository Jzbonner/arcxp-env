/* eslint-disable no-console */
import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';


const getSiteData = async (query = {}) => {
  const {
    'arc-site': arcSite = 'ajc', type = 'navigation', hierarchy = 'default', section,
  } = query;

  console.log('siteDataQuery', query);

  // let siteData = null;

  const promiseArray = [];

  if (!query) return null;

  const endpoint = `${CONTENT_BASE}/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;

  // console.log('endpoint', endpoint);

  const requestUri = section ? `${endpoint}&_id=${section}` : endpoint;

  console.log('requestUri', requestUri);

  fetch(requestUri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  })
    .then(response => response.json())
    .then((data) => {
      //console.log('consssollleeee data', data);
      promiseArray.push(data);
    });

  return Promise.all(promiseArray).then(() => promiseArray);

  // console.log('promiseResponse', promiseResponse);
};

export default getSiteData;
