import { CONTENT_BASE } from 'fusion:environment';
import axios from 'axios';

export default (data, arcSite) => {
  const collectionElements = data;
  const promiseArray = [];

  collectionElements.content_elements.forEach((el, e) => {
    if (el.type === 'story' && !el.promo_items) {
      const storyURL = `${CONTENT_BASE}/content/v4/?website=${arcSite}&_id=${el._id}`;

      const promise = axios
        .get(storyURL)
        .then(({ data: storyData }) => storyData)
        .then((storyData) => {
          if (storyData.content_elements) {
            for (let i = 0; i < storyData.content_elements.length; i += 1) {
              if (storyData.content_elements[i].type === 'image') {
                return storyData.content_elements[i];
              }
            }
          }
          return null;
        })
        .then((firstInlineImage) => {
          if (firstInlineImage) {
            collectionElements.content_elements[e].firstInlineImage = firstInlineImage;
            return collectionElements;
          }
          return null;
        });

      promiseArray.push(promise);
    }
  });
  return Promise.all(promiseArray).then(() => collectionElements);
};
