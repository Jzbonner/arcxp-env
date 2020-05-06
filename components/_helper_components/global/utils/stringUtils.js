/* eslint-disable */
const decodeString = (str) => {
  const REGNewline = new RegExp("\n", 'gm');
  let parsed = str.replace(REGNewline, '');
  parsed = parsed.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  return parsed;
}

export {
  decodeString
}
/* eslint-enable */
