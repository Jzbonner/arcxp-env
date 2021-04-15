import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import filter from '../filters/galleryFilter';
import FetchResizedImages from './helper_functions/FetchResizedImages';

const schemaName = 'article';

const params = {
  path: 'text',
  published: 'text',
  id: 'text',
};

const fetch = (query = {}) => {
  const {
    arcSite = 'ajc', path,
  } = query;

  if (!path || !arcSite) return null;

  return axios
    .get(`${CONTENT_BASE}/content/v4/?published=true&website=${arcSite}&website_url=${path}&_sourceInclude=${filter}`, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => FetchResizedImages(arcSite, data, 720, 480))
    .catch((error) => {
      console.log('AXIOS CATCH - gallery => ', error);
    });
};

export default {
  fetch,
  params,
  schemaName,
};
