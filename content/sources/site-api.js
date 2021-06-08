const ttl = 600;
const params = {
  type: 'text',
  hierarchy: 'text',
  section: 'text',
};
const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', type = 'navigation', hierarchy = 'default', section,
  } = query;
  const endpoint = `/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;
  return section ? `${endpoint}&_id=${section}` : endpoint;
};
export default {
  ttl,
  resolve,
  params,
};
