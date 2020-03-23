const schemaName = 'query-feed';

const params = {
  includeSources: 'text',
  includeContentTypes: 'text',
  includeSections: 'text',
  includeTags: 'text',
  includeSubtypes: 'text',
  excludeSources: 'text',
  excludeContentTypes: 'text',
  excludeSections: 'text',
  excludeTags: 'text',
  exludeSubtypes: 'text',
};

export const itemsToArray = (itemString = '') => itemString.split(',').map(item => item.replace(/"/g, ''));

const resolve = (query) => {
  const {
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
  const sourcesExcluded = itemsToArray(excludeSources);

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
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': sectionsIncluded,
                      },
                    },
                    {
                      terms: {
                        'source.system': sourcesIncluded,
                      },
                    },
                    {
                      terms: {
                        type: contentTypesIncluded,
                      },
                    },
                    {
                      terms: {
                        'taxonomy.tags.text': tagsIncluded,
                      },
                    },
                    {
                      terms: {
                        subtype: subtypesIncluded,
                      },
                    },
                    {
                      term: {
                        'taxonomy.primary_section._website': 'ajc',
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
              query: {
                bool: {
                  must: [
                    {
                      terms: {
                        'taxonomy.sections._id': sectionsExcluded,
                      },
                    },
                    {
                      terms: {
                        'source.system': sourcesExcluded,
                      },
                    },
                    {
                      terms: {
                        type: contentTypesExcluded,
                      },
                    },
                    {
                      terms: {
                        'taxonomy.tags.text': tagsExcluded,
                      },
                    },
                    {
                      terms: {
                        subtype: subtypesExcluded,
                      },
                    },
                    {
                      term: {
                        'taxonomy.primary_section._website': 'ajc',
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
