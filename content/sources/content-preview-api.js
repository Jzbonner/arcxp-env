const schemaName = 'article';

const params = {
  path: 'text',
  published: 'text',
  id: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', path, id,
  } = query;
  let requestUri = `/content/v4/?published=false&website=${arcSite}`;
  requestUri += path ? `&website_url=${path}` : '';
  requestUri += id ? `&_id=${id}` : '';
  return requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
