const ttl = 43200;
const params = {
  id: 'text',
};

const resolve = (query = {}) => {
  const { id = '' } = query;

  let requestUri = '/author/v1/author-service/';
  requestUri += id !== '' ? `?_id=${id}` : '';
  return requestUri;
};

export default {
  ttl,
  resolve,
  params,
};
