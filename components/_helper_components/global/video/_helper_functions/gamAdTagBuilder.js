import getProperties from 'fusion:properties';
import { useFusionContext, useAppContext } from 'fusion:context';
import getContentMeta from '../../siteMeta/_helper_functions/getContentMeta';
import checkTags from '../../../../layouts/_helper_functions/checkTags';

const gamAdTagBuilder = (pageTax = {}, videoTax = {}, videoId, currentEnv, videoPageUrl) => {
  const fusionContext = useFusionContext();
  const appContext = useAppContext();
  const { metaValue } = appContext;
  const { arcSite } = fusionContext;
  const { dfp_id: dfpId, adsPath, video } = getProperties(arcSite);
  const { primary_section: primarySection, tags: pageTags } = pageTax || {};
  const { tags: videoTags } = videoTax || {};
  const { cmsId } = video[currentEnv] || {};
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
  const pagebuilderTopics = metaValue('topics') || [];
  const contentMeta = getContentMeta();
  const {
    environ = '',
    pageContentType,
    contentId,
  } = contentMeta || {};
  const gamUrl = 'https://securepubads.g.doubleclick.net/gampad/ads';
  const size = 'sz=400x300';
  const pageUuid = contentId || videoId;
  const kw = pagebuilderTopics.length ? videoTopics.concat(pageTopics, pagebuilderTopics.replace(/ |"/g, '').split(',')) : videoTopics.concat(pageTopics);
  let descriptionUrl = `${typeof window !== 'undefined' ? `https://${window.location.hostname}` : ''}${videoPageUrl}`;
  descriptionUrl = encodeURIComponent(descriptionUrl);

  // eslint-disable-next-line max-len
  return `${gamUrl}?${size}&iu=/${dfpId}/${currentEnv !== 'prod' ? 'TEST_' : ''}${adsPath}${path === '/' ? '' : path}&env=vp&gdfp_req=1&output=vast&impl=s&unviewed_position_start=1&cmsid=${cmsId}&vid=${videoId}&description_url=${descriptionUrl}‌&cust_params=kw=${kw.join()}%26topics=${kw.join()}%26video=${videoId}%26uuid=${pageUuid}%26obj_type=${pageContentType}%26environ=${environ}`;
};

export default gamAdTagBuilder;
