export const formatApiTime = (firstPubDate, displayDate) => {
  let pubDate;

  if (firstPubDate || displayDate) {
    const firstPublishDateObject = new Date(Date.parse(firstPubDate));
    const displayDateObject = new Date(Date.parse(displayDate));
    const firstPublishDateInMilliSeconds = firstPublishDateObject.getTime();
    const displayDateInMilliSeconds = displayDateObject.getTime();
    const currentOffset = displayDateInMilliSeconds - firstPublishDateInMilliSeconds;

    const isUpdated = currentOffset >= 60000;
    pubDate = isUpdated ? displayDateObject : firstPublishDateObject;
  } else {
    pubDate = new Date();
  }

  const weekDay = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(pubDate);
  const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(pubDate);
  const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(pubDate);
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(pubDate);
  const hour = new Intl.DateTimeFormat('en', { hour: '2-digit', hourCycle: 'h23' }).format(pubDate);
  const min = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(pubDate);
  const sec = new Intl.DateTimeFormat('en', { second: '2-digit' }).format(pubDate);
  const timeZoneName = new Intl.DateTimeFormat('en', { timeZoneName: 'short' }).format(pubDate);

  const [, timezone] = timeZoneName.split(' ');

  return `${weekDay}, ${day} ${month} ${year} ${hour}:${min}:${sec} ${timezone}`;
};

export default formatApiTime;
