import xss from 'xss';

/* eslint-disable */
const decodeString = (str) => {
  const REGNewline = new RegExp("\n", 'gm');
  let parsed = str.replace(REGNewline, '');
  parsed = parsed.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  return parsed;
};

// https://github.com/apostrophecms/sanitize-html
const safeHtml = (str, opt = {}) => {
  const preconfig = {
    whiteList: {
      '*': ['id'],
      'a': ['href', 'data-*', 'target', 'class', 'on']
    }
  };

  const cfg = {
    ...preconfig,
    ...opt
  };

  const myxss = new xss.FilterXSS(cfg);

  const parsed = myxss.process(str);
  return parsed;
}

export {
  decodeString,
  safeHtml
}
/* eslint-enable */
