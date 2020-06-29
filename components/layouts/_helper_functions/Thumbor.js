import getProperties from 'fusion:properties';

const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('../../../environment/index');

export default function (url, arcSite = 'ajc', width = 1000, height = 600) {
  if (url) {
    const { cdnOrg, cdnSite } = getProperties(arcSite);

    const thumbor = new Thumbor(RESIZER_SECRET_KEY, `http://${cdnOrg}-${cdnSite}-sandbox.cdn.arcpublishing.com/resizer`);

    const imageUrl = url.substring(url.indexOf('//') + 2);
    return thumbor
      .setImagePath(imageUrl)
      .resize(width, height)
      .buildUrl();
  }
  return null;
}
