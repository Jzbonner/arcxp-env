import handlePropContentElements from './handlePropContentElements';

export default function getGalleryThumbnail(gallerySources) {
  const {
    article, featuredGallery, leaf, fetched,
  } = gallerySources;

  console.log('gallerySources', gallerySources);

  if (article) {
    const articleGallery = handlePropContentElements(article);
    console.log('articleGallery', articleGallery);
    if (!articleGallery) return null;
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

  if (fetched) {
    const basic = fetched.promo_items
    && fetched.promo_items.basic ? fetched.promo_items.basic : null;
    return {
      exists: !!(basic.type === 'image'),
      id: basic._id || null,
    };
  }

  return null;
}
