import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

/* eslint-disable no-console */
const schemaName = 'site-service';
const ttl = 120;

const params = {
  type: 'text',
  hierarchy: 'text',
  section: 'text',
};

const fetch = (query) => {
  const {
    'arc-site': arcSite = 'ajc',
    type = 'navigation',
    hierarchy = 'default',
    section = '',
    status = true,
  } = query;

  if (status) {
    const endpoint = `${CONTENT_BASE}/site/v3/${type}/${arcSite}/?hierarchy=${hierarchy}`;
    const requestUri = section ? `${endpoint}&_id=${section}` : endpoint;

    return axios
      .get(requestUri, {
        headers: {
          Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
        },
      })
      .then(({ data }) => data);
  }
  return {};
};

export default {
  fetch,
  schemaName,
  ttl,
  params,
};
