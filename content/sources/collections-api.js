/* eslint-disable no-console */
import pick from 'lodash.pick';
import AddFirstInlineImage from './helper_functions/AddFirstInlineImage';
import FilterElements from './helper_functions/FilterElements';
import GetCollectionData from './helper_functions/GetCollectionData';
import FetchResizedImages from './helper_functions/FetchResizedImages';
import filter from '../filters/collectionApiFilter';

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
    size = 12,
    displayClass = '',
    displayClassesRequiringImg = [],
    width = 500,
    height = 282,
    useSrcSet = false,
    srcSetSizes = [],
  } = query;
  const activeSite = arcSite || arcSiteAlt;

  if (!activeSite) return [];

  if (id) {
    return GetCollectionData(activeSite, id, size)
      .then(data => AddFirstInlineImage(data, displayClass, displayClassesRequiringImg))
      .then(data => FilterElements(data, displayClass, displayClassesRequiringImg))
      .then(data => FetchResizedImages(activeSite, data, width, height, useSrcSet, srcSetSizes))
      .then(data => data.map(el => pick(el, filter)))
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
