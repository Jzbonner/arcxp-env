const schemaName = 'article';

const params = {
  path: 'text',
  published: 'text',
  id: 'text',
};

// search api w/ the ability to get feed of stories from a specified section
const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', published, section, sort, size,
  } = query;
  let requestUri = `/content/v4/search/?website=${arcSite}`;
  requestUri += section ? `&q=type:story+AND+taxonomy.sites._id:%22/${section}%22` : null;
  requestUri += sort ? '&sort=display_date:desc' : '';
  requestUri += size ? `&size=${size}` : '';
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
