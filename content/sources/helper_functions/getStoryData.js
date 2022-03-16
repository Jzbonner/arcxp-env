/* eslint-disable no-console */
import axios from 'axios';
import flatten from 'lodash/flatten';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

export default (site = 'ajc', contentElements) => {
  if (Array.isArray(contentElements)) {
    const storyIdsForBulkCalls = [];
    const storyData = [];
    const promiseArray = [];

    for (let i = 0; i < contentElements.length; i += 50) {
      // ADP-964 asked the developers to create bulk calls instead of single calls for each story.
      // 1. Here we create an array of arrays with a for loop
      // 2. in for loop, we use i to create startIndex and stopIndex
      // 3. Then we use slice and push to add arrays for later processing in storyIdsForBulkCalls

      const startIndex = i;
      const stopIndex = (startIndex + 50);

      storyIdsForBulkCalls.push(contentElements.slice(startIndex, (stopIndex)).map((story) => {
        const { _id: id } = story || {};
        return id || '';
      }));
    }

    // APD-964 continued, we make the calls and add the promises to the promiseArray
    storyIdsForBulkCalls.forEach((storyIdArray) => {
      const storyIdsString = storyIdArray.join(',');
      const bulkCallUrl = `${CONTENT_BASE}/content/v4/ids?ids=${storyIdsString}&website=${site}&included_fields=content_elements,first_publish_date,streams,related_content`;

      if (storyIdsString) {
        const promise = axios
          .get(bulkCallUrl, {
            headers: {
              Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
            },
          })
          .then((data) => {
            storyData.push(data);
          })
          .catch((error) => {
            console.error('AXIOS CATCH - getStoryData => ', error);
            return error;
          });
        promiseArray.push(promise);
      }
    });

    // APD-964 continued, we take the data we got back from the server and
    // combine with the data we already got from contentElements in this function's params.
    // Note: we only asked the /content/v4/ids api call for content_elements and first_publish_date.
    return Promise.all(promiseArray).then(() => {
      const storyDataArray = [];
      storyData.forEach((sdata) => {
        const { data } = sdata || {};
        const { content_elements: dataContentElements, streams, related_content: relatedContent } = data || {};
        storyDataArray.push(dataContentElements, streams, relatedContent);
      });

      const flattenStoryDataArray = flatten(storyDataArray);

      return contentElements.map((story) => {
        const clonedStory = Object.assign({}, story);
        const { _id: clonedStoryId } = clonedStory || {};

        const contentElementsFromBulkCall = flattenStoryDataArray.filter(flattenStory => flattenStory && flattenStory._id === clonedStoryId);
        const {
          content_elements: contentElementsFromBulkCallForStory,
          first_publish_date: firstPublishDate,
          streams,
          related_content: relatedContent,
        } = contentElementsFromBulkCall && contentElementsFromBulkCall[0];
        return {
          ...clonedStory,
          content_elements: contentElementsFromBulkCallForStory,
          first_publish_date: firstPublishDate,
          streams,
          related_content: relatedContent,
        };
      });
    });
  }
  return null;
};
