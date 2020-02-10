import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const PX01 = ({ adSlot }) => <div className='story-interscroller__placeholder full-width '>{adSlot()}</div>;

PX01.propTypes = {
  adSlot: PropTypes.func,
};

export default PX01;
