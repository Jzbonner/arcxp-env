const schemaName = 'collections';

const params = {
  id: 'text',
  from: 'text',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', id, from } = query;
  let requestUri = `/content/v4/collections/?website=${arcSite}`;
  requestUri += id ? `&_id=${id}` : '';
  requestUri += from ? `&from=${from}` : '';
  return requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
