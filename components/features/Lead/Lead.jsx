/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import leadFilter from '../../../content/filters/lead';

const Lead = (customFields = {}) => {
  const { displayClass, columns } = customFields;
  const { contentService, contentConfigValues } = props.customFields.content;

  const data = useContent({
    source: 'collections-api',
    query: {
      id: 'VUZWAJ63INFP3P7OM5OIYLKEKA',
    },
  });

  console.log(data);

  return <div>placeholder</div>;
};

Lead.propTypes = {
  customFields: PropTypes.shape({
    displayClass: PropTypes.oneOf(['1', '2']).tag({
      name: 'Display Class',
      defaultValue: '2',
    }),
    columns: PropTypes.number.tag({
      name: 'Columns',
      defaultValue: 1,
    }),
  }),
};

export default Lead;
