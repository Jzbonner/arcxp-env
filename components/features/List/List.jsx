/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';

const List = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      displayClass = '',
      startIndex = 1,
      itemLimit = 100,
      columns = 1,
    },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  return <div>List Feature</div>;
};

List.propTypes = {
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
    displayClass: PropTypes.oneOf(['Top Photo', 'Left Photo', 'No Photo', 'Link']).tag({
      name: 'Display Class',
      defaultValue: 'Top Photo',
    }),
    columns: PropTypes.number.tag({
      name: 'Columns',
      defaultValue: 1,
    }),
  }),
};

export default List;
