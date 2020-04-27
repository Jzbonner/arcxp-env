/* eslint-disable no-console */
import { CONTENT_BASE } from 'fusion:environment';
import getProperties from 'fusion:properties';
import axios from 'axios';

const schemaName = 'collections';
const ttl = 120;
const params = {
  id: 'text',
};

const { breakingNewsID, breakingLiveVideoID, sites } = getProperties();

const getStoryData = (data) => {
  const storyID = data.data
    && data.data.document
    && data.data.document.content_elements
    && data.data.document.content_elements[0]
    && data.data.document.content_elements[0].referent
    && data.data.document.content_elements[0].referent.id;

  if (storyID) {
    const storyURL = `${CONTENT_BASE}/content/v4/?website=${sites[0]}&_id=${storyID}`;
    return axios
      .get(storyURL)
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

const fetch = () => {
  if (breakingNewsID && breakingLiveVideoID) {
    const urlBreaking = `${CONTENT_BASE}/websked/collections/v1/collections/${breakingNewsID}`;
    return axios
      .get(urlBreaking)
      .then(({ data: breakingData }) => ({ breakingData, numOfBreakingStories: breakingData.data && breakingData.data.booked }))
      .then(({ breakingData, numOfBreakingStories }) => {
        if (numOfBreakingStories > 0) {
          const typeOfHeadline = 'Breaking News';
          return getStoryData(breakingData).then(data => ({ ...data, typeOfHeadline }));
        }
        if (numOfBreakingStories === 0) {
          const urlLiveVideo = `${CONTENT_BASE}/websked/collections/v1/collections/${breakingLiveVideoID}`;
          return axios.get(urlLiveVideo).then(({ data: videoData }) => {
            if (videoData.data && videoData.data.booked && videoData.data.booked > 0) {
              const typeOfHeadline = 'Video News';
              return getStoryData(videoData).then(data => ({ ...data, typeOfHeadline }));
            }
            return {};
          });
        }
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
