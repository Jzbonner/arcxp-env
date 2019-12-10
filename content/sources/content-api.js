const schemaName = 'article';
const params = {
  path: 'text',
  published: 'text',
};
const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', path, published } = query;
  const requestUri = `/content/v4/stories/?website_url=${path}&website=${arcSite}`;
  return published ? `${requestUri}&published=${published}` : requestUri;
};
export default {
  resolve,
  params,
  schemaName,
};
