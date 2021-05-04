export default (data, currentDisplayClass = '', requiredClasses = []) => {
  const collectionElements = data;

  if (requiredClasses.some(requiredClass => requiredClass === currentDisplayClass)) {
    collectionElements.forEach((el, e) => {
      if (el.type === 'story' && !el.promo_items?.basic?.url && el.content_elements) {
        for (let i = 0; i < el.content_elements.length; i += 1) {
          if (el.content_elements[i].type === 'image') {
            collectionElements[e].firstInlineImage = el.content_elements[i];
          }
        }
      }
    });
  }
  return collectionElements;
};
