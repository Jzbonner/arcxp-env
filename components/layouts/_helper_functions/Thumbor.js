const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('./../../../environment/index');

const thumbor = new Thumbor(RESIZER_SECRET_KEY, 'http://thumbor-prod-us-east-1.photo.aws.arc.pub');

export default function (url, width, height) {
  return thumbor
    .setImagePath('arc-anglerfish-arc2-sandbox-sandbox-ajc.s3.amazonaws.com/public/Q7YMNLI7JJANTLMR4HOJ45L7JQ.jpg')
    .resize(width, height)
    .buildUrl();
}
