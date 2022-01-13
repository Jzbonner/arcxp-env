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
        if (newHeadline.length < charLimit) {
          // then check the new headline for ending punctuation and remove, if present
          if (['.', ',', '?', ':', ';', '!', ' '].includes(newHeadline.slice(-1))) {
            newHeadline = newHeadline.substring(0, newHeadline.length - 1);
          }
        }
      }
    });
    // When the headline contains a punctuation it sometimes matches the charlimit
    newHeadline = `${newHeadline}...`;
    return newHeadline;
  }
  return headline;
};
