import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const CarterObitChain = ({ children }) => (
    <div className='c-obitChain'>
      <div className="chain-content">
        <div className='row'>{children}</div>
      </div>
    </div>
);

CarterObitChain.propTypes = {
  children: PropTypes.array,
};

export default CarterObitChain;
