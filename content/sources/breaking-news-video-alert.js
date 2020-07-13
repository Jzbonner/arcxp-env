/* eslint-disable no-console */
import GetCollectionData from './helper_functions/GetCollectionData';

const schemaName = 'collections';
const ttl = 120;

const params = {
  id: 'text',
  from: 'text',
  size: 'text',
};

const fetch = (query) => {
  const {
    breakingNewsID,
    breakingLiveVideoID,
    arcSite = 'ajc',
    size = 1,
  } = query;

  if (breakingNewsID && breakingLiveVideoID) {
    return GetCollectionData(arcSite, breakingNewsID, size)
      .then((data) => {
        if (data.length > 0) {
          return { headline: data[0].headlines.basic, url: data[0].canonical_url, typeOfHeadline: 'Breaking News' };
        }
        return GetCollectionData(arcSite, breakingLiveVideoID, size)
          .then((videoData) => {
            if (videoData.length > 0) {
              return { headline: videoData[0].headlines.basic, url: videoData[0].canonical_url, typeOfHeadline: 'Video News' };
            }
            return null;
          });
      })
      .catch((error) => {
        console.error(error);
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
