const schemaName = 'site-service';
const params = {
  hierarchy: 'text',
  section: 'text',
};

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
    schemaName,
  };
};

export default createContentSource('ajc');

// const resolve = (query) => {
//   const {
//     'arc-site': arcSite = 'ajc',
//   } = query;
//   const requestUri = `/site/v3/website/${arcSite}/section/`;
//   return requestUri;
// };

// export default {
//   resolve,
//   schemaName,
// };
