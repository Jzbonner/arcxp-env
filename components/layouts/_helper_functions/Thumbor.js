const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('./../../../environment/index');

const thumbor = new Thumbor(RESIZER_SECRET_KEY, 'http://resizer.arcpublishing.com');

export default function (url, width, height) {
  return thumbor
    .setImagePath(url)
    .resize(width, height)
    .buildUrl();
}
