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
    src, height = 600, width = 1000, smart, arcSite,
  }) {
    let reqWidth = width;
    let reqHeight = height;
    const { cdnOrg, cdnSite, allowedDimensions } = getProperties(arcSite);
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

    let siteDomain = `${cdnOrg}-${cdnSite}-sandbox.cdn.arcpublishing.com`;
    if (currentEnv === 'prod') {
      const connextSite = cdnSite.replace(/-/g, '');
      siteDomain = `www.${connextSite === 'journalnews' ? 'journal-news' : connextSite}.com`;
    }

    const resizerUrl = `https://${siteDomain}/resizer`;
    const imageUrl = src.substring(src.indexOf('//') + 2);
    const thumbor = new Thumbor(RESIZER_SECRET_KEY, resizerUrl);
    const resizedUrl = thumbor.setImagePath(encodeSrc(imageUrl)).resize(reqWidth, reqHeight);
    const thumborUrl = (smart) ? resizedUrl.smartCrop(true) : resizedUrl;
    const outputUrl = thumborUrl.buildUrl();

    return { src: outputUrl };
  },
  params: {
    src: 'text',
    height: 'number',
    width: 'number',
    smart: 'boolean',
  },
  ttl: 120,
};
