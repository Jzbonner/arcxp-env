import imageResizer from '../../../layouts/_helper_functions/Thumbor';
import getMediaCredit from './getMediaCredit';

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
    return `<ol type="1">
          ${items.map((item, id) => {
    const { content: itemContent } = item;
    return `<li key=${id}>${itemContent}</li>`;
  }).join('')}</ol>`;
  }

  if (type === 'quote') {
    const { content_elements: quoteElements, citation } = el || {};
    const { content: citationContent } = citation || {};
    return `<div class="blockquote">
      ${quoteElements.map(qEl => qEl.content && `<p>${qEl.content}</p>`).join('')}
      ${citationContent ? `<blockquote>${citationContent}</blockquote>` : ''}
    </div>`;
  }

  if (type === 'divider') {
    return '<hr/>';
  }

  if (type === 'video') {
    const { streams, promo_image: promoImage = {}, credits = {} } = el || {};
    const [{ url: inlineVideoURL }] = streams || {};
    const { credits: promoImageCredits = {}, url: promoImageUrl } = promoImage || {};

    return `<embed type="raw">
              <div>
                <video width="100%" controls poster="${imageResizer(promoImageUrl, siteID)}">
                  <source src=${inlineVideoURL} type="video/mp4" >
                </video>
              </div>
            </embed>
            ${(credits && getMediaCredit(credits) !== '' && `<p class="text" style="font-size: 0.75rem; margin-top: -0.25rem; text-align: right">Credit: ${getMediaCredit(credits)}</p>`) || (promoImageCredits && getMediaCredit(promoImageCredits) !== '' && `<p class="text" style="font-size: 0.75rem; margin-top: -0.25rem; text-align: right">Credit: ${getMediaCredit(promoImageCredits)}</p>`)}
            `;
  }

  if (type === 'interstitial_link') {
    const { url: linkUrl, content: linkContent } = el || {};
    return `<embed type="raw">
           <a href="${linkUrl}">${linkContent}</a>
         </embed>`;
  }

  if (type === 'image') {
    const {
      url = '', caption: imageCaption = '', credits: mediaCredits = {}, vanity_credits: vanityCredits = {},
    } = el || {};

    return `
      <embed type="raw">
        <img src="${imageResizer(url, siteID)}" title="${imageCaption}" alt="${imageCaption}"/>
      </embed>
      ${(vanityCredits && getMediaCredit(vanityCredits) !== '' && `<p class="text" style="font-size: 0.75rem; margin-top: -0.25rem; text-align: right">Credit: ${getMediaCredit(vanityCredits)}</p>`) || (mediaCredits && getMediaCredit(mediaCredits) !== '' && `<p class="text" style="font-size: 0.75rem; margin-top: -0.25rem; text-align: right">Credit: ${getMediaCredit(mediaCredits)}</p>`)}
    `;
  }

  return null;
});

export default formatNavigaContent;
