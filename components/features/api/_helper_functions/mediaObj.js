import resizer from '../../../../content/sources/resizer';

export default (type = 'image/JPEG', medium = 'image', url, siteID, title, caption, author, hasThumbnail = false, thumbnailImage, needsResizer = true) => {
  const imgQuery = {
    src: url,
    height: 600,
    width: 1000,
    arcSite: siteID,
  };
  const img = resizer.fetch(imgQuery);

  if (hasThumbnail) {
    const thumb = resizer.fetch({
      src: thumbnailImage,
      height: 600,
      width: 1000,
      arcSite: siteID,
    });
    return ({
      _name: 'media:content',
      _attrs: {
        type: `${type}`,
        medium: `${medium}`,
        url: `${needsResizer && img !== null ? img.src : url}`,
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
            url: `${thumb !== null ? thumb.src : url}`,
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
      url: `${needsResizer && img !== null ? img.src : url}`,
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
