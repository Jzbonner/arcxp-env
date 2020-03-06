const schemaName = 'collections';
const ttl = 120;

const params = [
  {
    id: 'text',
  },
];

const resolve = (query) => {
  const { id = '' } = query;
  return `websked/collections/v1/collections/${id}`;
};

export default {
  schemaName,
  ttl,
  resolve,
  params,
};
