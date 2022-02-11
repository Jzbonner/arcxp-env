import getProperties from 'fusion:properties';
import fetchEnv from '../../_helper_components/global/utils/environment.js';

const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('../../../environment/index');

const currentEnv = fetchEnv();

export default function (url, arcSite = 'ajc', width = 1000, height = 600) {
  if (url) {
    const { cdnOrg, cdnSite } = getProperties(arcSite);
    let siteDomain = `${cdnOrg}-${cdnSite}-sandbox.cdn.arcpublishing.com`;
    if (currentEnv === 'prod') {
      const connextSite = cdnSite.replace(/-/g, '');
      siteDomain = `www.${connextSite === 'journalnews' ? 'journal-news' : connextSite}.com`;
    }

    const thumbor = new Thumbor(
      RESIZER_SECRET_KEY,
      `https://${siteDomain}/resizer`,
    );

    const imageUrl = url.substring(url.indexOf('//') + 2);
    return thumbor
      .setImagePath(imageUrl)
      .resize(width, height)
      .buildUrl();
  }
  return null;
}
