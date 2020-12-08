import imageResizer from '../../../layouts/_helper_functions/Thumbor';

export const formatNavigaContent = (siteID, contentElements) => contentElements.map((el) => {
  const { type, content = '' } = el || {};

  if (type === 'text' && content !== '<br/>') {
    return `<div class="text">
                <p>
                  ${content}
                </p>
              </div>`;
  }

  if (type === 'oembed_response') {
    const { raw_oembed: rawOembed } = el || {};

    const { type: oType } = rawOembed || {};

    if (oType === 'twitter') {
      const { url } = rawOembed || {};

      return `<embed type="oembed">
                 ${url}
               </embed>`;
    }

    if (oType === 'youtube' || oType === 'reddit' || oType === 'instagram' || oType === 'facebook-post' || oType === 'facebook-video' || oType === 'soundcloud') {
      const { _id: id } = rawOembed || {};

      return `<embed type="oembed">
                 ${id}
               </embed>`;
    }
  }

  if (type === 'div' || type === 'header') {
    return content;
  }

  if (type === 'raw_html') {
    return `<embed type="raw">
             ${content}
           </embed>`;
  }

  if (type === 'list') {
    const { items, list_type: listType } = el || {};
    if (listType === 'unordered') {
      return `<ul>
            ${items.map((item, id) => {
    const { content: itemContent } = item;
    return `<li key=${id}>${itemContent}</li>`;
  }).join('')}</ul>`;
    }
    return `<ol style="list-style: decimal;">
          ${items.map((item, id) => {
    const { content: itemContent } = item;
    return `<li key=${id}>${itemContent}</li>`;
  }).join('')}</ol>`;
  }

  if (type === 'quote') {
    const { content_elements: quoteElements, citation } = el || {};
    const [{ content: quoteHeading }] = quoteElements || {};
    const { content: citationContent } = citation || {};
    return `<div>
      <p>${quoteHeading}</p>
      <blockquote>${citationContent}</blockquote>
    </div>`;
  }

  if (type === 'divider') {
    return '<hr/>';
  }

  if (type === 'video') {
    const { streams } = el || {};
    const [{ url: inlineVideoURL }] = streams || {};
    return `<embed type="raw">${inlineVideoURL}</embed>`;
  }

  if (type === 'interstitial_link') {
    const { url: linkUrl, content: linkContent } = el || {};
    return `<embed type="raw">
           <a href="${linkUrl}">${linkContent}</a>
         </embed>`;
  }

  if (type === 'image') {
    const { url = '', caption: imageCaption = '' } = el || {};

    return `
      <embed type="raw">
        <img src="${imageResizer(url, siteID)}" title="${imageCaption}" />
      </embed>
    `;
  }

  return null;
});

export default formatNavigaContent;
