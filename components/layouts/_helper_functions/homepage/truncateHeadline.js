export default function (headline) {
  if (!headline) {
    return null;
  }
  if (headline.length > 72) {
    let newHeadline = '';
    headline.split(' ').forEach((word) => {
      if (newHeadline.length + word.length + 1 < 72) {
        newHeadline = newHeadline.concat(word, ' ');
      }
    });
    return newHeadline.slice(0, -1).concat('...');
  }
  return headline;
}
