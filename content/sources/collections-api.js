const schemaName = 'collections';

const params = {
  id: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', id, startIndex, size,
  } = query;
  let requestUri = `/content/v4/collections/?website=${arcSite}`;
  requestUri += id ? `&_id=${id}` : '';
  requestUri += startIndex ? `&from=${startIndex}` : '';
  requestUri += size ? `&size=${size}` : '';

  return requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
