import { useAppContext } from 'fusion:context';
import { RESIZER_SECRET_KEY } from 'fusion:environment';
import getProperties from 'fusion:properties';
import Thumbor from 'thumbor-lite';
import getDomain from './getDomain';
import fetchEnv from '../../_helper_components/global/utils/environment';

const currentEnv = fetchEnv();

function encodeSrc(src) {
  return src
    .replace(/^https?:\/\//, '')
    .replace(' ', '%20')
    .replace('?', '%3F');
}

const renderImage = () => {
  const appContext = useAppContext();
  const {
    arcSite,
    globalContent,
    deployment,
    contextPath,
    metaValue,
    layout,
  } = appContext;

  const { logoOgImage, cdnSite, cdnOrg } = getProperties(arcSite);
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
    const connextSite = cdnSite.replace(/-/g, '');
    const siteDomain = `${currentEnv === 'prod' ? 'www' : 'sandbox'}.${connextSite === 'journalnews' ? 'journal-news' : connextSite}.com`;

    const resizerUrl = `https://${siteDomain}/resizer`;
    const imageUrl = ogContentImage.substring(ogContentImage.indexOf('//') + 2);
    const thumbor = new Thumbor(RESIZER_SECRET_KEY, resizerUrl);
    if (!imageUrl) return null;
    const imagePath = thumbor.setImagePath(encodeSrc(imageUrl));
    const resizedUrl = imagePath.resize(1200, 630);
    return resizedUrl.buildUrl();
  }
  return `${getDomain(layout, cdnSite, arcSite, cdnOrg)}${deployment(`${contextPath}${logoOgImage}`)}`;
};

export default renderImage;
