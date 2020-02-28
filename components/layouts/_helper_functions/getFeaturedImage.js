import { useAppContext } from 'fusion:context';

const renderImage = () => {
  const appContext = useAppContext();
  const {
    globalContent,
    deployment,
    contextPath,
  } = appContext;

  const {
    promo_items: promoItems,
    content_elements: contentElements,
  } = globalContent;
  const { url: featuredImage } = promoItems ? promoItems.basic : {};
  const { url: videoThumbnail } = promoItems && promoItems.basic.promo_image ? promoItems.basic.promo_image : {};
  const { url: galleryThumbnail } = promoItems && promoItems.basic.promo_items ? promoItems.basic.promo_items.basic : {};
  let inlineImage = null;
  let inlineVideoThumbnail = null;

  // if there isn't any featured media, we parse through the contentElements to check for inline images and/or videos
  if (!featuredImage && !videoThumbnail && !galleryThumbnail && contentElements) {
    let foundFirstInline = false;
    contentElements.forEach((el) => {
      if (!foundFirstInline) {
        const {
          type,
          url = null,
          promo_items: inlinePromoItems = {},
        } = el;
        if (type === 'image') {
          inlineImage = url;
          foundFirstInline = true;
        }
        if (type === 'video' && inlinePromoItems.basic && inlinePromoItems.basic.url) {
          inlineVideoThumbnail = inlinePromoItems.basic.url;
          foundFirstInline = true;
        }
      }
    });
  }

  if (featuredImage) {
    return featuredImage;
  }
  if (videoThumbnail) {
    return videoThumbnail;
  }
  if (galleryThumbnail) {
    return galleryThumbnail;
  }
  if (inlineImage) {
    return inlineImage;
  }
  if (inlineVideoThumbnail) {
    return inlineVideoThumbnail;
  }
  return deployment(`${contextPath}/resources/images/logo-ogimage.png`);
};

export default renderImage;
