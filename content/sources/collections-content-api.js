import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
  site: 'text',
};

const fetch = (query) => {
  const { site, id } = query || { site: 'ajc', id: '' };

  if (id) {
    const requestUri = `${CONTENT_BASE}websked/collections/v1/collections/contents/${id}`;

    return axios.get(requestUri, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    }).then(({ data: collectionsData = [] }) => Promise.all(collectionsData.map((object) => {
      // now we get the story data
      const { _id: storyId } = object || { _id: '' };

      if (storyId) {
        const storyURL = `${CONTENT_BASE}/content/v4/?website=${site}&_id=${storyId}`;
        return axios.get(storyURL, {
          headers: {
            Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
          },
        });
      }
      return new Promise(resolve => resolve({}));
    })));
  }

  return [];
};

export default {
  fetch,
  schemaName,
  params,
  ttl,
};
