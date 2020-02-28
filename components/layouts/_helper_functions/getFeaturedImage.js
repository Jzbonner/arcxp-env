import { useAppContext } from 'fusion:context';
import imageResizer from './Thumbor';

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
  let ogContentImage = null;

  if (featuredImage) {
    ogContentImage = featuredImage;
  } else if (videoThumbnail) {
    ogContentImage = videoThumbnail;
  } else if (galleryThumbnail) {
    ogContentImage = galleryThumbnail;
  } else if (contentElements) {
    let foundFirstInline = false;
    contentElements.forEach((el) => {
      if (!foundFirstInline) {
        const {
          type,
          url = null,
          promo_items: inlinePromoItems = {},
        } = el;
        if (type === 'image') {
          ogContentImage = url;
          foundFirstInline = true;
        }
        if (type === 'video' && inlinePromoItems.basic && inlinePromoItems.basic.url) {
          ogContentImage = inlinePromoItems.basic.url;
          foundFirstInline = true;
        }
      }
    });
  }

  if (ogContentImage) {
    return imageResizer(ogContentImage, 1200, 630);
  }
  return deployment(`${contextPath}/resources/images/logo-ogimage.png`);
};

export default renderImage;
