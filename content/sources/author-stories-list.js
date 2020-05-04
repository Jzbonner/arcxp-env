const params = {
  id: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', id,
  } = query;
  let requestUri = `/content/v4/search/published?website=${arcSite}`;
  requestUri += id ? `&q=type:story+AND+credits.by._id:${id}&sort=display_date:desc&size=10` : '';
  return requestUri;
};

export default {
  resolve,
  params,
};
