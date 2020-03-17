/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';

const Lead = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      startIndex = 1,
      displayClass = '',
      columns = 1,
    },
  } = customFields;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  return <div>Lead Feature</div>;
};

Lead.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    displayClass: PropTypes.oneOf([
      '5-item Feature - No Photo',
      '5-item Feature - Left Photo',
      '5-item Feature - Top Photo',
      '5-item Feature - Center Lead Top Photo',
      '1 or 2-item Feature',
    ]).tag({
      name: 'Display Class',
      defaultValue: '5-item Feature - No Photo',
    }),
    columns: PropTypes.number.tag({
      name: 'Columns',
      defaultValue: 1,
    }),
  }),
};

export default Lead;
