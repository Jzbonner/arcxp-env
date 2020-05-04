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
  arcSite: 'text',
};

const fetch = (query) => {
  const {
    arcSite = 'ajc', id, from, size, displayClass = '', displayClassesRequiringImg = [],
  } = query;

  let requestUri = `${CONTENT_BASE}/content/v4/collections/?website=${arcSite}`;
  requestUri += id ? `&_id=${id}` : '';
  requestUri += from ? `&from=${from}` : '';
  requestUri += size ? `&size=${size}` : '';

  if (id) {
    return axios
      .get(requestUri)
      .then(({ data }) => {
        if (displayClassesRequiringImg.some(requiredClass => requiredClass === displayClass)) {
          return AddFirstInlineImageToContentElements(data, arcSite);
        }
        return data;
      })
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
