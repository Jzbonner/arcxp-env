import React from 'react';

const ampScriptSwitch = (type, embedArr, content) => {
  if (type === 'raw_html') {
    const pinReg = RegExp('https?://www.pinterest.com/pin/([0-9]{1,25})/?');
    if (pinReg.test(content)) {
      if (!embedArr.some(matchType => matchType === 'pinterest')) {
        embedArr.push('pinterest');
        return <script
                async
                custom-element="amp-pinterest"
                src="https://cdn.ampproject.org/v0/amp-pinterest-0.1.js"
              />;
      }
    }
  }
  switch (type) {
    case 'reddit':
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-reddit"
                src="https://cdn.ampproject.org/v0/amp-reddit-0.1.js"
              />;
      }
      break;
    case ('facebook-post' || 'facebook-video'):
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-facebook"
                src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
              />;
      }
      break;
    case 'twitter':
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-twitter"
                src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
              />;
      }
      break;
    case 'youtube':
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-youtube"
                src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
              />;
      }
      break;
    case 'pinterest':
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-pinterest"
                src="https://cdn.ampproject.org/v0/amp-pinterest-0.1.js"
              />;
      }
      break;
    case 'vimeo':
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-vimeo"
                src="https://cdn.ampproject.org/v0/amp-vimeo-0.1.js"
              />;
      }
      break;
    case 'instagram':
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-instagram"
                src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
              />;
      }
      break;
    case 'soundcloud':
      if (!embedArr.some(matchType => matchType === type)) {
        embedArr.push(type);
        return <script
                async
                custom-element="amp-soundcloud"
                src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"
              />;
      }
      break;
    default:
      return null;
  }
  return null;
};

export default ampScriptSwitch;
