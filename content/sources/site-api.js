import getProperties from 'fusion:properties';

const params = {
  hierarchy: 'text',
  section: 'text',
};
const arcSite = getProperties().sites[0];
export const createContentSource = (query) => {
  const resolve = (key = {}) => {
    const serviceSite = key['arc-site'] || query;
    const endpoint = `/site/v3/navigation/${serviceSite}/?hierarchy=${key.hierarchy
      || 'default'}`;
    return key.section ? `${endpoint}&_id=${key.section}` : endpoint;
  };
  return {
    resolve,
    params,
  };
};
export default createContentSource(arcSite);
