import filter from '../filters/authorStoriesList';

const ttl = 3600;
const params = {
  id: 'text',
  from: 'text',
};

const resolve = (query) => {
  const {
    'arc-site': arcSite = 'ajc', id, from,
  } = query;
  const encodedFilter = encodeURIComponent(filter.replace(/\s+/g, ''));
  let requestUri = `/content/v4/search/published?website=${arcSite}`;
  requestUri += id ? `&q=type:story+AND+credits.by._id:${id}&sort=display_date:desc&size=10` : '';
  requestUri += from ? `&from=${from}` : '';
  requestUri += `&_sourceInclude=${encodedFilter}`;

  return requestUri;
};

export default {
  ttl,
  resolve,
  params,
};
