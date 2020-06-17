import sanitizeHtml from 'sanitize-html';

/* eslint-disable */
const decodeString = (str) => {
  const REGNewline = new RegExp("\n", 'gm');
  let parsed = str.replace(REGNewline, '');
  parsed = parsed.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  return parsed;
}

// https://github.com/apostrophecms/sanitize-html
const safeHtml = (str, opt = {}) => {
  const preconfig = {
    allowedAttributes: {
      '*': ['id'],
      'a': ['href', 'data-*', 'target', 'class', 'on']
    }
  };

  const cfg = {
    ...preconfig,
    ...opt
  };

  const parsed = sanitizeHtml(str, cfg);
  return parsed;
}

export {
  decodeString,
  safeHtml
}
/* eslint-enable */
