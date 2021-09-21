import pick from 'lodash/pick';
import filter from '../../filters/most-read';

export default (apiData, host, blacklist) => {
  let { pages: pageData = [] } = apiData;
  pageData = pageData.filter(
    page => !blacklist.some(listItem => `${host}${listItem.uri}` === page.path),
  );
  return pageData.map(el => pick(el, filter));
};
