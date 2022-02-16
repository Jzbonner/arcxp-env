import React from 'react';
import PropTypes from 'prop-types';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import './default.scss';

const Row = ({ customFields = {}, children }) => {
  const { title = '', moreURL = '' } = customFields;

  return (
    <div className='c-topPhotoFourSlotRow'>
      <FeatureTitle title={title} moreURL={moreURL} />
      <div className='row'>{children}</div>
    </div>
  );
};

Row.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
  }),
  children: PropTypes.array,
};

export default Row;
