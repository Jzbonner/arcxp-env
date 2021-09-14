const bodybuilder = require('bodybuilder');

const itemsToArray = (itemString = '') => itemString.split(',').map(item => item.replace(/^\s+/g, ''));

const buildBodyFromQuery = (query) => {
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
  } = query;

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
  return JSON.stringify(body);
};

export default buildBodyFromQuery;
