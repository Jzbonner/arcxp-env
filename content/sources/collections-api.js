/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';
import AddFirstInlineImage from './helper_functions/AddFirstInlineImage';
import FilterElements from './helper_functions/FilterElements';

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
      .get(requestUri, {
        headers: {
          Bearer: ARC_ACCESS_TOKEN,
        },
      })
      .then(({ data }) => AddFirstInlineImage(data, arcSite, displayClass, displayClassesRequiringImg))
      .then(data => FilterElements(data, displayClass, displayClassesRequiringImg))
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
