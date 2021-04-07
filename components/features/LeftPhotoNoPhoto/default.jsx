import React from 'react';
import PropTypes from 'prop-types';
import Lead from '../Lead/default';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const LeftPhotoNoPhoto = (customFields = {}) => {
  const limit = customFields
    && customFields.customFields
    && customFields.customFields.content
    && customFields.customFields.content.contentConfigValues
    && customFields.customFields.content.contentConfigValues.size
    ? customFields.customFields.content.contentConfigValues.size
    : 2;

  const { title = '', moreURL = '' } = customFields.customFields;

  const newCustomFields = {
    ...customFields,
    customFields: {
      ...customFields.customFields,
      displayClass: 'Redesign Feature - Left Photo No Photo',
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
    <div className="c-LeftPhotoNoPhotoRow">
      <FeatureTitle title={title} moreURL={moreURL} isLeftPhotoNoPhoto={true} />
      <div className="row">
        <div className='LeftPhotoNoPhoto'>
          <Lead {...newCustomFields} columns={2} limitOverride={4} />
        </div>
      </div>
    </div>
  );
};

LeftPhotoNoPhoto.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
      moreURL: PropTypes.string.tag({
        name: 'More URL',
      }),
    }),
  }),
};

export default LeftPhotoNoPhoto;
