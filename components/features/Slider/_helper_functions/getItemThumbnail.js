export default function getItemThumbnail(promoItems) {
  if (!promoItems || !promoItems.basic) return null;

  if (promoItems.basic.type && promoItems.basic.type === 'image' && promoItems.basic.url) {
    // debugger;
    return promoItems.basic.url;
  }

  // getting nested image url if parent promo_item is type video
  if (promoItems.basic && promoItems.basic.type === 'video' && promoItems.basic.promo_items
    && promoItems.basic.promo_items.basic && promoItems.basic.promo_items.basic.type === 'image'
    && promoItems.basic.promo_items.basic.url) {
    return promoItems.basic.promo_items.basic.url;
  }
  // debugger;

  return null;
}
