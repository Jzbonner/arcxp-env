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

export const itemsToArray = (itemString = '') => itemString.split(',').map(item => item.replace(/"/g, ''));

const resolve = (query) => {
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
  } = query;

  const builder = bodybuilder();
  if (includeDistributor) {
    const distributors = itemsToArray(includeDistributor);
    distributors.forEach((distributor) => {
      builder.orQuery('term', 'distributor.reference_id', distributor);
    });
  }
  if (includeContentTypes) {
    const types = itemsToArray(includeContentTypes);
    types.forEach((type) => {
      builder.orQuery('term', 'type', type);
    });
  }
  if (includeSubtypes) {
    const subtypes = itemsToArray(includeSubtypes);
    subtypes.forEach((subtype) => {
      builder.orQuery('term', 'subtype', subtype);
    });
  }
  if (includeSections) {
    const sections = itemsToArray(includeSections);
    sections.forEach((section) => {
      builder.orQuery('term', 'taxonomy.sections._id', section);
    });
  }
  if (includeTags) {
    if (mustIncludeAllTags.toLowerCase() === 'yes') {
      const tags = itemsToArray(includeTags);
      tags.forEach((tag) => {
        builder.andQuery('term', 'taxonomy.tags.text', tag);
      });
    } else {
      const tags = itemsToArray(includeTags);
      tags.forEach((tag) => {
        builder.orQuery('term', 'taxonomy.tags.text', tag);
      });
    }
  }
  if (excludeDistributor) {
    const distributors = itemsToArray(excludeDistributor);
    distributors.forEach((distributor) => {
      builder.notQuery('term', 'distributor.reference_id', distributor);
    });
  }
  if (excludeContentTypes) {
    const types = itemsToArray(excludeContentTypes);
    types.forEach((type) => {
      builder.notQuery('term', 'type', type);
    });
  }
  if (excludeSubtypes) {
    const subtypes = itemsToArray(excludeSubtypes);
    subtypes.forEach((subtype) => {
      builder.notQuery('term', 'subtype', subtype);
    });
  }
  if (excludeSections) {
    const sections = itemsToArray(excludeSections);
    sections.forEach((section) => {
      builder.notQuery('term', 'taxonomy.sections._id', section);
    });
  }
  if (excludeTags) {
    const tags = itemsToArray(includeTags);
    tags.forEach((tag) => {
      builder.notQuery('term', 'taxonomy.tags.text', tag);
    });
  }
  const body = builder.build();
  const newBody = JSON.stringify(body);
  console.log('BODY', newBody);

  return `/content/v4/search/published?body=${newBody}&website=ajc`;
};

export default {
  schemaName,
  resolve,
  params,
};
