const resolve = (query) => {
  const { id } = query || {};

  return `/websked/collections/v1/collections/contents/${id}/`;
};

export default {
  resolve,
  params: {
    id: 'text',
  },
};
