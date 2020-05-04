const params = {
  id: 'text',
};

const resolve = (query) => {
  const { id = '' } = query;
  const requestUri = `/author/v1/author-service/?_id=${id}`;
  return requestUri;
};

export default {
  resolve,
  params,
};
