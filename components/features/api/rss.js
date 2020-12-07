import Consumer from 'fusion:consumer';
import { formatApiTime } from '../../layouts/_helper_functions/api/formatTime';
import { getMediaContent } from './_helper_functions/getMediaContent';
import { formatNavigaContent } from './_helper_functions/formatNavigaContent';
import getQueryParams from '../../layouts/_helper_functions/getQueryParams';
import { getFirst120CharsFromStory } from './_helper_functions/getFirst120CharFromStory';

@Consumer
class Api {
  constructor(props) {
    this.props = props;
  }

  render() {
    const {
      globalContent,
      globalContentConfig,
      siteProperties,
      arcSite: siteID,
      requestUri,
    } = this.props || {};
    const { websiteURL } = siteProperties || {};
    const { query } = globalContentConfig || {};
    const { id: collectionId, from, size } = query || {};
    const feedStart = from - 1;
    const queryParams = getQueryParams(requestUri);
    const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
    const newsletterFeed = outPutTypePresent && queryParams.outputType === 'rss-newsletter';
    const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'rss-app';

    const rssFeedDetectAppWebview = () => {
      if (noHeaderAndFooter) {
        return '?outputType=wrap';
      } return '';
    };
    let maxItems = feedStart + size;
    if (maxItems > globalContent.length) {
      maxItems = globalContent.length;
    }

    if (globalContent) {
      let filteredContent = globalContent.filter((item, i) => i >= feedStart && i < maxItems);

      if (!collectionId) {
        // only sort by display_date for query-based feeds
        filteredContent = filteredContent.sort((a, b) => {
          const aTime = new Date(a.display_date);
          const bTime = new Date(b.display_date);

          return bTime.getTime() - aTime.getTime();
        });
      }

      return filteredContent
        .map((item) => {
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
            promo_items: promoItems,
          } = item || {};

          const title = headlines && headlines.basic ? `<![CDATA[${headlines.basic}]]>` : '';
          let author = credits && credits.by && credits.by[0] && credits.by[0].name ? `<![CDATA[${credits.by[0].name}]]>` : '';
          if (credits && credits.by && credits.by.length > 1) {
            author = `<![CDATA[${credits.by.map(eachAuthor => eachAuthor.name).join(', ')}]]>`;
          }

          const formattedDescription = description
            && description.basic ? `<![CDATA[${description.basic}]]>` : getFirst120CharsFromStory(contentElements);

          const formattedDate = formatApiTime(firstPubDate, displayDate);

          if (type === 'story') {
            const formatContentElements = formatNavigaContent(siteID, contentElements);
            const outputContent = noHeaderAndFooter || newsletterFeed ? `<![CDATA[${formatContentElements.join('')}]]>` : formattedDescription;

            const mediaArray = getMediaContent(type, siteID, contentElements, promoItems, newsletterFeed);

            const xmlObject = {
              item: [
                {
                  guid: `urn:uuid:${guid}`,
                },
                {
                  link: `${websiteURL}${canonicalUrl}${rssFeedDetectAppWebview()}`,
                },
                {
                  description: formattedDescription,
                },
                {
                  pubDate: formattedDate,
                },
                {
                  'content:encoded': outputContent,
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
            const { basic } = promoItems || {};
            const {
              streams,
              promo_image: promoImage,
            } = basic || {};
            const { name, org } = basic && basic.credits && basic.credits.by && basic.credits.by[0];
            const videoAuthor = name || org;
            const mp4Url = streams && streams[0] && streams[0].url;
            const { caption, url: promoImageUrl } = promoImage || {};
            const videoXmlObject = {
              item: [
                {
                  guid: `urn:uuid:${guid}`,
                },
                {
                  link: `${websiteURL}${canonicalUrl}${rssFeedDetectAppWebview()}`,
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
                        _content: videoAuthor,
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

            return videoXmlObject;
          }

          if (type === 'gallery') {
            const galleryMediaArray = getMediaContent(type, siteID, contentElements);

            const galleryXmlObject = {
              item: [
                {
                  guid: `urn:uuid:${guid}`,
                },
                {
                  link: `${websiteURL}${canonicalUrl}${rssFeedDetectAppWebview()}`,
                },
                {
                  description: formattedDescription || title,
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
