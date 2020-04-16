const schemaName = 'article';

const params = {
  published: 'text',
  id: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', published, id,
  } = query;
  let requestUri = `/content/v4/?website=${arcSite}`;
  requestUri += id ? `&_id=${id}` : '';
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
