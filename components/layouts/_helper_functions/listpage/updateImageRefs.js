const updateImageRefs = (apiData = []) => {
  const newData = apiData;
  apiData.forEach((el, e) => {
    if (el.type === 'story') {
      if (
        el.promo_items
        && el.promo_items.basic
        && el.promo_items.basic.promo_image
        && el.promo_items.basic.promo_image.url
      ) {
        newData[e].teaseImageObject = el.promo_items.basic.promo_image;
      }
      if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
        newData[e].teaseImageObject = el.promo_items.basic;
      }

      if (
        (el.promo_items
          && el.promo_items.basic
          && el.promo_items.basic.type === 'video')
        || (el.promo_items
          && el.promo_items.basic
          && el.promo_items.basic.type === 'gallery')
      ) {
        if (
          el.promo_items.basic.promo_items
          && el.promo_items.basic.promo_items.basic
          && el.promo_items.basic.promo_items.basic.url
        ) {
          newData[e].teaseImageObject = el.promo_items.basic.promo_items.basic;
        }
      }

      if (el.firstInlineImage) {
        newData[e].teaseImageObject = el.firstInlineImage;
      }
    }
    if (el.type === 'video' || el.type === 'gallery') {
      if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
        newData[e].teaseImageObject = el.promo_items.basic;
      }
    }
  });
  return newData;
};

export default updateImageRefs;
