import contentAPIFilter from '../filters/content-api-filter';

const schemaName = 'article';
const ttl = 259200;

const params = {
  path: 'text',
  published: 'text',
  id: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', path, id,
  } = query;
  let requestUri = `/content/v4/?published=true&website=${arcSite}&included_fields=${contentAPIFilter}`;
  requestUri += path ? `&website_url=${path}` : '';
  requestUri += id ? `&_id=${id}` : '';
  return requestUri;
};

export default {
  ttl,
  resolve,
  params,
  schemaName,
};
