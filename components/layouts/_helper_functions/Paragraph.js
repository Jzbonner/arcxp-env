import isNotBR from './BR';

const paragraphTypes = ['text', 'video', 'image', 'raw_html', 'table', 'gallery', 'oembed_response', 'list', 'aligned_elements'];

export const isParagraph = type => paragraphTypes.includes(type);

export const paragraphCounter = (elements = []) => {
  let count = 0;

  elements.forEach((element) => {
    const { type } = element || {};

    if (isParagraph(type) && isNotBR(element)) {
      count += 1;
    }
  });
  return count;
};
