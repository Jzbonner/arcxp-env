const schemaName = 'collections';

const params = {
  id: 'text',
  type: 'text',
};

const resolve = (query) => {
  const { id = '', type = '' } = query;
  return `/draft/v1/${type}/${id}`;
};

export default {
  resolve,
  params,
  schemaName,
};
