import handlePropContentElements from './handlePropContentElements';

export default function getGalleryThumbnail(gallerySources) {
  const {
    article, featuredGallery, leaf, fetched,
  } = gallerySources;
  let basic = null;

  if (article) {
    const articleGallery = handlePropContentElements(article);
    if (!articleGallery) return null;
    basic = articleGallery.promo_items
      && articleGallery.promo_items.basic ? articleGallery.promo_items.basic : null;
  }

  if (featuredGallery) {
    basic = featuredGallery.promo_items
      && featuredGallery.promo_items.basic ? featuredGallery.promo_items.basic : null;
  }

  if (fetched) {
    basic = fetched.promo_items
      && fetched.promo_items.basic ? fetched.promo_items.basic : null;
  }

  if (leaf) {
    return {
      exists: !!(leaf.type === 'image'),
      id: leaf._id || null,
    };
  }

  return {
    exists: !!(basic && basic.type === 'image'),
    id: basic ? basic._id : null,
  };
}
