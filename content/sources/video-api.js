import videoFilter from '../filters/video-api-filter';

const schemaName = 'video';

const ttl = 259200;

const params = {
  uuid: 'text',
};

const resolve = (query) => {
  const { 'arc-site': arcSite = 'ajc', published, uuid } = query;
  const requestUri = `/content/v4/videos/?website=${arcSite}&_id=${uuid}&included_fields=${videoFilter}`;
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  ttl,
  resolve,
  params,
  schemaName,
};
