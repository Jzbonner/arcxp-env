//const schemaName = 'article';

const params = {
  path: 'text',
  published: 'text',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', published, path } = query;
  const requestUri = `/content/v4/search/?website=${arcSite}&q=type:gallery&website_url=${path}`;
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  //schemaName,
};
