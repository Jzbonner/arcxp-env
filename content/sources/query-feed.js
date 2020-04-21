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

export const itemsToArray = (itemString = '') => (itemString.length ? itemString.split(',').map(item => item.replace(/"/g, '')) : '?*');

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
        must: [
          {
            terms: {
              exists: {
                'distributor.reference_id': includeDistributor,
              },
            },
          },
          {
            terms: {
              exists: {
                type: contentTypesIncluded,
              },
            },
          },
          {
            terms: {
              exists: {
                subtype: subtypesIncluded,
              },
            },
          },
          {
            terms: {
              exists: {
                'taxonomy.tags.text': tagsIncluded,
              },
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
                        exists: {
                          'taxonomy.sections._id': sectionsIncluded,
                        },
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
        must_not: [
          {
            terms: {
              'distributor.reference_id': excludeDistributor,
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
