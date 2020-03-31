const schemaName = 'article';

const params = {
  type: 'text',
  path: 'text',
  published: 'text',
  id: 'text',
  from: 'text',
  size: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', type, path, published, id, from, size,
  } = query;
  let requestUri = `/content/v4/${type ? `${type}/` : ''}?website=${arcSite}`;
  requestUri += path ? `&website_url=${path}` : '';
  requestUri += id ? `&_id=${id}` : '';
  requestUri += from ? `&from=${from}` : '';
  requestUri += size ? `&size=${size}` : '';
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
