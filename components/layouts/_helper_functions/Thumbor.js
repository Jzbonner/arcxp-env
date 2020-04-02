const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('./../../../environment/index');

const thumbor = new Thumbor(RESIZER_SECRET_KEY, 'http://resizer.arcpublishing.com');

export default function (url, width = 1000, height = 600) {
  if (url) {
    return thumbor
      .smartCrop(true)
      .setImagePath(url)
      .resize(width, height)
      .buildUrl();
  }
  return null;
}
