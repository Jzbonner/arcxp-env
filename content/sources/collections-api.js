const schemaName = 'collections';

const params = {
  id: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', id, from, size,
  } = query;
  let requestUri = `/content/v4/collections/?website=${arcSite}`;
  requestUri += id ? `&_id=${id}` : '';
  requestUri += from ? `&from=${from}` : '';
  requestUri += size ? `&size=${size}` : '';

  return requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
