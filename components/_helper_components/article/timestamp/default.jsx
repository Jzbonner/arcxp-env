import React from 'react';
import PropTypes from 'prop-types';
import computeTimeStamp from './_helper_functions/computeTimeStamp';
import './default.scss';

const TimeStamp = ({
  firstPublishDate, displayDate, isHideTimestampTrue, isHyperlocalContent, ampPage = false, isTease = false, sponsorContentLabel,
}) => {
  let pageType = 'normal';

  if (ampPage && !sponsorContentLabel) pageType = 'amp';

  if (isTease) pageType = 'tease';

  const timeStamp = computeTimeStamp(firstPublishDate, displayDate, isHideTimestampTrue, isHyperlocalContent, pageType);

  if (timeStamp === null) return null;

  return (
    <span className={isTease ? 'isTease article-timestamp' : 'article-timestamp'}>
      {timeStamp}
    </span>
  );
};

TimeStamp.propTypes = {
  firstPublishDate: PropTypes.string,
  displayDate: PropTypes.string,
  isHideTimestampTrue: PropTypes.string,
  isHyperlocalContent: PropTypes.bool,
  ampPage: PropTypes.bool,
  isTease: PropTypes.bool,
  sponsorContentLabel: PropTypes.string,
};

export default TimeStamp;
