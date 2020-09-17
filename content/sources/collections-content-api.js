/* eslint-disable no-console */
import _ from 'lodash';
import GetCollectionData from './helper_functions/GetCollectionData';
import StoryData from './helper_functions/getStoryData';
import filter from '../filters/collectionFilter';

const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
  from: 'text',
  size: 'text',
};

const fetch = (query) => {
  const {
    'arc-site': arcSiteAlt, // 'arc-site' comes from globalContentConfig
    arcSite,
    id,
    size = 12,
  } = query;

  const activeSite = arcSite || arcSiteAlt;

  if (id) {
    return GetCollectionData(activeSite, id, size)
      .then(data => StoryData(activeSite, data))
      .then(data => data.map(el => _.pick(el, filter)))
      .catch((error) => {
        console.error('Error: ', error);
      });
  }
  return null;
};

export default {
  fetch,
  schemaName,
  ttl,
  params,
};
