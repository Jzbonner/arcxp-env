import React from 'react';
import PropTypes from 'prop-types';
import computeTimeStamp from './_helper_functions/computeTimeStamp';
import './default.scss';

const TimeStamp = ({ firstPublishDate, displayDate, isHideTimestampTrue }) => {
  const timeStamp = computeTimeStamp(firstPublishDate, displayDate, isHideTimestampTrue);

  if (timeStamp === null) return null;

  return (
    <span className={'article-timestamp'}>
      {timeStamp}
    </span>
  );
};

TimeStamp.propTypes = {
  firstPublishDate: PropTypes.string,
  displayDate: PropTypes.string,
  isHideTimestampTrue: PropTypes.string,
};

export default TimeStamp;
