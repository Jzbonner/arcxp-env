import Thumbor from 'thumbor-lite';
import { RESIZER_SECRET_KEY } from 'fusion:environment';
import getProperties from 'fusion:properties';
import fetchEnv from '../../components/_helper_components/global/utils/environment';

const currentEnv = fetchEnv();

function encodeSrc(src) {
  return src
    .replace(/^https?:\/\//, '')
    .replace(' ', '%20')
    .replace('?', '%3F');
}

export default {

  fetch({
    src, height = 600, width = 1000, srcSetSizes = [], originalHeight, originalWidth, smart, focalCoords, arcSite,
  }) {
    const { cdnSite, allowedDimensions } = getProperties(arcSite);
    if (!src) return null;
    let reqWidth = width;
    let reqHeight = height;
    const buildOutputUrl = (w, h) => {
      const useFocalCrop = focalCoords?.length === 2;
      const focalPoints = {};

      if (useFocalCrop) {
        const { 1: focalY } = focalCoords;
        // let's figure out how much to crop to keep the FP centered
        const topCrop = focalY / originalHeight;
        // let's figure out how much to crop to match
        const cropHeight = Math.round(originalHeight - (originalWidth * h / w));
        focalPoints.left = 0;
        focalPoints.right = originalWidth;
        focalPoints.top = cropHeight >= 0 ? Math.round(cropHeight * topCrop) : 0;
        focalPoints.bottom = cropHeight - focalPoints.top > originalHeight ? cropHeight : originalHeight - (cropHeight - focalPoints.top);
      }

      const connextSite = cdnSite.replace(/-/g, '');
      const siteDomain = `${currentEnv === 'prod' ? 'www' : 'sandbox'}.${connextSite === 'journalnews' ? 'journal-news' : connextSite}.com`;

      const resizerUrl = `https://${siteDomain}/resizer`;
      const imageUrl = src.substring(src.indexOf('//') + 2);
      const thumbor = new Thumbor(RESIZER_SECRET_KEY, resizerUrl);
      const imagePath = thumbor.setImagePath(encodeSrc(imageUrl));
      const croppedUrl = (useFocalCrop) ? imagePath.crop(focalPoints.left, focalPoints.top, focalPoints.right, focalPoints.bottom) : imagePath;
      const resizedUrl = croppedUrl.resize(w, h);
      const thumborUrl = (smart) ? resizedUrl.smartCrop(true) : resizedUrl;
      const outputUrl = thumborUrl.buildUrl();
      return outputUrl;
    };

    if (srcSetSizes?.length) {
      const outputUrlArray = [];
      srcSetSizes.forEach((size) => {
        reqWidth = size[0] || width;
        reqHeight = size[1] || height;
        const imgDimensions = [reqWidth, reqHeight];
        const isInDimensions = allowedDimensions.find((item) => {
          if (item[0] === imgDimensions[0] && item[1] === imgDimensions[1]) return true;
          return false;
        });

        // Return null if the requested size dimensions aren't in the whitelist.
        // This prevents spamming the resizer for images at misc dimensions
        if (!isInDimensions) {
          reqWidth = 500;
          reqHeight = 282;
        }
        return outputUrlArray.push({ src: buildOutputUrl(reqWidth, reqHeight) });
      });
      return outputUrlArray;
    }

    return { src: buildOutputUrl(reqWidth, reqHeight) };
  },
  params: {
    src: 'text',
    height: 'number',
    width: 'number',
    srcSetSizes: 'array',
    originalHeight: 'number',
    originalWidth: 'number',
    smart: 'boolean',
    focalCoords: 'array',
  },
  ttl: 86400,
};
