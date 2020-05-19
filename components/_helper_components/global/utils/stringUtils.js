import sanitizeHtml from 'sanitize-html';

/* eslint-disable */
const decodeString = (str) => {
  const REGNewline = new RegExp("\n", 'gm');
  let parsed = str.replace(REGNewline, '');
  parsed = parsed.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  return parsed;
}

const safeHtml = (str) => {
  const parsedHtml = sanitizeHtml(str, {
    allowedAttributes: {
      'a': ['href', 'data-*', 'target', 'class', 'on']
    }
  });
  return parsedHtml;
}

export {
  decodeString,
  safeHtml
}
/* eslint-enable */
