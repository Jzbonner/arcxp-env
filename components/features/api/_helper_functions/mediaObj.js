import imageResizer from '../../../layouts/_helper_functions/Thumbor';

export default (type = 'image/JPEG', medium = 'image', url, siteID, title, caption, author, hasThumbnail = false, thumbnailImage, needsResizer = true) => {
  if (hasThumbnail) {
    return ({
      _name: 'media:content',
      _attrs: {
        type: `${type}`,
        medium: `${medium}`,
        url: `${imageResizer(url, siteID)}`,
      },
      _content: [
        {
          'media:title': `<![CDATA[${title}]]>`,
        },
        {
          'media:description': `<![CDATA[${caption}]]>`,
        },
        {
          _name: 'media:thumbnail',
          _attrs: {
            url: `${imageResizer(thumbnailImage, siteID)}`,
          },
        },
        {
          _name: 'media:credit',
          _attrs: {
            role: 'author',
          },
          _content: `<![CDATA[${author}]]>`,
        },
      ],
    });
  }
  return ({
    _name: 'media:content',
    _attrs: {
      type: `${type}`,
      medium: `${medium}`,
      url: `${needsResizer ? imageResizer(url, siteID) : url}`,
    },
    _content: [
      {
        'media:title': `<![CDATA[${title}]]>`,
      },
      {
        'media:description': `<![CDATA[${caption}]]>`,
      },
      {
        _name: 'media:credit',
        _attrs: {
          role: 'author',
        },
        _content: `<![CDATA[${author}]]>`,
      },
    ],
  });
};
