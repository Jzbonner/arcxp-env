const params = {
  hierarchy: 'text',
  section: 'text',
};
const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc',
    hierarchy,
    section,
  } = query;
  const endpoint = `/site/v3/navigation/${arcSite}/?hierarchy=${hierarchy
    || 'default'}`;
  return section ? `${endpoint}&_id=${section}` : endpoint;
};
export default {
  resolve,
  params,
};
