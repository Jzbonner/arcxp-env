const schemaName = 'query-feed';

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
  exludeSubtypes: 'text',
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
    exludeSubtypes = '',
  } = query;

  const distributorIncluded = itemsToArray(includeDistributor);
  const distributorExcluded = itemsToArray(excludeDistributor);

  const contentTypesIncluded = itemsToArray(includeContentTypes);
  const contentTypesExcluded = itemsToArray(excludeContentTypes);

  const sectionsIncluded = itemsToArray(includeSections);
  const sectionsExcluded = itemsToArray(excludeSections);

  const tagsIncluded = mustIncludeAllTags === 'yes' ? includeTags : itemsToArray(includeTags);
  const tagsExcluded = itemsToArray(excludeTags);

  const subtypesIncluded = itemsToArray(includeSubtypes);
  const subtypesExcluded = itemsToArray(exludeSubtypes);

  const body = {
    query: {
      bool: {
        should: [
          {
            terms: {
              'distributor.reference_id': distributorIncluded,
            },
          },
          {
            terms: {
              type: contentTypesIncluded,
            },
          },
          {
            terms: {
              subtype: subtypesIncluded,
            },
          },
          {
            terms: {
              'taxonomy.tags.text': tagsIncluded,
            },
          },
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': sectionsIncluded,
                      },
                    },
                    {
                      term: {
                        'taxonomy.sections._website': 'ajc',
                      },
                    },
                  ],
                },
              },
            },
          },
        ],
        should_not: [
          {
            terms: {
              'distributor.reference_id': distributorExcluded,
            },
          },
          {
            terms: {
              type: contentTypesExcluded,
            },
          },
          {
            terms: {
              subtype: subtypesExcluded,
            },
          },
          {
            terms: {
              'taxonomy.tags.text': tagsExcluded,
            },
          },
          {
            nested: {
              path: 'taxonomy.sections',
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': sectionsExcluded,
                      },
                    },
                    {
                      term: {
                        'taxonomy.sections._website': 'ajc',
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

  return `/content/v4/search/published?body=${encodedBody}&website=ajc`;
};

export default {
  schemaName,
  resolve,
  params,
};
