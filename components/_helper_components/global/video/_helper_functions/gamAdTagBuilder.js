import getProperties from 'fusion:properties';
import getContentMeta from '../../siteMeta/_helper_functions/getContentMeta';
import checkTags from '../../../../layouts/_helper_functions/checkTags';

const gamAdTagBuilder = (taxonomy) => {
  const { dfp_id: dfpId, adsPath } = getProperties();
  const { primary_section: primarySection, tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');
  if (noAds) {
    return null;
  }
  const { path = '/' } = primarySection || {};
  const topics = [];
  tags.forEach((tag) => {
    if (tag && tag.text) {
      topics.push(tag.text);
    }
  });
  const contentMeta = getContentMeta();
  const {
    environ = '',
    pageContentType,
    topics: pageTopics = [],
    contentId,
  } = contentMeta || {};
  const gamUrl = 'https://securepubads.g.doubleclick.net/gampad/ads';
  const size = 'sz=400x300';
  const uuid = contentId;
  const pageUuid = contentId || uuid;
  const kw = topics.concat(pageTopics);

  // eslint-disable-next-line max-len
  return `${gamUrl}?${size}&iu=/${dfpId}/${environ !== 'prod' ? 'TEST_' : ''}${adsPath}${path}&kw=${kw.join()}&video=${uuid}&cmsid=2511993&obj_type=${pageContentType}&description_url=[description_url]‌&uuid=${pageUuid}&environ=${environ}`;
};

export default gamAdTagBuilder;
