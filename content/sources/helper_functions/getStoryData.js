/* eslint-disable no-console */
import axios from 'axios';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';

export default (site = 'ajc', contentElements) => {
  if (Array.isArray(contentElements)) {
    const storyData = [];
    const promiseArray = [];

    contentElements.forEach((object, i) => {
      const objectId = object && object._id ? object._id : '';
      const storyUrl = `${CONTENT_BASE}/content/v4/?website=${site}&_id=${objectId}`;

      if (objectId) {
        const promise = axios
          .get(storyUrl, {
            headers: {
              Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
            },
            id: i,
          })
          .then(({ data, config }) => {
            storyData.push({ id: config.id, data });
          });
        promiseArray.push(promise);
      }
    });

    return Promise.all(promiseArray).then(() => {
      const sortedStoryData = [];
      storyData
        .sort((a, b) => a.id - b.id)
        .forEach((content) => {
          sortedStoryData.push(content.data);
        });

      return sortedStoryData.map((sortedStory) => {
        const clonedStory = Object.assign({}, sortedStory);
        const { _id: id } = clonedStory || {};

        const matchingContentElementStory = contentElements.find(el => el && el._id === id);

        const {
          headlines = { basic: '' },
          description = { basic: '' },
          promo_items: promoItems = { basic: { type: '' } },
        } = matchingContentElementStory || {};

        if (headlines.basic) {
          clonedStory.headlines.basic = headlines.basic;
        }

        if (description.basic) {
          clonedStory.description.basic = description.basic;
        }

        if (promoItems.basic.type) {
          clonedStory.promo_items = promoItems;
        }

        return clonedStory;
      });
    });
  }
  return null;
};
