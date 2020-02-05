const schemaName = 'site-service';

const params = {
  hierarchy: 'text',
  section: 'text',
};

export const createContentSource = (query) => {
  const resolve = (key = {}) => {
    const serviceSite = key['arc-site'] || query;
    const endpoint = `/site/v3/navigation/${serviceSite}/?hierarchy=${key.hierarchy || 'default'}`;

    return key.section ? `${endpoint}&_id=${key.section}` : endpoint;
  };
  return {
    resolve,
    params,
    schemaName,
  };
};

export default createContentSource('ajc');
