import React from 'react';
import PropTypes from 'prop-types';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import List from '../List/default';
import './default.scss';

const Revenue = (customFields = {}) => {
  const { title = '', moreURL = '' } = customFields;

  const size = customFields
    && customFields.customFields
    && customFields.customFields.content
    && customFields.customFields.content.contentConfigValues
    && customFields.customFields.content.contentConfigValues.size
    ? customFields.customFields.content.contentConfigValues.size
    : 3;

  const newCustomFields = {
    ...customFields,
    customFields: {
      ...customFields.customFields,
      displayClass: 'Left Photo',
      content: {
        ...customFields.customFields.content,
        contentConfigValues: {
          ...customFields.customFields.content.contentConfigValues,
          size,
        },
      },
    },
  };

  return (
    <div className="c-revenue">
      <div className="revenue-container">
        <FeatureTitle title={title} moreURL={moreURL} />
        <List {...newCustomFields}/>
      </div>
    </div>
  );
};

Revenue.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed', 'sophi']).tag({
      name: 'Content',
    }),
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
};

export default Revenue;
