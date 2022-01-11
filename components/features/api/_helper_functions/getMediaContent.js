/* eslint-disable no-nested-ternary */
import getVideoAuthor from './getVideoAuthor';
import mediaObj from './mediaObj';
import getMediaCredit from './getMediaCredit';

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
    content_elements: basicContentElements = [],
    description: basicDescription,
  } = basic || {};

  const { basic: basicGalleryPromo } = basicPromoItems || {};
  const {
    credits: basicGalleryCredits = '', url: basicGalleryUrl = '', caption: basicGalleryCaption = '', subtitle: basicGallerySubtitle = '',
  } = basicGalleryPromo || {};

  const galleryMediaCredit = getMediaCredit(basicGalleryCredits);
  const { meta_title: metaTitle, basic: baseHeadline } = basicHeadlines || {};
  let mediaTitle = basicSubtitle;
  if (!mediaTitle) {
    mediaTitle = metaTitle || baseHeadline || '';
  }
  const basicAuthor = getMediaCredit(basicCredits);
  if (promoItemsType === 'image' && !standaloneGallery) {
    leadObject = basicUrl && basicUrl !== '' ? mediaObj('image/JPEG', 'image', basicUrl, siteID, mediaTitle, basicCaption, basicAuthor, true, basicUrl, true) : basicGalleryPromo ? mediaObj('image/JPEG', 'image', basicGalleryUrl, siteID, basicGallerySubtitle, basicGalleryCaption, galleryMediaCredit, true, basicGalleryUrl, true) : {};
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
    // removing caption: videoCaption, since it's a description of the promo_image, not the actual video
    const { url: basicThumbNailImage = '' } = basicPromoImage || {};
    const { basic: videoDescription } = basicDescription || {};
    const videoAuthor = getVideoAuthor(basic);
    const checkVideoCaption = videoDescription || '';
    leadObject = mediaObj(leadObjectType, 'video', leadObjectUrl, siteID, mediaTitle, checkVideoCaption, videoAuthor, true, basicThumbNailImage, false);
  }
  if (promoItemsType === 'gallery' || standaloneGallery || !standaloneGallery) {
    if (newsletterFeed || standardFeed) {
      if (standaloneGallery || basicUrl) {
        leadObject = mediaObj('image/JPEG', 'image', basicUrl, siteID, mediaTitle, basicCaption, basicAuthor, true, basicUrl, true);
      } else if (basicGalleryPromo) {
        leadObject = mediaObj('image/JPEG', 'image', basicGalleryUrl, siteID, basicGallerySubtitle, basicGalleryCaption, galleryMediaCredit, true, basicGalleryUrl, true);
      }
    } else if (!standaloneGallery) {
      formatterGalleryArray = basicContentElements.map((item) => {
        const {
          caption: itemCaption = '', url: itemUrl = '', credits: creditsArray = '', subtitle: itemTitle = '',
        } = item || {};
        const appFeedCredit = creditsArray && creditsArray.affiliation && creditsArray.affiliation[0] && creditsArray.affiliation[0].name && creditsArray.affiliation[0].name !== '' ? creditsArray.affiliation[0].name : creditsArray && creditsArray.by && creditsArray.by[0] && creditsArray.by[0].name ? creditsArray.by[0].name : creditsArray && creditsArray.by && creditsArray.by[0] && creditsArray.by[0].referent && creditsArray.by[0].referent.id ? creditsArray.by[0].referent.id : '';

        // Have to implement an additional check for collections to see if there isn't already a lead object (which is usually the case for collections)
        if (basicGalleryUrl === itemUrl && !Object.prototype.hasOwnProperty.call(leadObject, '_name')) {
          leadObject = mediaObj('image/JPEG', 'image', itemUrl, siteID, itemTitle, itemCaption, appFeedCredit, true, basicGalleryUrl, true);
          return {};
        }
        return mediaObj('image/JPEG', 'image', itemUrl, siteID, itemTitle, itemCaption, appFeedCredit, false, false, true);
      });
    } else {
      formatterGalleryArray = basicContentElements.map((item) => {
        const {
          caption: itemCaption, url: itemUrl, credits: creditsArray = '', subtitle: itemTitle = '',
        } = item || {};
        const appFeedCredit = creditsArray.affiliation && creditsArray.affiliation.by && creditsArray.affiliation.by.name ? creditsArray.affiliation.by.name : creditsArray && creditsArray.by && creditsArray.by[0] && creditsArray.by[0].name ? creditsArray.by[0].name : '';
        if (basicUrl === itemUrl) {
          leadObject = mediaObj('image/JPEG', 'image', itemUrl, siteID, itemTitle, itemCaption, appFeedCredit, true, basicUrl, true);
          return {};
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
        vanity_credits: vanityCredits,
      } = media || {};

      const mediaAuthor = vanityCredits ? getMediaCredit(vanityCredits) : getMediaCredit(mediaCredits);
      // per Surendra: For stories, we are not adding inline images to media:content.
      if (type === 'story') {
        return {};
      }

      let mediaObjectUrl = '';
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
        leadObject = mediaObj(mediaType, mediaMedium, `${localType === 'image' ? url : mediaObjectUrl}`, siteID, subtitle, caption, mediaAuthor, true, mediaObjectUrl, true);
        return {};
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
