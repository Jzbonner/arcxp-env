import React from 'react';
import PropTypes from 'prop-types';

const LeftNav = ({
  isActive,
  elId,
  headline,
  fullTimestamp,
  smallTimestamp,
  handleNavTrigger,
}) => <a href={`#${elId}`} key={`${elId}-anchor`} onClick={handleNavTrigger} className={isActive ? 'is-active' : ''}>
  <div className='headline hidden-mobile'>{headline}</div>
  <div className='timestamp'>
    <span className='timestamp-full'>{fullTimestamp} </span>
    <span className='timestamp-small'>{smallTimestamp}</span>
  </div>
</a>;

LeftNav.propTypes = {
  isActive: PropTypes.bool.isRequired,
  elId: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  fullTimestamp: PropTypes.string.isRequired,
  smallTimestamp: PropTypes.string.isRequired,
  handleNavTrigger: PropTypes.func.isRequired,
};
export default LeftNav;
