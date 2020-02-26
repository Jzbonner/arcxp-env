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
  const { url: inlineImage } = contentElements && contentElements[0] ? contentElements[0] : {};
  const { url: inlineVideoThumbnail } = contentElements
  && contentElements[0] && contentElements[0].promo_image ? contentElements[0].promo_image : {};

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
