/* eslint-disable no-nested-ternary */
import getVideoAuthor from './getVideoAuthor';
import mediaObj from './mediaObj';

export const getMediaContent = (type, siteID, globalContent, promoItems, newsletterFeed = false, standardFeed = false) => {
  let formattedMediaContent = [];
  let formatterGalleryArray = [];
  let leadObject = {};


  const standaloneGallery = type === 'gallery';
  const { basic = {} } = promoItems || {};
  const {
    type: promoItemsType = '',
    url: basicUrl = '',
    caption: basicCaption = '',
    subtitle: basicSubtitle = '',
    headlines: basicHeadlines = '',
    credits: basicCredits = {},
    streams: basicStreams = [],
    promo_image: basicPromoImage = {},
    promo_items: basicPromoItems = {},
    content_elements: basicPromoContentElements = [],
  } = basic || {};

  const { meta_title: metaTitle, basic: baseHeadline } = basicHeadlines || {};
  let mediaTitle = basicSubtitle;
  if (!mediaTitle) {
    mediaTitle = metaTitle || baseHeadline || '';
  }

  const basicAuthor = basicCredits && basicCredits.affiliation && basicCredits.affiliation.by ? basicCredits.affiliation.by.id
    : basicCredits && basicCredits.by && basicCredits.by[0] && basicCredits.by[0].name ? basicCredits.by[0].name : '';

  const checkCaption = basicCaption || '';

  if (promoItemsType === 'image' && !standaloneGallery) {
    leadObject = mediaObj('image/JPEG', 'image', basicUrl, siteID, mediaTitle, checkCaption, basicAuthor);
  }

  if (promoItemsType === 'video') {
    const [basicMp4Stream] = basicStreams.filter(item => item.stream_type === 'mp4');
    const [basicM3u8Stream] = basicStreams.filter(item => item.stream_type === 'ts');

    let leadObjectType = '';
    let leadObjectUrl = '';
    if (basicM3u8Stream) {
      const { url: basicM3u8Url } = basicM3u8Stream || {};
      leadObjectType = 'application/x-mpegurl';
      leadObjectUrl = basicM3u8Url;
    } else if (basicMp4Stream) {
      const { url: basicMp4Url } = basicMp4Stream || {};
      leadObjectType = 'video/mp4';
      leadObjectUrl = basicMp4Url;
    }
    const { caption: videoCaption, url: basicThumbNailImage = '' } = basicPromoImage || {};
    const videoAuthor = getVideoAuthor(basic);
    const checkVideoCaption = videoCaption || '';
    leadObject = mediaObj(leadObjectType, 'video', leadObjectUrl, siteID, mediaTitle, checkVideoCaption, videoAuthor, true, basicThumbNailImage, false);
  }


  if (promoItemsType === 'gallery' || standaloneGallery || !standaloneGallery) {
    const { content_elements: galleryContentElements = [] } = basic || {};
    const { basic: basicGalleryPromo } = basicPromoItems || {};
    const {
      credits: basicGalleryCredits = '', url: basicGalleryUrl = '', caption: basicGalleryCaption = '', subtitle: basicGallerySubtitle = '',
    } = basicGalleryPromo || {};
    const galleryMediaCredit = basicCredits.affiliation && basicCredits.affiliation.by && basicCredits.affiliation.by.name ? basicCredits.affiliation.by.name : basicGalleryCredits && basicGalleryCredits.by && basicGalleryCredits.by[0] && basicGalleryCredits.by[0].name
      ? basicGalleryCredits.by[0].name : basicGalleryCredits && basicGalleryCredits.by && basicGalleryCredits.by[0] && basicGalleryCredits.by[0].referent && basicGalleryCredits.by[0].referent && basicGalleryCredits.by[0].referent.id ? basicGalleryCredits.by[0].referent.id : '';
    if (newsletterFeed || standardFeed) {
      if (standaloneGallery) {
        leadObject = mediaObj('image/JPEG', 'image', basicUrl, siteID, mediaTitle, checkCaption, basicAuthor, true, basicUrl, true);
      } else {
        leadObject = basicGalleryPromo ? mediaObj('image/JPEG', 'image', basicGalleryUrl, siteID, basicGallerySubtitle, basicGalleryCaption, galleryMediaCredit, true, basicGalleryUrl, true) : mediaObj('image/JPEG', 'image', basicUrl, siteID, mediaTitle, checkCaption, basicAuthor, true, basicUrl, true);
      }
    } else if (!standaloneGallery) {
      formatterGalleryArray = basicPromoContentElements.map((item) => {
        const {
          caption: itemCaption = '', url: itemUrl = '', credits: creditsArray = '', subtitle: itemTitle = '',
        } = item || {};
        const appFeedCredit = creditsArray && creditsArray.affiliation && creditsArray.affiliation[0] && creditsArray.affiliation[0].name && creditsArray.affiliation[0].name !== '' ? creditsArray.affiliation[0].name : creditsArray && creditsArray.by && creditsArray.by[0] && creditsArray.by[0].name ? creditsArray.by[0].name : creditsArray && creditsArray.by && creditsArray.by[0] && creditsArray.by[0].referent && creditsArray.by[0].referent.id ? creditsArray.by[0].referent.id : '';
        if (basicGalleryUrl === itemUrl) {
          return mediaObj('image/JPEG', 'image', itemUrl, siteID, itemTitle, itemCaption, appFeedCredit, true, basicGalleryUrl, true);
        }
        return mediaObj('image/JPEG', 'image', itemUrl, siteID, itemTitle, itemCaption, appFeedCredit, false, false, true);
      });
    } else {
      formatterGalleryArray = galleryContentElements.map((item) => {
        const {
          caption: itemCaption, url: itemUrl, credits: creditsArray = '', subtitle: itemTitle = '',
        } = item || {};
        const appFeedCredit = creditsArray.affiliation && creditsArray.affiliation.by && creditsArray.affiliation.by.name ? creditsArray.affiliation.by.name : creditsArray && creditsArray.by && creditsArray.by[0] && creditsArray.by[0].name ? creditsArray.by[0].name : '';
        if (basicUrl === itemUrl) {
          return mediaObj('image/JPEG', 'image', itemUrl, siteID, itemTitle, itemCaption, appFeedCredit, true, basicUrl, true);
        }
        return mediaObj('image/JPEG', 'image', itemUrl, siteID, itemTitle, itemCaption, appFeedCredit, false, false, true);
      });
    }
  }

  const mediaContent = globalContent.filter(el => el && el.type && (el.type === 'image' || el.type === 'video'));
  if (mediaContent) {
    formattedMediaContent = mediaContent.map((media) => {
      const {
        caption = '',
        type: localType = '',
        url = '',
        subtitle = '',
        credits: mediaCredits = {},
        streams: mediaStreams = [],
      } = media || {};

      // per Surendra: For stories, we are not adding inline images to media:content.
      if (type === 'story') {
        return {};
      }

      let mediaObjectUrl = '';

      const mediaAuthor = mediaCredits.affiliation && mediaCredits.affiliation.by && mediaCredits.affiliation.by.name ? mediaCredits.affiliation.by.name : mediaCredits && mediaCredits.by && mediaCredits.by[0] && mediaCredits.by[0].name ? mediaCredits.by[0].name : '';
      let mediaType = localType === 'image' ? 'image/JPEG' : 'video/mp4';
      const mediaMedium = localType === 'image' ? 'image' : 'video';

      if (mediaMedium === 'video') {
        const [mp4Stream = []] = mediaStreams.filter(item => item.stream_type === 'mp4');
        const [m3u8Stream = []] = mediaStreams.filter(item => item.stream_type === 'ts');

        if (m3u8Stream) {
          const { url: m3u8Url } = m3u8Stream || {};
          mediaType = 'application/x-mpegurl';
          mediaObjectUrl = m3u8Url;
        } else if (mp4Stream) {
          const { url: mp4Url } = mp4Stream || {};
          mediaType = 'video/mp4';
          mediaObjectUrl = mp4Url;
        }
        mediaObjectUrl = url;
      }

      if (basicUrl === url) {
        return mediaObj(mediaType, mediaMedium, `${localType === 'image' ? url : mediaObjectUrl}`, siteID, subtitle, caption, mediaAuthor, true, mediaObjectUrl, true);
      }

      return mediaObj(mediaType, mediaMedium, `${localType === 'image' ? url : mediaObjectUrl}`, siteID, subtitle, caption, mediaAuthor, false, '', true);
    });
  }

  if (!newsletterFeed && !standardFeed && !standaloneGallery) {
    return [leadObject, ...formatterGalleryArray, ...formattedMediaContent];
  }
  if ((newsletterFeed || standardFeed) && standaloneGallery) {
    return [leadObject];
  }

  return [leadObject, ...formattedMediaContent];
};

export default getMediaContent;
