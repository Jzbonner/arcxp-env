import getProperties from 'fusion:properties';
import { ENVIRONMENT } from 'fusion:environment';

const gamAdTagBuilder = (taxonomy) => {
  console.log('carlos', taxonomy);
  const { dfp_id: dfpid, adsPath } = getProperties();
  const { primary_section: primarySection, tags = [] } = taxonomy || {};
  const { path = '/' } = primarySection || {};
  const topics = [];
  tags.forEach((tag) => {
    if (tag && tag.text) {
      topics.push(tag.text);
    }
  });
  const currentEnv = ENVIRONMENT || 'unknown';
  const gamUrl = 'https://pubads.g.doubleclick.net/gampad/ads';
  const size = 'sz=400x300';

  return `${gamUrl}?${size}&iu=/${dfpid}/${currentEnv.toLowerCase().indexOf('prod') === -1 ? 'TEST_' : ''}${adsPath}${path}`;
};

export default gamAdTagBuilder;


// https://pubads.g.doubleclick.net/gampad/ads
// ?sz=400x300&iu=/21849707860/atlanta_np/ajc_web_default
// &cmsid=2511993&vid=ANV_ANV_[[VIDEO_ID
