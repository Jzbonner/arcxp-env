const schemaName = 'article';

const params = {
  website_url: 'text',
  published: 'text',
};

const resolve = (query) => {
  const arcsite = query['arc-site'] || 'demo';

  //const requestUri = `/content/v4/search?q=${query.website_url || query }&website=${arcsite}${query.size ? `&size=${query.size}` : null}`;
  const requestUri= `/content/v4/?website=ajc&website_url=${query.website_url}`;
  return (query.hasOwnProperty('published')) ? `${requestUri}&published=${query.published}` : requestUri;
}

export default {
  resolve,
  params,
  schemaName,
}