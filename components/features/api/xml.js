import Consumer from 'fusion:consumer';
import { formatApiTime } from '../../layouts/_helper_functions/api/formatTime';

@Consumer
class Api {
  constructor(props) {
    this.props = props;
  }

  render() {
    const { globalContent } = this.props || {};

    if (globalContent) {
      const { data: arrayData } = globalContent || {};

      return arrayData.map((item) => {
        const {
          content_elements: contentElements = [],
          first_publish_date: firstPubDate,
          display_date: displayDate,
          canonical_url: canonicalUrl,
          _id: guid,
          type = '',
          headlines,
          description,
          credits,
        } = item || {};

        if (type === 'story') {
          const title = headlines && headlines.basic ? `<![CDATA[${headlines.basic}]]>` : '';
          const author = credits && credits.by && credits.by[0] && credits.by[0].name ? `<![CDATA[${credits.by[0].name}]]>` : '';
          const formattedDescription = description && description.basic ? `<![CDATA[${description.basic}]]>` : '';

          const formattedDate = formatApiTime(firstPubDate, displayDate);

          const formatContentElements = contentElements
            .filter(el => el && el.type && el.type === 'text')
            .map((el = {}) => {
              const { content = '' } = el;
              if (content === '<br/>') {
                return null;
              }

              return `<div class="text">
                        <p>
                          ${content}
                        </p>
                      </div>`;
            });

          const xmlObject = {
            item: {
              guid: `urn:uuid:${guid}`,
              link: `${canonicalUrl}`,
              description: formattedDescription,
              pubDate: formattedDate,
              'content:encoded': `<![CDATA[${formatContentElements.join('')}]]>`,
              title,
              author,
            },
          };

          const mediaContent = contentElements.find(el => el && el.type && (el.type === 'image' || el.type === 'video'));
          if (mediaContent) {
            const {
              caption = '',
              type: localType = '',
              url = '',
              subtitle = '',
              credits: mediaCredits = {},
            } = mediaContent || {};

            const mediaAuthor = mediaCredits.affiliation && mediaCredits.affiliation.by ? mediaCredits.affiliation.by.id : '';
            const mediaType = localType === 'image' ? 'image/JPEG' : 'video/mp4';
            const mediaMedium = localType === 'image' ? 'image' : 'video';

            xmlObject.item.mediacontent = `
              <media:content type="${mediaType}" medium="${mediaMedium}" url="${url}">
              <media:title><![CDATA[${subtitle}]]></media:title>
              <media:description><![CDATA[${caption}]]></media:description>
              <media:credit role="author"><![CDATA[${mediaAuthor}]]></media:credit>
              </media:content>
            `;
          }

          return xmlObject;
        }
        return {};
      });
    }

    return [];
  }
}

export default Api;
