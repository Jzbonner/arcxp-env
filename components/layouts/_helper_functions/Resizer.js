const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('../../../environment/index');

const thumbor = new Thumbor(RESIZER_SECRET_KEY, 'http://ajc-ajc-sandbox.cdn.arcpublishing.com/resizer');

export default function (url, width = 1000, height = 600) {
  if (url) {
    const imageUrl = url.substring(url.indexOf('//') + 2);
    return thumbor.setImagePath(imageUrl).resize(width, height).buildUrl();
  }
  return null;
}
