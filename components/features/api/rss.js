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
      return globalContent.map((item) => {
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

        const title = headlines && headlines.basic ? `<![CDATA[${headlines.basic}]]>` : '';
        const author = credits && credits.by && credits.by[0] && credits.by[0].name ? `<![CDATA[${credits.by[0].name}]]>` : '';
        const formattedDescription = description && description.basic ? `<![CDATA[${description.basic}]]>` : '';

        const formattedDate = formatApiTime(firstPubDate, displayDate);

        if (type === 'story') {
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

        if (type === 'video') {
          const {
            streams,
            promo_image: promoImage,
          } = item || {};

          const mp4Url = streams && streams[0] && streams[0].url;
          const { caption, url: promoImageUrl } = promoImage || {};

          const vidoeXmlObject = {
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
                title,
              },
              {
                author,
              },
              [
                {
                  _name: 'media:content',
                  _attrs: {
                    type: 'video',
                    medium: 'video/mp4',
                    url: mp4Url,
                  },
                  _content: [
                    {
                      'media:title': title,
                    },
                    {
                      'media:description': `<![CDATA[${caption}]]>`,
                    },
                    {
                      _name: 'media:credit',
                      _attrs: {
                        role: 'author',
                      },
                      _content: author,
                    },
                    {
                      _name: 'media:thumbnail',
                      _attrs: {
                        url: promoImageUrl,
                      },
                    },
                  ],
                },
              ],
            ],
          };

          return vidoeXmlObject;
        }

        if (type === 'gallery') {
          const galleryMediaArray = getMediaContent(contentElements);

          const galleryXmlObject = {
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
                title,
              },
              {
                author,
              },
              galleryMediaArray,
            ],
          };

          return galleryXmlObject;
        }
        return {};
      });
    }

    return [];
  }
}

export default Api;
