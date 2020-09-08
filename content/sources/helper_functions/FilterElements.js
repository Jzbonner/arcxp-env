export default (apiData, currentDisplayClass = '', requiredClasses = []) => {
  if (apiData) {
    let newData = apiData;
    if (requiredClasses.some(requiredClass => requiredClass === currentDisplayClass)) {
      newData = apiData.filter((el) => {
        if (el.type === 'story') {
          if (
            el.promo_items
            && el.promo_items.basic
            && el.promo_items.basic.promo_image
            && el.promo_items.basic.promo_image.url
          ) {
            return true;
          }
          if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
            return true;
          }

          if (
            (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'video')
            || (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'gallery')
          ) {
            if (el.promo_items.basic.promo_items && el.promo_items.basic.promo_items.basic && el.promo_items.basic.promo_items.basic.url) {
              return true;
            }
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
