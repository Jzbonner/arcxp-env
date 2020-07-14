import getProperties from 'fusion:properties';
import fetchEnv from '../../_helper_components/global/utils/environment.js';

const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('../../../environment/index');

const currentEnv = fetchEnv();

export default function (url, arcSite = 'ajc', width = 1000, height = 600) {
  if (url) {
    const { cdnOrg, cdnSite } = getProperties(arcSite);

    const thumbor = new Thumbor(
      RESIZER_SECRET_KEY,
      `https://${cdnOrg}-${cdnSite}-${currentEnv !== 'prod' ? 'sandbox' : 'prod'}.cdn.arcpublishing.com/resizer`,
    );

    const imageUrl = url.substring(url.indexOf('//') + 2);
    return thumbor
      .setImagePath(imageUrl)
      .resize(width, height)
      .buildUrl();
  }
  return null;
}
