import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import filterAuthorsBySite from './filterAuthorBySite';

const fetchAllStaffData = () => {
  const requestUri = '/author/v1/author-service/';
  let apiData = null;
  let filteredAllStaffData = null;

  // eslint-disable-next-line no-unused-vars
  const promise = fetch(requestUri, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
    },
  }).then(response => response.json())
    .then((data) => {
      apiData = data;
      console.log('apiData - fetchAllStaffData', apiData);
      filteredAllStaffData = filterAuthorsBySite(apiData);
    })
    .catch((error) => {
      console.log('FETCH API CATCH - fetchAllStaffData =>', error);
    });

  return filteredAllStaffData;
};

export default fetchAllStaffData;
