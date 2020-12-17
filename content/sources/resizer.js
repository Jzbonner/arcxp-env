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
    src, height = 600, width = 1000, smart, focalCoords, arcSite,
  }) {
    let reqWidth = width;
    let reqHeight = height;
    const { cdnOrg, cdnSite, allowedDimensions } = getProperties(arcSite);
    const imgDimensions = [reqWidth, reqHeight];
    const isInDimensions = allowedDimensions.find((item) => {
      if (item[0] === imgDimensions[0] && item[1] === imgDimensions[1]) return true;
      return false;
    });
    const useFocalCrop = focalCoords.length === 2;
    const focalPoints = {};

    // Return null if the requested size dimensions aren't in the whitelist.
    // This prevents spamming the resizer for images at misc dimensions
    if (!isInDimensions) {
      reqWidth = 500;
      reqHeight = 282;
    }

    if (useFocalCrop) {
      const { 0: focalX, 1: focalY } = focalCoords;
      const focalOffsetX = reqWidth / 2;
      const focalOffsetY = reqHeight / 2;
      focalPoints.left = focalX - focalOffsetX;
      focalPoints.top = focalY - focalOffsetY;
      focalPoints.right = focalX + focalOffsetX;
      focalPoints.bottom = focalY + focalOffsetY;

      // additional logic to handle negative values (i.e. the focal point is less than half width or height distance from edge of photo)
      if (focalPoints.left < 0) {
        focalPoints.right -= focalPoints.left; // subtract a negative = positive
        focalPoints.left = 0;
      }
      if (focalPoints.right < 0) {
        focalPoints.left -= focalPoints.right; // subtract a negative = positive
        focalPoints.right = 0;
      }
      if (focalPoints.top < 0) {
        focalPoints.bottom -= focalPoints.top; // subtract a negative = positive
        focalPoints.top = 0;
      }
      if (focalPoints.bottom < 0) {
        focalPoints.top -= focalPoints.bottom; // subtract a negative = positive
        focalPoints.bottom = 0;
      }
    }

    let siteDomain = `${cdnOrg}-${cdnSite}-sandbox.cdn.arcpublishing.com`;
    if (currentEnv === 'prod') {
      const connextSite = cdnSite.replace(/-/g, '');
      siteDomain = `www.${connextSite === 'journalnews' ? 'journal-news' : connextSite}.com`;
    }

    const resizerUrl = `https://${siteDomain}/resizer`;
    const imageUrl = src.substring(src.indexOf('//') + 2);
    const thumbor = new Thumbor(RESIZER_SECRET_KEY, resizerUrl);
    const imagePath = thumbor.setImagePath(encodeSrc(imageUrl));
    const resizedUrl = (useFocalCrop) ? imagePath.crop(focalPoints.left, focalPoints.top, focalPoints.right, focalPoints.bottom) : imagePath.resize(reqWidth, reqHeight);
    const thumborUrl = (smart) ? resizedUrl.smartCrop(true) : resizedUrl;
    const outputUrl = thumborUrl.buildUrl();

    return { src: outputUrl };
  },
  params: {
    src: 'text',
    height: 'number',
    width: 'number',
    smart: 'boolean',
    focalCoords: 'array',
  },
  ttl: 120,
};
