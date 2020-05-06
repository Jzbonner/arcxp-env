import handlePropContentElements from './handlePropContentElements';

export default function getGalleryThumbnail(gallerySources) {
  const {
    article, featuredGallery, leaf, /* feature, */
  } = gallerySources;

  console.log('gallerySources', gallerySources);

  if (article) {
    const articleGallery = handlePropContentElements(article);
    const basic = articleGallery.promo_items
    && articleGallery.promo_items.basic ? articleGallery.promo_items.basic : null;

    return {
      exists: !!(basic.type === 'image'),
      id: basic._id || null,
    };
  }

  if (featuredGallery) {
    const basic = featuredGallery.promo_items
    && featuredGallery.promo_items.basic ? featuredGallery.promo_items.basic : null;
    return {
      exists: !!(basic.type === 'image'),
      id: basic._id || null,
    };
  }

  if (leaf) {
    return {
      exists: !!(leaf.type === 'image'),
      id: leaf._id || null,
    };
  }
  return null;
}
