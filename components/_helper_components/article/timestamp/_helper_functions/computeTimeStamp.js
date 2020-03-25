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


const formatTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
};

const computeTimeStamp = (firstPublishDate, displayDate, isHideTimestampTrue, articleType = 'normal') => {
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

  const isUpdated = (currentOffset >= 60000);
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
  }

  if (articleType === 'amp') {
    timeStamp = `${pub.getDay()}, ${findAPMonth(pub.getMonth())} ${pub.getDate()}, ${pub.getFullYear()} @ ${formatTime(pub)}`;
  }

  return timeStamp;
};

export default computeTimeStamp;
