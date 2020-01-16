const Thumbor = require('thumbor-lite');
const { RESIZER_SECRET_KEY } = require('./../../../environment/index');

const thumbor = new Thumbor(RESIZER_SECRET_KEY, 'http://resizer.arcpublishing.com/');

export default function (url, width, height) {
  return thumbor
    .setImagePath('arc-anglerfish-arc2-sandbox-sandbox-ajc.s3.amazonaws.com/public/Q7YMNLI7JJANTLMR4HOJ45L7JQ.jpg')
    .resize(width, height)
    .buildUrl();
}


// const thumborUrl = thumbor
//   .setImagePath('img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2015/03/04/Style/Images/Britain_Glastonbury_Music_Festival_Day_4-0d9e1.jpg')
//   .resize(150, 250)
//   .buildUrl();

//console.log(thumborUrl);
