const schemaName = 'article';

const params = {
  website_url: 'text',
  published: 'text',
};

const resolve = (query) => {
  const { published, websiteURL } = query;
  const requestUri = `/content/v4/?website=ajc&website_url=${websiteURL}`;
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
