export default (apiData, requiresImageEveryX, feature) => {
  if (apiData) {
    let newData = apiData;
    let hasImageIndex = 1;
    newData = apiData.filter((el, e) => {
      let hasImage = false;
      if (!el || !el.canonical_url) return false;
      const { promo_items: rootPromoItems = {} } = el;
      const { basic: rootPromoItemsBasic = {} } = rootPromoItems;
      const { promo_image: promoImage, promo_items: nestedPromoItems = {} } = rootPromoItemsBasic;
      const { basic: nestedPromoItemsBasic } = nestedPromoItems;

      /* featured image (re)assignments */
      if (el.promo_items) {
        /* check for promo image (collection override(s)) before anything else and regardless of content type */
        if (promoImage && promoImage.url) {
          newData[e].teaseImageObject = promoImage;
          hasImage = true;
          /* no promo image, so now do the usual cascade to find the appropriate promo item */
        } else if (rootPromoItemsBasic && rootPromoItemsBasic.url) {
          /* top-level promo item */
          newData[e].teaseImageObject = rootPromoItemsBasic;
          hasImage = true;
        } else if (nestedPromoItemsBasic && nestedPromoItemsBasic.url) {
          /* second-level promo item (i.e. video or gallery as primary) */
          newData[e].teaseImageObject = nestedPromoItemsBasic;
          hasImage = true;
        }
      } else if (el.firstInlineImage) {
        /* final option:  first inline image */
        newData[e].teaseImageObject = el.firstInlineImage;
        hasImage = true;
      }

      // Small edge case where if query item isnt the first then the item automatically passes the filter. This is because certain display classes only require the first image to be present.
      if (feature === 'TopPhotoNoPhoto') {
        if (!hasImage && e !== 0) {
          return true;
        }
      }

      // Left Photo no Photo (Standalone) only requires the first story and the first story of the second column to have an image
      if (feature === 'LeftPhotoNoPhoto') {
        if (!hasImage && (e !== 0 || e !== 4)) {
          return true;
        }
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
