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
    ) {
      const {
        _id: id,
      } = rawOembed || {};

      return `<embed type="oembed">
                 ${id}
               </embed>`;
    }
  }

  return null;
});

export default formatNavigaContent;
