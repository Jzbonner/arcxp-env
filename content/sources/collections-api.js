/* eslint-disable no-console */
import AddFirstInlineImage from './helper_functions/AddFirstInlineImage';
import FilterElements from './helper_functions/FilterElements';
import GetCollectionData from './helper_functions/GetCollectionData';

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
    displayClass = '',
    displayClassesRequiringImg = [],
  } = query;
  const activeSite = arcSite || arcSiteAlt;

  if (!activeSite) return [];

  if (id) {
    return GetCollectionData(activeSite, id, size)
      .then(data => AddFirstInlineImage(data, activeSite, displayClass, displayClassesRequiringImg))
      .then(data => FilterElements(data, displayClass, displayClassesRequiringImg))
      .catch((error) => {
        console.error(error);
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
