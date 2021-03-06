/* eslint-disable no-console */
import pick from 'lodash/pick';
import AddFirstInlineImage from './helper_functions/AddFirstInlineImage';
import FilterElements from './helper_functions/FilterElements';
import GetCollectionData from './helper_functions/GetCollectionData';
import FetchResizedImages from './helper_functions/FetchResizedImages';
import getImageRequirements from './helper_functions/getImageRequirements';
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
    from,
    displayClass = '',
    displayClassesRequiringImg = [],
    width = 500,
    height = 282,
    useSrcSet = false,
    srcSetSizes = [],
    squareImageSize,
    useSquareImageAfter,
    excludeTheseStoryIds = [],
  } = query;
  const activeSite = arcSite || arcSiteAlt;

  if (!activeSite) return [];

  const requiresImageEveryX = getImageRequirements(displayClass, displayClassesRequiringImg);
  if (id) {
    return GetCollectionData(activeSite, id, size, from)
      .then(data => data.filter(story => excludeTheseStoryIds.every(excludedStoryId => excludedStoryId !== story?._id)))
      .then(data => AddFirstInlineImage(data, displayClass, displayClassesRequiringImg))
      .then(data => FilterElements(data, requiresImageEveryX))
      .then(data => data.slice(0, size))
      .then(data => FetchResizedImages(activeSite, data, width, height, useSrcSet, srcSetSizes, squareImageSize, useSquareImageAfter))
      .then(data => data.map(el => pick(el, filter)))
      .catch((error) => {
        console.error(error);
        return error;
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
