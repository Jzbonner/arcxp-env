import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const UBBNChain = ({ children }) => (
    <div className='c-ubbnChain'>
      <div className="chain-content">
        <div className='row'>{children}</div>
      </div>
    </div>
);

UBBNChain.propTypes = {
  children: PropTypes.array,
};

export default UBBNChain;
