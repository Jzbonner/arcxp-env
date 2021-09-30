const findAPMonth = (month = 12) => {
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', null];

  return months[month];
};

const formatTime = (date, showSeconds = false, milTime = false) => {
  const dateOptions = {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
  };
  if (showSeconds) {
    dateOptions.second = 'numeric';
  }
  const hourFormat = milTime ? 'en-UK' : 'en-US';
  return new Intl.DateTimeFormat(hourFormat, dateOptions).format(date);
};

const formatDate = date => (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());

const computeTimeStamp = (firstPublishDate, displayDate, isHideTimestampTrue, isHyperlocalContent, articleType = 'normal') => {
  let timeStamp = null;
  let isUpdated = null;
  let firstPublishDateObject = null;

  if (!firstPublishDate && !displayDate) return null;
  if (isHideTimestampTrue === 'Yes') return null;

  const displayDateObject = new Date(displayDate);
  const displayDateInMilliSeconds = displayDateObject.getTime();

  if (firstPublishDate) {
    // The timestamps are off by a few fractions of a second. Because of that,
    // We check to see if firstPublishDate and displayDate are off by a minute.
    firstPublishDateObject = new Date(firstPublishDate);
    const firstPublishDateInMilliSeconds = firstPublishDateObject.getTime();
    const currentOffset = displayDateInMilliSeconds - firstPublishDateInMilliSeconds;
    isUpdated = currentOffset >= 60000;
  }

  // Always use display date for teases because the collection-api
  // which can be used for teases does not return a first_publish_date variable.
  // isUpdated === display date has been updated in composer,
  // !isUpdated && display date === display date exists and is older than first publish date.
  const pub = isUpdated || (!isUpdated && displayDate) || articleType === 'tease' ? displayDateObject : firstPublishDateObject;
  if (!pub) return null;

  const pubInMs = pub.getTime();
  const now = new Date();
  const nowInMs = now.getTime();
  const timeAgoInMs = Math.floor(nowInMs - pubInMs);
  const minutes = Math.floor(timeAgoInMs / 60000);
  const hours = Math.floor(timeAgoInMs / 3600000);
  const days = Math.floor(timeAgoInMs / 86400000);

  if (articleType === 'normal' || articleType === 'amp') {
    if (days > 0) {
      timeStamp = `${isUpdated ? 'Updated ' : ''}${findAPMonth(
        pub.getMonth(),
      )} ${pub.getDate()}, ${pub.getFullYear()}`;
    } else if (hours > 0) {
      const hourLabel = `hour${hours > 1 ? 's' : ''}`;
      timeStamp = `${isUpdated ? 'Updated ' : ''}${hours} ${hourLabel} ago`;
    } else if (minutes > -1) {
      const minLabel = `minute${minutes !== 1 ? 's' : ''}`;
      timeStamp = `${isUpdated ? 'Updated ' : ''}${minutes} ${minLabel} ago`;
    } else {
      return null;
    }
  }

  if (articleType === 'tease') {
    if (hours >= 1 && hours < 24) {
      timeStamp = `${hours}h ago`;
    } else if (hours < 1 && minutes > -1) {
      timeStamp = `${minutes}m ago`;
    } else {
      return null;
    }
  }

  if (articleType === 'liveupdate-full') {
    timeStamp = `${findAPMonth(
      pub.getMonth(),
    )} ${pub.getDate()}, ${pub.getFullYear()}`;
  }

  if (articleType === 'liveupdate-small') {
    timeStamp = `${formatTime(pub)}`;
  }

  if (articleType === 'search') {
    if (days > 0) {
      timeStamp = `${findAPMonth(
        pub.getMonth(),
      )} ${pub.getDate()}, ${pub.getFullYear()}`;
    } else if (hours >= 1 && hours < 24) {
      timeStamp = `${hours}h ago`;
    } else if (hours < 1 && minutes > -1) {
      timeStamp = `${minutes}m ago`;
    } else {
      return null;
    }
  }

  return timeStamp;
};

export default computeTimeStamp;
export { formatTime, formatDate };
