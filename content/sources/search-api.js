import searchFilter from '../filters/searchFilter';

const schemaName = 'article';

const params = {
  published: 'text',
  section: 'text',
  size: 'text',
  sort: 'text',
};

// search api w/ the ability to get feed of stories from a specified section
const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', published, section, sort, size,
  } = query;
  const encodedFilter = encodeURIComponent(searchFilter.replace(/\s+/g, ''));

  let requestUri = `/content/v4/search/?website=${arcSite}`;
  requestUri += section ? `&q=type:story+AND+taxonomy.primary_section._id:%22/${section}%22` : null;
  requestUri += size ? `&size=${size}` : '';
  requestUri += sort ? '&sort=display_date:desc' : '';
  requestUri += `&_sourceInclude=${encodedFilter}`;
  return published ? `${requestUri}&published=${published}` : requestUri;
};

export default {
  resolve,
  params,
  schemaName,
};
