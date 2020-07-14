const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
};

const resolve = (query) => {
  const { id = '', arcSite = 'ajc' } = query;
  return `/content/v4/collections/?website=${arcSite}&_id=${id}`;
};

export default {
  ttl,
  resolve,
  params,
  schemaName,
};
