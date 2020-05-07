/* eslint-disable no-console */
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import axios from 'axios';

const schemaName = 'collections';
const ttl = 120;
const params = {
  id: 'text',
};

const getStoryData = (site, data) => {
  const storyID = data.data
    && data.data.document
    && data.data.document.content_elements
    && data.data.document.content_elements[0]
    && data.data.document.content_elements[0].referent
    && data.data.document.content_elements[0].referent.id;

  if (storyID) {
    const storyURL = `${CONTENT_BASE}/content/v4/?website=${site}&_id=${storyID}`;
    return axios
      .get(storyURL, {
        headers: {
          Bearer: ARC_ACCESS_TOKEN,
        },
      })
      .then(({ data: storyData }) => {
        const {
          canonical_url: url = '',
          headlines: { basic: headline = {} },
        } = storyData;
        return { url, headline };
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return {};
};

const fetch = (query) => {
  const { breakingNewsID, breakingLiveVideoID, site } = query || {};
  if (breakingNewsID && breakingLiveVideoID && site) {
    const urlBreaking = `${CONTENT_BASE}/websked/collections/v1/collections/${breakingNewsID}`;
    return axios
      .get(urlBreaking, {
        headers: {
          Bearer: ARC_ACCESS_TOKEN,
        },
      })
      .then(({ data: breakingData }) => ({ breakingData, numOfBreakingStories: breakingData.data && breakingData.data.booked }))
      .then(({ breakingData, numOfBreakingStories }) => {
        if (numOfBreakingStories > 0) {
          const typeOfHeadline = 'Breaking News';
          return getStoryData(query.site, breakingData).then(data => ({ ...data, typeOfHeadline }));
        }
        if (numOfBreakingStories === 0) {
          const urlLiveVideo = `${CONTENT_BASE}/websked/collections/v1/collections/${breakingLiveVideoID}`;
          return axios
            .get(urlLiveVideo, {
              headers: {
                Bearer: ARC_ACCESS_TOKEN,
              },
            })
            .then(({ data: videoData }) => {
              if (videoData.data && videoData.data.booked && videoData.data.booked > 0) {
                const typeOfHeadline = 'Video News';
                return getStoryData(site, videoData).then(data => ({ ...data, typeOfHeadline }));
              }
              return {};
            });
        }
        // If the the useContent hook receives a falsy value from  a content source, it uses the most recent data in its cache.
        // So for when both the breaking new and video alert collections are empty,
        // the content source returns an empty object instead of null
        return {};
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return {};
};

export default {
  fetch,
  schemaName,
  ttl,
  params,
};
