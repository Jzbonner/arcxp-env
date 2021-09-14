/* eslint-disable no-console */
import AddFirstInlineImage from './helper_functions/AddFirstInlineImage';
import FilterElements from './helper_functions/FilterElements';
import FetchResizedImages from './helper_functions/FetchResizedImages';
import getQueryData from './helper_functions/getQueryData';
import getImageRequirements from './helper_functions/getImageRequirements';
import FilterGallery from './helper_functions/filterRssGallery';
import buildBodyFromQuery from './helper_functions/buildBodyFromQuery';

const schemaName = 'query-feed';

const ttl = 120;

const params = {
  daysBack: 'number',
  from: 'number',
  size: 'number',
  includeDistributor: 'text',
  includeContentTypes: 'text',
  includeSections: 'text',
  mustIncludeAllTags: 'text',
  includeTags: 'text',
  includeSubtypes: 'text',
  excludeDistributor: 'text',
  excludeContentTypes: 'text',
  excludeSections: 'text',
  excludeTags: 'text',
  excludeSubtypes: 'text',
};

export const itemsToArray = (itemString = '') => itemString.split(',').map(item => item.replace(/^\s+/g, ''));

const fetch = (query) => {
  const {
    arcSite,
    'arc-site': arcSiteAlt,
    size = 10,
    from = 0,
    displayClass = '',
    displayClassesRequiringImg = [],
    useFetch = false,
    width = 500,
    height = 282,
    useSrcSet = false,
    srcSetSizes = [],
    squareImageSize,
    useSquareImageAfter,
    feature,
  } = query;

  const activeSite = arcSite || arcSiteAlt;

  if (!activeSite) return [];

  const requiresImageEveryX = getImageRequirements(displayClass, displayClassesRequiringImg);

  const newBody = buildBodyFromQuery(query);

  return getQueryData(activeSite, newBody, from, size, useFetch)
    .then(data => AddFirstInlineImage(data, displayClass, displayClassesRequiringImg))
    .then(data => FilterElements(data, requiresImageEveryX, feature))
    .then(data => data.slice(0, size))
    .then(data => FetchResizedImages(activeSite, data, width, height, useSrcSet, srcSetSizes, squareImageSize, useSquareImageAfter))
    .then(data => FilterGallery(data))
    .catch((error) => {
      console.error(error);
    });
};

export default {
  schemaName,
  fetch,
  params,
  ttl,
};
