import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

// This function returns an AP format month
const findAPMonth = (month = 12) => {
  const months = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
    null,
  ];

  return months[month];
};

const TimeStamp = ({ firstPublishDate, displayDate, isHideTimestampTrue }) => {
  let timeStamp;

  if (!firstPublishDate && !displayDate) return null;
  if (isHideTimestampTrue === 'Yes') return null;

  // The timestamps are off by a few fractions of a second. Because of that,
  // We check to see if firstPublishDate and displayDate are off by a minute.
  const firstPublishDateObject = new Date(firstPublishDate);
  const displayDateObject = new Date(displayDate);
  const firstPublishDateInMilliSeconds = firstPublishDateObject.getTime();
  const displayDateInMilliSeconds = displayDateObject.getTime();
  const currentOffset = displayDateInMilliSeconds - firstPublishDateInMilliSeconds;

  const isUpdated = (currentOffset >= 60000);
  const now = new Date();
  const nowInMs = now.getTime();
  const pub = isUpdated ? displayDateObject : firstPublishDateObject;
  const pubInMs = pub.getTime();
  const timeAgoInMs = Math.floor(nowInMs - pubInMs);
  const minutes = Math.floor(timeAgoInMs / 60000);
  const hours = Math.floor(timeAgoInMs / 3600000);
  const days = Math.floor(timeAgoInMs / 86400000);

  if (days > 0) {
    timeStamp = ` | ${isUpdated ? 'updated ' : ''}${findAPMonth(pub.getMonth())} ${pub.getDate()}, ${pub.getFullYear()}`;
  } else if (hours > 0) {
    const hourLabel = `hour${hours > 1 ? 's' : ''}`;
    timeStamp = ` | ${isUpdated ? 'updated ' : ''}${hours} ${hourLabel} ago`;
  } else if (minutes > -1) {
    const minLabel = `minute${minutes !== 1 ? 's' : ''}`;
    timeStamp = ` | ${isUpdated ? 'updated ' : ''}${minutes} ${minLabel} ago`;
  } else {
    return null;
  }
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
