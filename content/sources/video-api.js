const schemaName = 'video';

const params = {
  uuid: 'text',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', published, uuid } = query;
  let requestUri = `/content/v4/videos/?website=${arcSite}`;
  requestUri += uuid ? `&_id=${uuid}` : '';
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
