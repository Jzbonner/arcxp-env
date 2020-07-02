import getProperties from 'fusion:properties';
import { video } from 'fusion:environment';
import getContentMeta from '../../siteMeta/_helper_functions/getContentMeta';
import checkTags from '../../../../layouts/_helper_functions/checkTags';

const gamAdTagBuilder = (pageTaxonomy = {}, videoTaxonomy = {}, videoId, currentEnv, videoPageUrl) => {
  const { dfp_id: dfpId, adsPath } = getProperties();
  const { primary_section: primarySection, tags: pageTags } = pageTaxonomy || {};
  const { tags: videoTags } = videoTaxonomy || {};
  const { cmsId = '' } = video || {};
  let noPageAds = false;
  let noVideoAds = false;
  if (videoTags) {
    noVideoAds = checkTags(videoTags, 'no-ads');
  }
  if (pageTags) {
    noPageAds = checkTags(pageTags, 'no-ads');
  }
  if (noVideoAds || noPageAds) {
    return null;
  }
  const { path = '' } = primarySection || {};
  const pageTopics = [];
  if (pageTags) {
    pageTags.forEach((pageTag) => {
      if (pageTag && pageTag.text) {
        pageTopics.push(pageTag.text);
      }
    });
  }
  const videoTopics = [];
  if (videoTags) {
    videoTags.forEach((videoTag) => {
      if (videoTag && videoTag.text) {
        videoTopics.push(videoTag.text);
      }
    });
  }
  const contentMeta = getContentMeta();
  const {
    environ = '',
    pageContentType,
    contentId,
  } = contentMeta || {};
  const gamUrl = 'https://securepubads.g.doubleclick.net/gampad/ads';
  const size = 'sz=400x300';
  const pageUuid = contentId || videoId;
  const kw = videoTopics.concat(pageTopics);
  let descriptionUrl = `${typeof window !== 'undefined' ? `https://${window.location.hostname}` : ''}${videoPageUrl}`;
  descriptionUrl = encodeURIComponent(descriptionUrl);

  // eslint-disable-next-line max-len
  return `${gamUrl}?${size}&iu=${dfpId}/${currentEnv !== 'prod' ? 'TEST_' : ''}${adsPath}${path === '/' ? '' : path}&kw=${kw.join()}&video=${videoId}&cmsid=${cmsId}&obj_type=${pageContentType}&description_url=${descriptionUrl}‌&uuid=${pageUuid}&environ=${environ}`;
};

export default gamAdTagBuilder;
