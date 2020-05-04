/* eslint-disable no-console */
import { CONTENT_BASE } from 'fusion:environment';
import axios from 'axios';
import AddFirstInlineImageToContentElements from './helper_functions/AddFirstImage';

const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
  from: 'text',
  size: 'text',
};

const fetch = (query) => {
  const {
    'arc-site': arcSite = 'ajc', id, from, size,
  } = query;

  let requestUri = `${CONTENT_BASE}/content/v4/collections/?website=${arcSite}`;
  requestUri += id ? `&_id=${id}` : '';
  requestUri += from ? `&from=${from}` : '';
  requestUri += size ? `&size=${size}` : '';

  if (id) {
    return axios
      .get(requestUri)
      .then(({ data }) => AddFirstInlineImageToContentElements(data, arcSite))
      .catch((error) => {
        console.error(error);
      });
  }
  return null;
};

export default {
  fetch,
  schemaName,
  ttl,
  params,
};
