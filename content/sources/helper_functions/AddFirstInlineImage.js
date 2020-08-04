export default (data, arcSite, currentDisplayClass = '', requiredClasses = []) => {
  const collectionElements = data;

  if (requiredClasses.some(requiredClass => requiredClass === currentDisplayClass)) {
    collectionElements.forEach((el, e) => {
      if (el.type === 'story' && !el.promo_items && el.content_elements) {
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
