export default (headline, applyExtension = false) => {
  const charLimit = applyExtension ? 90 : 72;

  if (!headline) {
    return null;
  }
  if (headline.length >= charLimit) {
    let newHeadline = '';
    let lastWordIndex = -1;
    headline.split(' ').forEach((word, i) => {
      if (newHeadline.length + word.length + 1 <= charLimit && lastWordIndex === -1) {
        newHeadline = `${newHeadline} ${word}`;
      } else if (lastWordIndex === -1) {
        // the headline limit has been exceeded, so set the lastWordIndex
        lastWordIndex = i;
        // then check the new headline for ending punctuation and remove, if present
        if (['.', ',', '?', ':', ';', '!', ' '].includes(newHeadline.slice(-1))) {
          newHeadline = newHeadline.substring(0, -1);
        }
        if (newHeadline.length < charLimit) {
          // and if the new headline length is less than the limit, append an ellipsis
          newHeadline = `${newHeadline}...`;
        }
      }
    });
    return newHeadline;
  }
  return headline;
};
