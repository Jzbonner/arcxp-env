const schemaName = 'site';

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc',
  } = query;
  const requestUri = `/site/v3/website/${arcSite}/section/`;
  return requestUri;
};

export default {
  resolve,
  schemaName,
};
