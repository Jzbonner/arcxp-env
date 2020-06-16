import Consumer from 'fusion:consumer';
import { formatApiTime } from '../../layouts/_helper_functions/api/formatTime';
import { getMediaContent } from './_helper_functions/getMediaContent';
import { formatNavigaContent } from './_helper_functions/formatNavigaContent';

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

          const formatContentElements = formatNavigaContent(contentElements);

          const mediaArray = getMediaContent(contentElements);

          const xmlObject = {
            item: [
              {
                guid: `urn:uuid:${guid}`,
              },
              {
                link: `${canonicalUrl}`,
              },
              {
                description: formattedDescription,
              },
              {
                pubDate: formattedDate,
              },
              {
                'content:encoded': `<![CDATA[${formatContentElements.join('')}]]>`,
              },
              {
                title,
              },
              {
                author,
              },
              mediaArray,
            ],
          };

          return xmlObject;
        }
        return {};
      });
    }

    return [];
  }
}

export default Api;
