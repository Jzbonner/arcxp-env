import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const Row = ({ children }) => {
  return (
    <div className='c-LeftPhotoNoPhotoWrapper'>
      <div className='row'>{children}</div>
    </div>
  );
};

Row.propTypes = {
  children: PropTypes.array,
};

export default Row;
