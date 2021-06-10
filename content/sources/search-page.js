import { SEARCH_PAGE_KEY } from 'fusion:environment';

const params = {
  q: 'text',
  page: 'number',
};

const resolve = (query) => {
  const { arcSite = 'ajc', q, page } = query;
  const requestUri = `https://search.arcpublishing.com/search?website_id=${arcSite}&q=${q}&page=${page}&key=${SEARCH_PAGE_KEY}`;
  return requestUri;
};

export default {
  resolve,
  params,
};
