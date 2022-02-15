import Thumbor from 'thumbor-lite';
import { RESIZER_SECRET_KEY, RESIZER_ALLOWED_DOMAINS } from 'fusion:environment';
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
    srcArray, src, height, width = 1000, srcSetSizes = [], originalHeight, originalWidth, smart, focalCoords, arcSite = 'ajc', isGallery = false,
  }) {
    const fetchImageData = (
      imageSrc, imageHeight, imageWidth, imageSrcSetSizes, originalImageHeight, originalImageWidth, smartCrop, imageFocalCoords,
    ) => {
      const { cdnSite, allowedDimensions } = getProperties(arcSite);
      const thumborKey = RESIZER_SECRET_KEY;
      const allowedDomains = RESIZER_ALLOWED_DOMAINS || [];
      const testSrcAgainstAllowedDomains = (domain) => {
        if (!imageSrc) return false;

        const imageSrcParts = imageSrc.replace(/http(s?):\/\//, '').split('/');
        // we've removed the protocol & split the image's src url into separate parts, by "/"
        const imageDomain = imageSrcParts[0].split('.');
        // now we take that first "part" (the domain) and split it by "."
        const imageParentDomain = `.${imageDomain[imageDomain.length - 2]}.${imageDomain[imageDomain.length - 1]}`;
        // and finally we piece back together the TLD (top level domain), ignoring any subdomain(s), and test it against the whitelisted TLDs
        return imageParentDomain === domain;
      };
      // return null if there is no image src, thumbor key, or the requested src doesn't match approved domains (the latter is re: APD-1698)
      if (!imageSrc || !thumborKey || !allowedDomains.filter(testSrcAgainstAllowedDomains)) return null;
      let reqWidth = imageWidth;
      let reqHeight = imageHeight;


      const buildOutputUrl = (w, h) => {
        const useFocalCrop = imageFocalCoords?.length === 2;
        const focalPoints = {};

        if (useFocalCrop) {
          const { 0: focalX, 1: focalY } = imageFocalCoords;

          // Value of 1.75 means we initially crop a rectangle 1.75x as large as the target image size.
          // The focal point will be at the center of this rectangle or if the focal point is along the edge of the original image,
          // the coordinates of the rectangle will be adjusted so that a rectangle 1.75x as large as the target image size still gets cropped.
          // Decrease this number to get a tighter crop around the focal point.
          const focalCropMultiplier = 1.75;

          // Set the min values to 814x458 so that tease images have the same crop as their corresponding lead images on the story pages
          const focalLeftAdjustment = focalX - (Math.max(w, 814) * 0.5 * focalCropMultiplier);
          const focalRightAdjustment = focalX + (Math.max(w, 814) * 0.5 * focalCropMultiplier);
          const focalTopAdjustment = focalY - (Math.max(h, 458) * 0.5 * focalCropMultiplier);
          const focalBottomAdjustment = focalY + (Math.max(h, 458) * 0.5 * focalCropMultiplier);

          // Crop adjustments if focal point is set along edge of the image
          const focalLeftAdjustmentOver = focalLeftAdjustment < 0 ? Math.abs(focalLeftAdjustment) : 0;
          const focalTopAdjustmentOver = focalTopAdjustment < 0 ? Math.abs(focalTopAdjustment) : 0;
          const focalRightAdjustmentOver = focalRightAdjustment > originalImageWidth ? Math.abs(originalImageWidth - focalRightAdjustment) : 0;
          const focalBottomAdjustmentOver = focalBottomAdjustment > originalImageHeight ? Math.abs(originalImageHeight - focalBottomAdjustment) : 0;

          focalPoints.left = Math.max(Math.round(focalLeftAdjustment - focalRightAdjustmentOver), 0);
          focalPoints.right = Math.min(Math.round(focalRightAdjustment + focalLeftAdjustmentOver), originalImageWidth);
          focalPoints.top = Math.max(Math.round(focalTopAdjustment - focalBottomAdjustmentOver), 0);
          focalPoints.bottom = Math.min(Math.round(focalBottomAdjustment + focalTopAdjustmentOver), originalImageHeight);
        }

        const connextSite = cdnSite.replace(/-/g, '');
        const siteDomain = `${currentEnv === 'prod' ? 'www' : 'sandbox'}.${connextSite === 'journalnews' ? 'journal-news' : connextSite}.com`;

        const resizerUrl = `https://${siteDomain}/resizer`;
        const imageUrl = imageSrc.substring(imageSrc.indexOf('//') + 2);
        const thumbor = new Thumbor(thumborKey, resizerUrl);
        if (!imageUrl) return null;
        const imagePath = thumbor.setImagePath(encodeSrc(imageUrl));
        let croppedUrl = imagePath;
        let resizedUrl = imagePath;
        if (isGallery) {
          // if it's a gallery image/request we don't want to crop it; instead, we "fit in" the 720x480 "hole"
          resizedUrl = imagePath.fitIn(w, h); // .exf(w, h);
        } else {
          croppedUrl = (useFocalCrop) ? imagePath.crop(focalPoints.left, focalPoints.top, focalPoints.right, focalPoints.bottom) : imagePath;
          resizedUrl = croppedUrl.resize(w, h);
        }
        const thumborUrl = (smartCrop) ? resizedUrl.smartCrop(true) : resizedUrl;
        const outputUrl = thumborUrl.buildUrl();
        return outputUrl;
      };

      if (imageSrcSetSizes?.length) {
        const outputUrlArray = [];
        imageSrcSetSizes.forEach((size) => {
          reqWidth = size[0] || imageWidth;
          reqHeight = size[1] || imageHeight || 0; // Used to resize the image proportionally
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
    };

    if (Array.isArray(srcArray)) {
      // it's a request for multiple images, so fetch each item and return an array of the resultant images
      const fetchedResponse = [];
      srcArray.forEach((imageObj) => {
        const {
          src: imageSrc, height: imageHeight, width: imageWidth, srcSetSizes: imageSrcSetSizes, originalWidth: originalImageWidth, originalHeight: originalImageHeight, smart: imageSmart, focalCoords: imageFocalCoords,
        } = imageObj;
        fetchedResponse.push(fetchImageData(imageSrc, imageHeight, imageWidth, imageSrcSetSizes, originalImageHeight, originalImageWidth, imageSmart, imageFocalCoords));
      });
      return fetchedResponse;
    }

    // no passed-in array and no src, so return null
    if (!src) {
      return null;
    }

    // it was a request for a single image, so pass-through the params
    return fetchImageData(src, height, width, srcSetSizes, originalHeight, originalWidth, smart, focalCoords);
  },
  params: {
    srcArray: 'array',
    src: 'text',
    height: 'number',
    width: 'number',
    srcSetSizes: 'array',
    originalHeight: 'number',
    originalWidth: 'number',
    smart: 'boolean',
    focalCoords: 'array',
    arcSite: 'text',
    isGallery: 'boolean',
  },
  ttl: 120,
};
