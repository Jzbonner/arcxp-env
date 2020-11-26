const findAPMonth = (month = 12) => {
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', null];

  return months[month];
};

const formatTime = (date, showSeconds = false) => {
  const dateOptions = {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
  };
  if (showSeconds) {
    dateOptions.second = 'numeric';
  }
  return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
};

const formatDay = (date) => {
  const dateOptions = {
    timeZone: 'America/New_York',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', dateOptions).format(date);
};

const formatDate = date => (date.getDate() < 10 ? `0${date.getDate()}` : date.getDate());

const dayOfTheWeek = (day = 7) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', null];

  return days[day];
};

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
  const pub = isUpdated || articleType === 'tease' ? displayDateObject : firstPublishDateObject;
  if (!pub) return null;

  const pubInMs = pub.getTime();
  const now = new Date();
  const nowInMs = now.getTime();
  const timeAgoInMs = Math.floor(nowInMs - pubInMs);
  const minutes = Math.floor(timeAgoInMs / 60000);
  const hours = Math.floor(timeAgoInMs / 3600000);
  const days = Math.floor(timeAgoInMs / 86400000);

  if (articleType === 'normal') {
    if (days > 0) {
      timeStamp = `${!isHyperlocalContent ? ' | ' : ''}${isUpdated ? 'Updated ' : ''}${findAPMonth(
        pub.getMonth(),
      )} ${pub.getDate()}, ${pub.getFullYear()}`;
    } else if (hours > 0) {
      const hourLabel = `hour${hours > 1 ? 's' : ''}`;
      timeStamp = `${!isHyperlocalContent ? ' | ' : ''}${isUpdated ? 'Updated ' : ''}${hours} ${hourLabel} ago`;
    } else if (minutes > -1) {
      const minLabel = `minute${minutes !== 1 ? 's' : ''}`;
      timeStamp = `${!isHyperlocalContent ? ' | ' : ''}${isUpdated ? 'Updated ' : ''}${minutes} ${minLabel} ago`;
    } else {
      return null;
    }
  }

  if (articleType === 'amp') {
    const weekday = `${dayOfTheWeek(pub.getDay())}`;
    const month = `${findAPMonth(pub.getMonth())}`;
    const dayOfTheMonth = `${formatDay(pub)}`;
    const year = `${pub.getFullYear()}`;
    const time = `${formatTime(pub)}`;

    timeStamp = `${weekday}, ${month} ${dayOfTheMonth}, ${year} at ${time}`;
  }

  if (articleType === 'tease') {
    if (hours > 3) return null;
    if (hours >= 1 && hours < 24) {
      timeStamp = `| ${hours}h ago`;
    } else if (hours < 1 && minutes > -1) {
      timeStamp = `| ${minutes}m ago`;
    } else {
      return null;
    }
  }

  return timeStamp;
};

export default computeTimeStamp;
export { formatTime, formatDate };
