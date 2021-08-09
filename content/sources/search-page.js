import { SEARCH_PAGE_KEY_AJC, SEARCH_PAGE_KEY_OHIO } from 'fusion:environment';

const params = {
  q: 'text',
  page: 'number',
  sortByDate: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', q, sortByDate, page = 1,
  } = query;
  const searchPageQuery = (arcSite === 'ajc' ? SEARCH_PAGE_KEY_AJC : SEARCH_PAGE_KEY_OHIO);
  let requestUri = `https://search.arcpublishing.com/search?website_id=${arcSite}&q=${q}&page=${page}&key=${searchPageQuery}`;

  requestUri += sortByDate ? '&s=date' : '';

  return requestUri;
};

export default {
  resolve,
  params,
};
