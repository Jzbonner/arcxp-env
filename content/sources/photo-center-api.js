import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import FetchResizedImages from './helper_functions/FetchResizedImages';

const schemaName = 'article';
const ttl = 30000;

const params = {
  id: 'text',
};

const fetch = (query = {}) => {
  const {
    arcSite = 'ajc',
    id,
    useSrcSet = false,
    srcSetSizes = [],
  } = query;

  if (!id) return null;

  return axios
    .get(`${CONTENT_BASE}/photo/api/v2/photos/${id}`, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => FetchResizedImages(arcSite, data, 1600, 0, useSrcSet, srcSetSizes, null, null, false))
    .catch((error) => {
      /* eslint-disable no-console */
      console.error('AXIOS CATCH - photo (individual) fetch => ', error);
      return error;
    });
};

export default {
  ttl,
  fetch,
  params,
  schemaName,
};
