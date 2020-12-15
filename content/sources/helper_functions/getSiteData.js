/* eslint-disable no-console */
import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';


const getSiteData = (query = {}) => {
  const {
    'arc-site': arcSite = 'ajc', type = 'navigation', hierarchy = 'default', section,
  } = query;

  console.log('siteDataQuery', query);

  let siteData = null;

  if (!query) return null;

  const endpoint = `${CONTENT_BASE}/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;

  // console.log('endpoint', endpoint);

  const requestUri = section ? `${endpoint}&_id=${section}` : endpoint;

  console.log('requestUri', requestUri);

  const fetchResponse = fetch(requestUri, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      //console.log('consssollleeee data', data);
      return data;
    });

  siteData = fetchResponse;
  
  // console.log('siteData after fetch', siteData);

  /* const promise = axios
    .get(requestUri, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => {
      console.log('data', data);
      siteData = { ...data };
    })
    .catch((error) => {
      console.log('AXIOS CATCH - getSiteData => ', error);
    }); */


  return Promise.all([fetchResponse]).then(() => {
   // console.log('fetchy', fetchResponse);
    return fetchResponse;
  });
};

export default getSiteData;
