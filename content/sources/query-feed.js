/* eslint-disable no-console */
import AddFirstInlineImage from './helper_functions/AddFirstInlineImage';
import FilterElements from './helper_functions/FilterElements';
import FetchResizedImages from './helper_functions/FetchResizedImages';
import getQueryData from './helper_functions/getQueryData';
import getImageRequirements from './helper_functions/getImageRequirements';
import FilterGallery from './helper_functions/filterRssGallery';

const schemaName = 'query-feed';
const bodybuilder = require('bodybuilder');

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
    daysBack,
    includeDistributor = '',
    excludeDistributor = '',
    includeSections = '',
    excludeSections = '',
    includeContentTypes = '',
    excludeContentTypes = '',
    mustIncludeAllTags = '',
    includeTags = '',
    excludeTags = '',
    includeSubtypes = '',
    excludeSubtypes = '',
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
  } = query;

  const activeSite = arcSite || arcSiteAlt;

  if (!activeSite) return [];

  const requiresImageEveryX = getImageRequirements(displayClass, displayClassesRequiringImg);

  const builder = bodybuilder();
  if (daysBack) {
    builder.andQuery('range', 'display_date', {
      gte: `now-${daysBack}d/d`,
    });
  } else {
    builder.andQuery('range', 'display_date', {
      gte: 'now-30d/d',
    });
  }
  if (includeDistributor) {
    const distributors = itemsToArray(includeDistributor);
    builder.andQuery('terms', 'distributor.reference_id', distributors);
  }
  if (includeContentTypes) {
    const types = itemsToArray(includeContentTypes);
    builder.andQuery('terms', 'type', types);
  }
  if (includeSubtypes) {
    const subtypes = itemsToArray(includeSubtypes);
    builder.andQuery('terms', 'subtype', subtypes);
  }
  if (includeSections) {
    const sections = itemsToArray(includeSections);
    builder.andQuery('nested', { path: 'taxonomy.sections' }, b => b.query('terms', 'taxonomy.sections._id', sections));
  }
  if (includeTags) {
    if (mustIncludeAllTags && mustIncludeAllTags.toLowerCase() === 'yes') {
      const tags = itemsToArray(includeTags);
      tags.forEach((tag) => {
        builder.andQuery('term', 'taxonomy.tags.text.raw', tag);
      });
    } else {
      const tags = itemsToArray(includeTags);
      builder.andQuery('terms', 'taxonomy.tags.text.raw', tags);
    }
  }
  if (excludeDistributor) {
    const distributors = itemsToArray(excludeDistributor);
    builder.notQuery('terms', 'distributor.reference_id', distributors);
  }
  if (excludeContentTypes) {
    const types = itemsToArray(excludeContentTypes);
    builder.notQuery('terms', 'type', types);
  }
  if (excludeSubtypes) {
    const subtypes = itemsToArray(excludeSubtypes);
    builder.notQuery('terms', 'subtype', subtypes);
  }
  if (excludeSections) {
    const sections = itemsToArray(excludeSections);
    builder.notQuery('nested', { path: 'taxonomy.sections' }, b => b.query('terms', 'taxonomy.sections._id', sections));
  }
  if (excludeTags) {
    const tags = itemsToArray(excludeTags);
    builder.notQuery('terms', 'taxonomy.tags.text.raw', tags);
  }
  const body = builder.build();
  const newBody = JSON.stringify(body);

  return getQueryData(activeSite, newBody, from, size, useFetch)
    .then(data => AddFirstInlineImage(data, displayClass, displayClassesRequiringImg))
    .then(data => FilterElements(data, requiresImageEveryX))
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
