import React from 'react';
import PropTypes from 'prop-types';

const PX01 = ({ adSlot }) => <div className='story-interscroller__placeholder full-width' >{adSlot && adSlot()}</div>;

PX01.propTypes = {
  adSlot: PropTypes.func,
};

export default PX01;
