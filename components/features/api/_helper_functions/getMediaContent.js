import imageResizer from '../../../layouts/_helper_functions/Thumbor';
import getVideoAuthor from './getVideoAuthor';

export const getMediaContent = (type, siteID, globalContent, promoItems, newsletterFeed = false) => {
  let formattedMediaContent = [];
  let formatterGalleryArray = [];
  let leadObject = {};

  const { basic = {} } = promoItems || {};

  const {
    type: promoItemsType = '',
    url: basicUrl,
    caption: basicCaption,
    subtitle: basicSubtitle,
    headlines: basicHeadlines,
    credits: basicCredits = {},
    streams: basicStreams = [],
    promo_image: basicPromoImage = {},
  } = basic || {};
  const { meta_title: metaTitle, basic: baseHeadline } = basicHeadlines || {};
  let mediaTitle = basicSubtitle;
  if (!mediaTitle) {
    mediaTitle = metaTitle || baseHeadline || null;
  }

  const basicAuthor = basicCredits.affiliation && basicCredits.affiliation.by ? basicCredits.affiliation.by.id : null;
  const checkCaption = basicCaption || null;

  if (promoItemsType === 'image') {
    leadObject = {
      _name: 'media:content',
      _attrs: {
        type: 'image/JPEG',
        medium: 'image',
        url: `${imageResizer(basicUrl, siteID)}`,
      },
      _content: [
        {
          'media:title': `<![CDATA[${mediaTitle}]]>`,
        },
        {
          'media:description': `<![CDATA[${checkCaption}]]>`,
        },
        {
          _name: 'media:credit',
          _attrs: {
            role: 'author',
          },
          _content: `<![CDATA[${basicAuthor}]]>`,
        },
      ],
    };
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
    const checkVideoCaption = videoCaption || null;

    leadObject = {
      _name: 'media:content',
      _attrs: {
        type: `${leadObjectType}`,
        medium: 'video',
        url: `${leadObjectUrl}`,
      },
      _content: [
        {
          'media:title': `<![CDATA[${mediaTitle}]]>`,
        },
        {
          'media:description': `<![CDATA[${checkVideoCaption}]]>`,
        },
        {
          _name: 'media:thumbnail',
          _attrs: {
            url: `${imageResizer(basicThumbNailImage, siteID)}`,
          },
        },
        {
          _name: 'media:credit',
          _attrs: {
            role: 'author',
          },
          _content: `<![CDATA[${videoAuthor}]]>`,
        },
      ],
    };
  }

  if (promoItemsType === 'gallery') {
    const { content_elements: galleryContentElements = [] } = basic || {};
    if (newsletterFeed) {
      const firstImageInGallery = galleryContentElements && galleryContentElements[0];
      const { caption: firstImageInGalleryCaption, url: firstImageInGalleryUrl } = firstImageInGallery || {};

      leadObject = {
        _name: 'media:content',
        _attrs: {
          type: 'image/JPEG',
          medium: 'image',
          url: `${imageResizer(firstImageInGalleryUrl, siteID)}`,
        },
        _content: [
          {
            'media:title': `<![CDATA[${mediaTitle}]]>`,
          },
          {
            'media:description': `<![CDATA[${firstImageInGalleryCaption}]]>`,
          },
          {
            _name: 'media:credit',
            _attrs: {
              role: 'author',
            },
            _content: `<![CDATA[${basicAuthor}]]>`,
          },
        ],
      };
    } else {
      formatterGalleryArray = galleryContentElements.map((item) => {
        const { caption: itemCaption, url: itemUrl } = item || {};
        return {
          _name: 'media:content',
          _attrs: {
            type: 'image/JPEG',
            medium: 'image',
            url: `${imageResizer(itemUrl, siteID)}`,
          },
          _content: [
            {
              'media:title': `<![CDATA[${mediaTitle}]]>`,
            },
            {
              'media:description': `<![CDATA[${itemCaption}]]>`,
            },
            {
              _name: 'media:credit',
              _attrs: {
                role: 'author',
              },
              _content: `<![CDATA[${basicAuthor}]]>`,
            },
          ],
        };
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

      let resizerUrl = url;
      let mediaObjectUrl = '';

      const mediaAuthor = mediaCredits.affiliation && mediaCredits.affiliation.by ? mediaCredits.affiliation.by.id : '';
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
      }

      if (mediaMedium === 'image') {
        resizerUrl = imageResizer(url, siteID);
      }

      return {
        _name: 'media:content',
        _attrs: {
          type: `${mediaType}`,
          medium: `${mediaMedium}`,
          url: `${localType === 'image' ? resizerUrl : mediaObjectUrl}`,
        },
        _content: [
          {
            'media:title': `<![CDATA[${subtitle}]]>`,
          },
          {
            'media:description': `<![CDATA[${caption}]]>`,
          },
          {
            _name: 'media:credit',
            _attrs: {
              role: 'author',
            },
            _content: `<![CDATA[${mediaAuthor}]]>`,
          },
        ],
      };
    });
  }

  if (!newsletterFeed && promoItemsType === 'gallery') {
    return [...formatterGalleryArray, ...formattedMediaContent];
  }
  return [leadObject, ...formattedMediaContent];
};

export default getMediaContent;
