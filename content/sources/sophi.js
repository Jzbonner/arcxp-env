/* eslint-disable no-console */
import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN, SOPHI_ENDPOINT } from 'fusion:environment';
import sophiToken from './sophi-token';

const schemaName = 'sophi';
const ttl = 0;

const params = {
  page: 'text',
  widget: 'text',
  from: 'number',
  size: 'number',
};

const fetch = async ({
  page, widget, from = 0, size = 10, arcSite, 'arc-site': arcSiteAlt,
}) => {
  const activeSite = arcSite || arcSiteAlt;
  if (!activeSite) return [];

  const token = await sophiToken.fetch();

  const storyIds = await axios
    .get(
      `${SOPHI_ENDPOINT}?page=${page}&widget=${widget}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    )
    .then(({ data }) => data.map((id, i) => ({ id, order: i })))
    .catch((error) => {
      console.error('AXIOS CATCH - get Sophi story IDs => ', error?.response?.data?.message);
      return error;
    });

  const storyIdsStr = storyIds.map(id => id.id).join(',');
  const bulkCallUrl = `${CONTENT_BASE}/content/v4/ids?ids=${storyIdsStr}&website=${activeSite}&included_fields=content_elements,first_publish_date,last_updated_date,canonical_url,canonical_website,credits,description,display_date,headlines,promo_items,taxonomy,teaseImageObject,type,_id`;

  return axios
    .get(bulkCallUrl, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
    .then(({ data }) => data.content_elements)
    .then(stories => stories.map(story => ({ ...story, order: storyIds.find(storyIdsStory => storyIdsStory.id === story._id).order })))
    .then(stories => stories.sort((a, b) => a.order - b.order))
    .then(stories => stories.slice(from - 1, from - 1 + size))
    .catch((error) => {
      console.error('AXIOS CATCH - get Sophi stories => ', error?.response?.data?.message);
      return error;
    });
};

export default {
  params,
  fetch,
  ttl,
  schemaName,
};
