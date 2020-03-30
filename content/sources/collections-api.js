const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
};

console.log('ID', params.id);

const resolve = (query) => {
  const { id = '' } = query;
  return `websked/collections/v1/collections/contents/${id}`;
};

export default {
  schemaName,
  ttl,
  resolve,
  params,
};
