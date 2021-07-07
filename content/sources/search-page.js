import { SEARCH_PAGE_KEY_AJC, SEARCH_PAGE_KEY_OHIO } from 'fusion:environment';

const params = {
  q: 'text',
  page: 'number',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', q, page } = query;
  const searchPageQuery = (arcSite === 'ajc' ? SEARCH_PAGE_KEY_AJC : SEARCH_PAGE_KEY_OHIO);
  const requestUri = `https://search.arcpublishing.com/search?website_id=${arcSite}&q=${q}&page=${page}&key=${searchPageQuery}`;
  return requestUri;
};

export default {
  resolve,
  params,
};
