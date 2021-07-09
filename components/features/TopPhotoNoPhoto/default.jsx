import React from 'react';
import PropTypes from 'prop-types';
import Lead from '../Lead/default';
import './default.scss';

const TopPhotoNoPhoto = (customFields = {}) => {
  const limit = customFields
    && customFields.customFields
    && customFields.customFields.content
    && customFields.customFields.content.contentConfigValues
    && customFields.customFields.content.contentConfigValues.size
    ? customFields.customFields.content.contentConfigValues.size
    : 2;

  const newCustomFields = {
    ...customFields,
    customFields: {
      ...customFields.customFields,
      displayClass: '5-Item Feature - No Photo',
      content: {
        ...customFields.customFields.content,
        contentConfigValues: {
          ...customFields.customFields.content.contentConfigValues,
          size: limit,
        },
      },
    },
  };

  return (
    <div className='topPhotoNoPhoto'>
      <Lead {...newCustomFields} limitOverride={limit} feature={'TopPhotoNoPhoto'} />
    </div>
  );
};

TopPhotoNoPhoto.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
  }),
};

export default TopPhotoNoPhoto;
