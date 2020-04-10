const findAPMonth = (month = 12) => {
  const months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', null];

  return months[month];
};

const formatTime = (date) => {
  const dateOptions = {
    timeZone: 'America/New_York',
    hour: 'numeric',
    minute: 'numeric',
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

  if (!firstPublishDate && !displayDate) return null;
  if (isHideTimestampTrue === 'Yes') return null;

  // The timestamps are off by a few fractions of a second. Because of that,
  // We check to see if firstPublishDate and displayDate are off by a minute.
  const firstPublishDateObject = new Date(firstPublishDate);
  const displayDateObject = new Date(displayDate);
  const firstPublishDateInMilliSeconds = firstPublishDateObject.getTime();
  const displayDateInMilliSeconds = displayDateObject.getTime();
  const currentOffset = displayDateInMilliSeconds - firstPublishDateInMilliSeconds;

  const isUpdated = currentOffset >= 60000;
  const now = new Date();
  const nowInMs = now.getTime();
  const pub = isUpdated ? displayDateObject : firstPublishDateObject;
  const pubInMs = pub.getTime();
  const timeAgoInMs = Math.floor(nowInMs - pubInMs);
  const minutes = Math.floor(timeAgoInMs / 60000);
  const hours = Math.floor(timeAgoInMs / 3600000);
  const days = Math.floor(timeAgoInMs / 86400000);

  if (articleType === 'normal') {
    if (days > 0) {
      timeStamp = `${!isHyperlocalContent ? ' | ' : ''}${isUpdated ? 'updated ' : ''}${findAPMonth(
        pub.getMonth(),
      )} ${pub.getDate()}, ${pub.getFullYear()}`;
    } else if (hours > 0) {
      const hourLabel = `hour${hours > 1 ? 's' : ''}`;
      timeStamp = `${!isHyperlocalContent ? ' | ' : ''}${isUpdated ? 'updated ' : ''}${hours} ${hourLabel} ago`;
    } else if (minutes > -1) {
      const minLabel = `minute${minutes !== 1 ? 's' : ''}`;
      timeStamp = `${!isHyperlocalContent ? ' | ' : ''}${isUpdated ? 'updated ' : ''}${minutes} ${minLabel} ago`;
    } else {
      return null;
    }
  }

  if (articleType === 'amp') {
    const weekday = `${dayOfTheWeek(pub.getDay())}`;
    const month = `${findAPMonth(pub.getMonth())}`;
    const dayOfTheMonth = `${formatDate(pub)}`;
    const year = `${pub.getFullYear()}`;
    const time = `${formatTime(pub)}`;

    timeStamp = `${weekday}, ${month} ${dayOfTheMonth}, ${year} @ ${time}`;
  }

  if (articleType === 'tease') {
    if (hours >= 24) return null;
    if (hours > 1 && hours < 24) {
      timeStamp = `| ${hours}h ago`;
    } else if (minutes > -1) {
      timeStamp = `| ${minutes}m ago`;
    } else {
      return null;
    }
  }

  return timeStamp;
};

export default computeTimeStamp;
