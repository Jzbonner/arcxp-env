import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import getContentMeta from '../../_helper_components/global/siteMeta/_helper_functions/getContentMeta';
import { formatTime } from '../../_helper_components/article/timestamp/_helper_functions/computeTimeStamp';
import './default.scss';

const LiveUpdatePageHeader = ({ children }) => {
  const { pageIsLive } = getContentMeta();
  let statusContent = '';
  if (pageIsLive) {
    const appContext = useAppContext();
    const { globalContent = [] } = appContext;
    if (pageIsLive === 'true' || pageIsLive === 'yes') {
      statusContent = 'Live Updates';
    } else {
      const {
        display_date: displayDate,
        first_publish_date: firstPublishDate,
      } = globalContent[0] || {};
      statusContent = displayDate ? formatTime(displayDate) : formatTime(firstPublishDate);
    }
  }
  return <div className="c-LiveUpdatePageHeader">
    {children}
    {pageIsLive && <div className='c-liveUpdatesStatus'>{statusContent}</div>}
  </div>;
};

LiveUpdatePageHeader.propTypes = {
  children: PropTypes.array,
};

export default LiveUpdatePageHeader;
