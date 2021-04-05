import React from 'react';
import PropTypes from 'prop-types';
import Lead from '../Lead/default';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const TTD = (customFields = {}) => {
  const {
    customFields: { content: title = 'Columnists', moreURL = '' },
  } = customFields;

  const newCustomFields = {
    ...customFields,
    customFields: {
      ...customFields.customFields,
      displayClass: '7-Item TTD Feature',
      content: {
        ...customFields.customFields.content,
        contentConfigValues: {
          ...customFields.customFields.content.contentConfigValues,
        },
      },
    },
  };

  return (
    <div className="c-ttd-feature">
      <FeatureTitle title={title} moreURL={moreURL} />
      <Lead {...newCustomFields} />
    </div>
  );
};

TTD.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    title: PropTypes.string.tag({
      name: 'Things To Do Title',
      defaultValue: 'Things To Do',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
};

export default TTD;
