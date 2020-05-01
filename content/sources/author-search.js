const schemaName = 'author-search';

const params = {
  name: 'text',
  from: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', name,
  } = query;
  let requestUri = `/content/v4/search/published?website=${arcSite}`;
  requestUri += name ? `&q=type:story+AND+credits.by_id:${name}&sort=display_date:desc&size=10` : '';
  return requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
