export default function getDaysSincePublished(firstPublishDate) {
  if (!firstPublishDate) return null;

  const firstPublishDateObject = new Date(firstPublishDate);
  const now = new Date();
  const nowInMs = now.getTime();
  const pubInMs = firstPublishDateObject.getTime();
  const timeAgoInMs = Math.floor(nowInMs - pubInMs);
  const days = Math.floor(timeAgoInMs / 86400000);

  return days;
}
