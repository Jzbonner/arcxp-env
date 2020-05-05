export default function getItemThumbnail(promoItems) {
  if (!promoItems || (!promoItems.basic && !promoItems.url)) return null;

  if (promoItems.basic && promoItems.basic.type && promoItems.basic.type === 'image' && promoItems.basic.url) {
    return promoItems.basic.url;
  }

  // gets photo from firstInlineImage Object

  if (promoItems.url) {
    return promoItems.url;
  }

  // lead video or gallery
  if (promoItems.basic && (promoItems.basic.type === 'video' || promoItems.basic.type === 'gallery') && promoItems.basic.promo_items
    && promoItems.basic.promo_items.basic && promoItems.basic.promo_items.basic.type === 'image'
    && promoItems.basic.promo_items.basic.url) {
    return promoItems.basic.promo_items.basic.url;
  }

  return null;
}
