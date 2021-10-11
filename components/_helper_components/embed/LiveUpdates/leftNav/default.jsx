import React from 'react';
import PropTypes from 'prop-types';

const LeftNav = ({
  isActive,
  elId,
  headline,
  timestampDate,
  timestampTime,
  isToday,
  insertDateMarker,
  handleNavTrigger,
}) => <>
  {insertDateMarker && <a key={`${elId}-dateMarker`} className='date-marker' title={timestampDate}>
    <div className='timestamp'>{timestampDate.replace(',', '')}</div>
  </a>}
  <a href={`#${elId}`} key={`${elId}-anchor`} onClick={handleNavTrigger} className={isActive ? 'is-active' : ''} title={`${timestampTime}: ${headline.replace(/"/g, '\'')}`}>
    <div className='headline hidden-mobile'>{headline}</div>
    <div className='timestamp'>
      <span className={`timestamp-date ${isToday ? 'same-day' : ''}`}>{timestampDate} </span>
      <span className='timestamp-time'>{timestampTime}</span>
    </div>
  </a>
</>;

LeftNav.propTypes = {
  isActive: PropTypes.bool.isRequired,
  elId: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  timestampDate: PropTypes.string.isRequired,
  timestampTime: PropTypes.string.isRequired,
  isToday: PropTypes.bool.isRequired,
  insertDateMarker: PropTypes.bool.isRequired,
  handleNavTrigger: PropTypes.func.isRequired,
};
export default LeftNav;
