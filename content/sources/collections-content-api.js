import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

const schemaName = 'collections';
const ttl = 120;
const params = {
  id: 'text',
  site: 'text',
};

const getStoryData = (site, { data: collectionsData }) => {
  const { document } = collectionsData || {};
  const { content_elements: contentElements = [] } = document || {};
  if (contentElements.length) {
    return Promise.all(contentElements.map((object) => {
      const objectId = object && object.referent && object.referent.id ? object.referent.id : '';
      const storyUrl = `${CONTENT_BASE}/content/v4/?website=${site}&_id=${objectId}`;
      if (objectId) {
        return axios
          .get(storyUrl, {
            headers: {
              Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
            },
          })
          .then(({ data: storyData }) => storyData)
          .catch((error) => {
            console.error(error);
          });
      }
      return new Promise(resolve => resolve({}));
    }))
      .then(promiseArray => ({ data: promiseArray }));
  }
  return { data: [] };
};

const fetch = (query) => {
  const { site, id } = query || { site: 'ajc', id: '' };

  if (id) {
    const requestUri = `${CONTENT_BASE}/websked/collections/v1/collections/${id}`;

    return axios.get(requestUri, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    }).then(({ data: collectionsData }) => getStoryData(site, collectionsData));
  }

  return {};
};

export default {
  fetch,
  params,
  ttl,
  schemaName,
};
