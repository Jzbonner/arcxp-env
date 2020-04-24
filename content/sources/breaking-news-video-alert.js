import { CONTENT_BASE } from 'fusion:environment';
import getProperties from 'fusion:properties';
import axios from 'axios';

const schemaName = 'collections';
const ttl = 120;
const params = {
  id: 'text',
};

const { breakingNewsID, breakingLiveVideoID } = getProperties();

const fetch = () => {
  if (breakingNewsID && breakingLiveVideoID) {
    const url = `${CONTENT_BASE}/websked/collections/v1/collections/${breakingNewsID}`;
    return axios
      .get(url)
      .then(({ data }) => {
        if (data.data && data.data.booked && data.data.booked > 0) {
          const storyID = data.data
            && data.data.document
            && data.data.document.content_elements
            && data.data.document.content_elements[0]
            && data.data.document.content_elements[0].referent;

          return storyID._id;
        }
        return data;
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message);
        }
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
