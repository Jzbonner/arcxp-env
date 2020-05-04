/* eslint-disable no-console */
import { CONTENT_BASE } from 'fusion:environment';
import axios from 'axios';
import AddFirstInlineImageToContentElements from './helper_functions/AddFirstImage';

const schemaName = 'query-feed';
const bodybuilder = require('bodybuilder');

const params = {
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

export const itemsToArray = (itemString = '') => itemString.split(',').map(item => item.replace(/\s/g, ''));

const fetch = (query) => {
  const {
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
    arcSite = 'ajc',
    currentDisplayClass = '',
    displayClassesRequiringImg = [],
  } = query;

  const builder = bodybuilder();
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
        builder.andQuery('term', 'taxonomy.tags.text', tag);
      });
    } else {
      const tags = itemsToArray(includeTags);
      builder.andQuery('terms', 'taxonomy.tags.text', tags);
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
    builder.notQuery('terms', 'taxonomy.tags.text', tags);
  }
  const body = builder.build();
  const newBody = JSON.stringify(body);
  const requestUri = `${CONTENT_BASE}/content/v4/search/published?body=${newBody}&website=ajc`;

  return axios
    .get(requestUri)
    .then(({ data }) => {
      if (displayClassesRequiringImg.some(requiredClass => requiredClass === currentDisplayClass)) {
        return AddFirstInlineImageToContentElements(data, arcSite);
      }
      return data;
    })
    .catch((error) => {
      console.error(error);
    });
};

export default {
  schemaName,
  fetch,
  params,
};
