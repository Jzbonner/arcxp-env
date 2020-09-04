import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const SynopsisRow = props => (
    <div className='c-synopsis-row b-margin-bottom-d30-m20'>
      {props.children}
    </div>
);

SynopsisRow.propTypes = {
  children: PropTypes.array,
};

export default SynopsisRow;
