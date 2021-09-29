import React from 'react';
import PropTypes from 'prop-types';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const CarterObitChain = ({ customFields = {}, children }) => {
  const { title = '', moreURL = '' } = customFields;

  return (
    <div className='c-obitChain'>
      <div className="chain-content">
        <FeatureTitle title={title} moreURL={moreURL} />
        <div className='row'>{children}</div>
      </div>
    </div>
  );
};

CarterObitChain.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
    imageSrc: PropTypes.string.tag({
      name: 'Image Resizer URI',
    }),
  }),
  children: PropTypes.array,
};

export default CarterObitChain;
