export default function (headline, applyExtension = false) {
  const charLimit = applyExtension ? 90 : 72;

  if (!headline) {
    return null;
  }
  if (headline.length > charLimit) {
    let newHeadline = '';
    headline.split(' ').forEach((word) => {
      if (newHeadline.length + word.length + 1 < charLimit) {
        newHeadline = newHeadline.concat(word, ' ');
      }
    });
    return newHeadline.slice(0, -1).concat('...');
  }
  return headline;
}
