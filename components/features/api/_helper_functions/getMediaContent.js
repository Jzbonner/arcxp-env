export const getMediaContent = (type, globalContent, promoItems) => {
  let formattedMediaContent = [];
  let leadObject = {};

  const { basic = {} } = promoItems || {};

  const {
    type: promoItemsType = '',
    url: basicUrl,
    caption: basicCaption,
    subtitle: basicSubtitle,
    credits: basicCredits = {},
    streams: basicStreams = [],
    promo_image: basicPromoImage = {},
  } = basic || {};

  const basicAuthor = basicCredits.affiliation && basicCredits.affiliation.by ? basicCredits.affiliation.by.id : '';

  if (promoItemsType === 'image') {
    leadObject = {
      _name: 'media:content',
      _attrs: {
        type: 'image/JPEG',
        medium: 'image',
        url: `${basicUrl}`,
      },
      _content: [
        {
          'media:title': `<![CDATA[${basicSubtitle}]]>`,
        },
        {
          'media:description': `<![CDATA[${basicCaption}]]>`,
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
    const [basicMp4Stream = []] = basicStreams.filter(item => item.stream_type === 'mp4');
    const { url: basicMp4Url } = basicMp4Stream || {};
    const { url: basicThumbNailImage = '' } = basicPromoImage;

    leadObject = {
      _name: 'media:content',
      _attrs: {
        type: 'video/mp4',
        medium: 'video',
        url: `${basicMp4Url}`,
      },
      _content: [
        {
          'media:title': `<![CDATA[${basicSubtitle}]]>`,
        },
        {
          'media:description': `<![CDATA[${basicCaption}]]>`,
        },
        {
          _name: 'media:thumbnail',
          _attrs: {
            url: `${basicThumbNailImage}`,
          },
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
      if (localType === 'image' && type === 'story') {
        return {};
      }

      let mp4Stream;

      const mediaAuthor = mediaCredits.affiliation && mediaCredits.affiliation.by ? mediaCredits.affiliation.by.id : '';
      const mediaType = localType === 'image' ? 'image/JPEG' : 'video/mp4';
      const mediaMedium = localType === 'image' ? 'image' : 'video';

      if (mediaMedium === 'video') {
        [mp4Stream = []] = mediaStreams.filter(item => item && item.stream_type && item.stream_type === 'mp4');
      }

      const { url: mp4Url } = mp4Stream || {};

      return {
        _name: 'media:content',
        _attrs: {
          type: `${mediaType}`,
          medium: `${mediaMedium}`,
          url: `${localType === 'image' ? url : mp4Url}`,
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

  return [leadObject, ...formattedMediaContent];
};

export default getMediaContent;
