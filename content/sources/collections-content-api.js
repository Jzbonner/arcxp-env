/* eslint-disable no-console */
import GetCollectionData from './helper_functions/GetCollectionData';
import StoryData from './helper_functions/getStoryData';
import FilterGallery from './helper_functions/filterRssGallery';

const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
  from: 'number',
  size: 'number',
};

const fetch = (query) => {
  const {
    'arc-site': arcSiteAlt, // 'arc-site' comes from globalContentConfig
    arcSite,
    id,
    from,
    size = 12,
  } = query;

  const activeSite = arcSite || arcSiteAlt;

  if (id) {
    return GetCollectionData(activeSite, id, size, from)
      .then(data => StoryData(activeSite, data))
      .then(data => FilterGallery(data))
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
