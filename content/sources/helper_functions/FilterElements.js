export default (apiData, requiresImageEveryX) => {
  if (apiData) {
    let newData = apiData;
    let hasImageIndex = 1;
    newData = apiData.filter((el, e) => {
      let hasImage = false;
      if (!el.canonical_url) return false;

      /* image (re)assignments */
      if (el.type === 'story') {
        if (
          el.promo_items
          && el.promo_items.basic
          && el.promo_items.basic.promo_image
          && el.promo_items.basic.promo_image.url
        ) {
          newData[e].teaseImageObject = el.promo_items.basic.promo_image;
          hasImage = true;
        }
        if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
          newData[e].teaseImageObject = el.promo_items.basic;
          hasImage = true;
        }

        if (
          (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'video')
          || (el.promo_items && el.promo_items.basic && el.promo_items.basic.type === 'gallery')
        ) {
          if (el.promo_items.basic.promo_items && el.promo_items.basic.promo_items.basic && el.promo_items.basic.promo_items.basic.url) {
            newData[e].teaseImageObject = el.promo_items.basic.promo_items.basic;
            hasImage = true;
          }
        }

        if (el.firstInlineImage) {
          newData[e].teaseImageObject = el.firstInlineImage;
          hasImage = true;
        }
      }
      if (el.type === 'video' || el.type === 'gallery') {
        if (el.promo_items && el.promo_items.basic && el.promo_items.basic.url) {
          newData[e].teaseImageObject = el.promo_items.basic;
          hasImage = true;
        }
      }

      if (requiresImageEveryX && hasImageIndex % requiresImageEveryX === 0 && !hasImage) {
        // final filter for display classes that require images
        return false;
      }
      hasImageIndex += 1;
      return true;
    });
    return newData;
  }
  return apiData;
};
