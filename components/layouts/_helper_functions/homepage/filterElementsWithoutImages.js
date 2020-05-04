export default (apiData, currentDisplayClass, requiredClasses) => {
  if (apiData && apiData.content_elements) {
    const newData = apiData;
    if (requiredClasses.some(requiredClass => requiredClass === currentDisplayClass)) {
      newData.content_elements = apiData.content_elements.filter((el) => {
        if (el.type === 'story') {
          if (el.promo_items && el.promo_items.basic && el.promo_items.basic.promo_image && el.promo_items.basic.promo_image.url) {
            return true;
          }
          if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
            return true;
          }
          if (el.firstInlineImage) {
            return true;
          }
        }
        if (el.type === 'video' || el.type === 'gallery') {
          if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
            return true;
          }
        }
        return false;
      });
    }
    return newData;
  }
  return apiData;
};
