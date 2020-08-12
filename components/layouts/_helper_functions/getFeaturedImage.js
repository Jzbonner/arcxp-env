import { useAppContext, useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import getDomain from './getDomain';
import imageResizer from './Thumbor';

const renderImage = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const appContext = useAppContext();
  const {
    globalContent,
    deployment,
    contextPath,
    metaValue,
    layout,
  } = appContext;

  const { logoOgImage, cdnSite } = getProperties(arcSite);
  const {
    promo_items: promoItems,
    content_elements: contentElements,
  } = globalContent || {};

  const {
    url: featuredImage,
    promo_image: promoImage,
  } = promoItems && promoItems.basic ? promoItems.basic : {};
  const {
    url: videoThumbnail,
  } = promoImage || {};
  const {
    promo_items: galleryPromoItems,
  } = promoItems && promoItems.basic ? promoItems.basic : {};
  const {
    url: galleryThumbnail,
  } = galleryPromoItems && galleryPromoItems.basic ? galleryPromoItems.basic : {};
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
  } else if (metaValue('image') || metaValue('thumbnail') || metaValue('og:image')) {
    ogContentImage = metaValue('image') || metaValue('thumbnail') || metaValue('og:image');
  }

  if (ogContentImage) {
    return imageResizer(ogContentImage, arcSite, 1200, 630);
  }
  return `${getDomain(layout, cdnSite, arcSite)}${deployment(`${contextPath}${logoOgImage}`)}`;
};

export default renderImage;
