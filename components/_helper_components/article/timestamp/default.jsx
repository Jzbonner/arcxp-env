import React from 'react';
import PropTypes from 'prop-types';
import computeTimeStamp from './_helper_functions/computeTimeStamp';
import './default.scss';

const TimeStamp = ({
  firstPublishDate, displayDate, isHideTimestampTrue, ampPage = false,
}) => {
  let pageType = 'normal';

  if (ampPage) pageType = 'amp';

  const timeStamp = computeTimeStamp(firstPublishDate, displayDate, isHideTimestampTrue, pageType);

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
  ampPage: PropTypes.bool,
};

export default TimeStamp;
