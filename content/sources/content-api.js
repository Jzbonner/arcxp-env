const schemaName = 'story';

const params = {
  path: 'text',
  published: 'text',
};

const resolve = (query) => {
  const { path, published } = query;
  const requestUri = `/content/v4/stories/?website_url=${path}&website=ajc`;
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
