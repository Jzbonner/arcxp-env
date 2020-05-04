
const params = {
  name: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', name,
  } = query;
  let requestUri = `/content/v4/search/published?website=${arcSite}`;
  requestUri += name ? `&q=type:story+AND+credits.by._id:${name}&sort=display_date:desc&size=10` : '';
  return requestUri;
};

export default {
  resolve,
  params,
};
