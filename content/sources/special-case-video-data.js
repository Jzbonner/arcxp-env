import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

export default {

  fetch(query) {
    const { 'arc-site': arcSite = 'ajc', uuid } = query;
    let requestUri = `${CONTENT_BASE}/content/v4/videos/?website=${arcSite}`;
    requestUri += uuid ? `&_id=${uuid}` : '';

    return axios.get(requestUri, {
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
      .then(({ data }) => data)
      .catch((error) => {
        console.log('error coming from content/sources/special-case-video-data.js ', error);
      });
  },
  params: {
    uuid: 'text',
  },
};
