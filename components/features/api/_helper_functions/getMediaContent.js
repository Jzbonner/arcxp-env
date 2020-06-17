export const getMediaContent = (globalContent) => {
  const mediaContent = globalContent.filter(el => el && el.type && (el.type === 'image' || el.type === 'video'));
  if (mediaContent) {
    return mediaContent.map((media) => {
      const {
        caption = '',
        type: localType = '',
        url = '',
        subtitle = '',
        credits: mediaCredits = {},
      } = media || {};

      const mediaAuthor = mediaCredits.affiliation && mediaCredits.affiliation.by ? mediaCredits.affiliation.by.id : '';
      const mediaType = localType === 'image' ? 'image/JPEG' : 'video/mp4';
      const mediaMedium = localType === 'image' ? 'image' : 'video';

      return {
        _name: 'media:content',
        _attrs: {
          type: `${mediaType}`,
          medium: `${mediaMedium}`,
          url: `${url}`,
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

  return [];
};

export default getMediaContent;
