const schemaName = 'query-feed';

const params = {
  includeSources: 'text',
  excludeSources: 'text',
  includeContentTypes: 'text',
  excludeContentTypes: 'text',
  includeSections: 'text',
  excludeSections: 'text',
  includeTags: 'text',
  excludeTags: 'text',
  includeSubtypes: 'text',
  exludeSubtypes: 'text',
};

export const itemsToArray = (itemString = '') => itemString.split(',').map(item => item.replace(/"/g, ''));

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc',
    includeSources = '',
    excludeSources = '',
    includeContentTypes = '',
    excludeContentTypes = '',
    includeSections = '',
    excludeSections = '',
    includeTags = '',
    excludeTags = '',
    includeSubtypes = '',
    exludeSubtypes = '',
  } = query;

  const sourcesIncluded = itemsToArray(includeSources);
  const souresExcluded = itemsToArray(excludeSources);

  const contentTypesIncluded = itemsToArray(includeContentTypes);
  const contentTypesExcluded = itemsToArray(excludeContentTypes);

  const sectionsIncluded = itemsToArray(includeSections);
  const sectionsExcluded = itemsToArray(excludeSections);

  const tagsIncluded = itemsToArray(includeTags);
  const tagsExcluded = itemsToArray(excludeTags);

  const subtypesIncluded = itemsToArray(includeSubtypes);
  const subtypesExcluded = itemsToArray(exludeSubtypes);

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              'revision.published': 'true',
            },
          },
          {
            nested: {
              path: ['taxonomy.sections', 'source', 'type', 'taxonomy.tags', 'type.subtype'],
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': sectionsIncluded,
                        source: sourcesIncluded,
                        type: contentTypesIncluded,
                        'taxonomy.tags': tagsIncluded,
                        'type.subtype': subtypesIncluded,
                      },
                    },
                    {
                      term: {
                        'taxonomy.sections._website': arcSite,
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
        must_not: [
          {
            nested: {
              path: ['taxonomy.sections', 'source', 'type', 'taxonomy.tags', 'type.subtype'],
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': sectionsExcluded,
                        source: souresExcluded,
                        type: contentTypesExcluded,
                        'taxonomy.tags': tagsExcluded,
                        'type.subtype': subtypesExcluded,
                      },
                    },
                    {
                      term: {
                        'taxonomy.sections._website': arcSite,
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
      },
    },
  };

  const encodedBody = encodeURI(JSON.stringify(body));

  return `/content/v4/search/published?body=${encodedBody}&website=${arcSite}`;
};

export default {
  schemaName,
  resolve,
  params,
};
