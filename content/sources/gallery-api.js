const schemaName = 'article';

const params = {
  path: 'text',
  published: 'text',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', published } = query;
  const requestUri = `/content/v4/search/?website=${arcSite}&q=type:gallery&sort=display_date:desc&size=10`;
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
