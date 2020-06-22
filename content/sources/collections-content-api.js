/* eslint-disable no-console */
import GetCollectionData from './helper_functions/GetCollectionData';
import StoryData from './helper_functions/getStoryData';

const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
  from: 'text',
  size: 'text',
};

const fetch = (query) => {
  const {
    arcSite = 'ajc',
    id,
    size = 12,
  } = query;

  if (id) {
    return GetCollectionData(arcSite, id, size)
      .then(data => StoryData(arcSite, data))
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
