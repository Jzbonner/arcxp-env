export default function getItemThumbnail(promoItems) {
  if (promoItems.basic && promoItems.basic.type) {
    if (promoItems.basic.type === 'image') {
      return promoItems.basic;
    }

    if (promoItems.basic.type === 'video' || promoItems.basic.type === 'gallery') {
      if (promoItems.basic.promo_items && promoItems.basic.promo_items.basic && promoItems.basic.promo_items.basic.type === 'image') {
        return promoItems.basic.promo_items.basic;
      }
    }
  }

  // gets photo from firstInlineImage Object
  if (promoItems.url) {
    return promoItems;
  }

  return null;
}
