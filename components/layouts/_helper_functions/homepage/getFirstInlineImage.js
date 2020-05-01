/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
import { useContent } from 'fusion:content';
import inlineImageFilter from '../../../../content/filters/inlineImage';

export default (id = '') => new Promise((resolve, reject) => {
  let firstInlineImage = '';

  const storyData = useContent({
    source: 'content-api',
    query: {
      id,
    },
    // filter: inlineImageFilter,
  });

  // console.log('returned: ', storyData);

  if (storyData && storyData.content_elements) {
    for (let i = 0; i < storyData.content_elements.length; i++) {
      if (storyData.content_elements[i].type === 'image') {
        firstInlineImage = storyData.content_elements[i];
        break;
      }
    }
    resolve(firstInlineImage);
  }
});
