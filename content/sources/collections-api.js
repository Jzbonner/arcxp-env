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
  arcSite: 'text',
};

const fetch = (query) => {
  const {
    arcSite = 'ajc', id, from = 0, size = 12, displayClass = '', displayClassesRequiringImg = [],
  } = query;

  if (id) {
    return GetCollectionData(arcSite, id, size, from)
      .then(data => AddFirstInlineImage(data, arcSite, displayClass, displayClassesRequiringImg))
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
