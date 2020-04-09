const schemaName = 'collections';

const params = {
  id: 'text',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', id, startIndex } = query;
  let requestUri = `/content/v4/collections/?website=${arcSite}`;
  requestUri += id ? `&_id=${id}` : '';
  requestUri += startIndex ? `&from=${startIndex}` : '';
  return requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
