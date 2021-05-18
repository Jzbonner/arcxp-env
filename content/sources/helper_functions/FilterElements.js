export default (apiData, requiresImageEveryX) => {
  if (apiData) {
    let newData = apiData;
    let hasImageIndex = 1;
    newData = apiData.filter((el, e) => {
      let hasImage = false;
      if (!el.canonical_url) return false;

      /* featured image (re)assignments */
      if (el.promo_items) {
        /* check for promo image (collection override(s)) before anything else and regardless of content type */
        if (el.promo_items.basic && el.promo_items.basic.promo_image && el.promo_items.basic.promo_image.url) {
          newData[e].teaseImageObject = el.promo_items.basic.promo_image;
          hasImage = true;
          /* no promo image, so now do the usual cascade to find the appropriate promo item */
        } else if (el.promo_items.basic && el.promo_items.basic.url) {
          /* top-level promo item */
          newData[e].teaseImageObject = el.promo_items.basic;
          hasImage = true;
        } else if (el.promo_items.basic.promo_items && el.promo_items.basic.promo_items.basic && el.promo_items.basic.promo_items.basic.url) {
          /* second-level promo item (i.e. video or gallery as primary) */
          newData[e].teaseImageObject = el.promo_items.basic.promo_items.basic;
          hasImage = true;
        }
      } else if (el.firstInlineImage) {
        /* final option:  first inline image */
        newData[e].teaseImageObject = el.firstInlineImage;
        hasImage = true;
      }

      if (typeof requiresImageEveryX === 'number' && !hasImage && (requiresImageEveryX === 0 || hasImageIndex % requiresImageEveryX === 0)) {
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
