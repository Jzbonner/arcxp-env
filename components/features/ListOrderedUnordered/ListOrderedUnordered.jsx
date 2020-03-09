/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';

const ListOrderedUnordered = (customFields = {}) => {
  let {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '',
      startIndex = 1,
      itemLimit = 100,
    },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  return <div>Ordered or Un-ordered List Feature</div>;
};

ListOrderedUnordered.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 1,
    }),
    displayClass: PropTypes.oneOf(['Ordered List', 'Un-ordered List']).tag({
      name: 'Display Class',
      defaultValue: 'Ordered List',
    }),
  }),
};

export default ListOrderedUnordered;
