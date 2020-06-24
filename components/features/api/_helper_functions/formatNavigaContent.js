export const formatNavigaContent = contentElements => contentElements.map((el) => {
  const {
    type,
    content = '',
  } = el || {};

  if (type === 'text' && content !== '<br/>') {
    return `<div class="text">
                <p>
                  ${content}
                </p>
              </div>`;
  }

  if (type === 'oembed_response') {
    const {
      raw_oembed: rawOembed,
    } = el || {};

    const {
      type: oType,
    } = rawOembed || {};

    if (oType === 'twitter') {
      const {
        url,
      } = rawOembed || {};

      return `<embed type="oembed">
                 ${url}
               </embed>`;
    }

    if (
      oType === 'youtube'
        || oType === 'reddit'
        || oType === 'instagram'
        || oType === 'facebook-post'
        || oType === 'facebook-video'
        || oType === 'soundcloud'
    ) {
      const {
        _id: id,
      } = rawOembed || {};

      return `<embed type="oembed">
                 ${id}
               </embed>`;
    }
  }

  if (type === 'div' || type === 'quote' || type === 'header') {
    return content;
  }

  if (type === 'raw_html' || type === 'interstitial_link' || type === 'list' || type === 'divider' || type === 'table') {
    return `<embed type="raw">
             ${content}
           </embed>`;
  }

  if (type === 'image') {
    const { url = '', caption: imageCaption = '' } = el || {};

    return `
      <embed type="raw"> 
        <img id="story-inline-media-1" class="story-inline-media image-large" src="${url}" title="${imageCaption}" /> 
      </embed>
    `;
  }

  return null;
});

export default formatNavigaContent;
