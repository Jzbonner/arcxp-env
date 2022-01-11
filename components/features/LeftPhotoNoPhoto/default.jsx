import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ChainContext from '../../chains/helper_functions/chainContext';
import Lead from '../Lead/default';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const LeftPhotoNoPhoto = (customFields = {}) => {
  const limit = customFields?.customFields?.content?.contentConfigValues?.size || 2;

  const chainTitle = useContext(ChainContext);

  const { title = '', moreURL = '' } = customFields?.customFields || {};

  const newCustomFields = {
    ...customFields,
    customFields: {
      ...customFields.customFields,
      displayClass: '1 or 2 Item Feature', // this is meaningless, the real class-of-record is passed as `displayClassOverride` below
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
        <div className={`LeftPhotoNoPhoto ${chainTitle && chainTitle !== '' ? 'withTitle' : ''}`}>
          <Lead {...newCustomFields} columns={2} limitOverride={4} displayClassOverride={'Redesign Feature - Left Photo No Photo'} feature={'LeftPhotoNoPhoto'} />
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
    content: PropTypes.contentConfig(['collections', 'query-feed', 'sophi']).tag({
      name: 'Content',
      moreURL: PropTypes.string.tag({
        name: 'More URL',
      }),
    }),
  }),
};

export default LeftPhotoNoPhoto;
