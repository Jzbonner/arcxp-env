const { searchPageKey } = require('../../environment/index');

const resolve = (query) => {
  // Temporarily hardcoded while calling from Feature below hardcoded values will be removed
  const { q = 'disney', arcSite = 'ajc', page = 1 } = query;
  const requestUri = `https://search.arcpublishing.com/search?website_id=${arcSite}&q=${q}&page=${page}&key=${searchPageKey}`;
  return requestUri;
};

export default {
  resolve,
};
