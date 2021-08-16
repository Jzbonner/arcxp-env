import Consumer from 'fusion:consumer';
import { formatApiTime } from '../../layouts/_helper_functions/api/formatTime';
import { getMediaContent } from './_helper_functions/getMediaContent';
import { formatNavigaContent } from './_helper_functions/formatNavigaContent';
import getQueryParams from '../../layouts/_helper_functions/getQueryParams';
import handleSiteName from '../../layouts/_helper_functions/handleSiteName';
import fetchEnv from '../../_helper_components/global/utils/environment';
import { getFirst120CharsFromStory } from './_helper_functions/getFirst120CharFromStory';
import resizer from '../../../content/sources/resizer';

@Consumer
class Api {
  constructor(props) {
    this.props = props;
  }

  render() {
    const {
      globalContent, globalContentConfig, arcSite: siteID, requestUri,
    } = this.props || {};
    const { query } = globalContentConfig || {};
    const { id: collectionId, from, size } = query || {};
    const feedStart = globalContent ? 0 : from - 1; // we start at 0 when populating from globalContent so as to avoid double-filtering of results (collection & query content sources natively respect `from`)
    const queryParams = getQueryParams(requestUri);
    const outPutTypePresent = Object.keys(queryParams).some(paramKey => paramKey === 'outputType');
    const newsletterFeed = outPutTypePresent && queryParams.outputType === 'rss-newsletter';
    const noHeaderAndFooter = outPutTypePresent && queryParams.outputType === 'rss-app';
    const standardFeed = outPutTypePresent && queryParams.outputType === 'rss';
    const siteDomain = `${fetchEnv() === 'prod' ? 'www' : 'sandbox'}.${handleSiteName(siteID)}.com`;

    let maxItems = feedStart + size;
    if (maxItems > globalContent.length) {
      maxItems = globalContent.length;
    }

    const getAuthorOrganization = (credits, author, isMap) => {
      let authorOrg = '';
      /*
        First, we check affiliatons because it contains the author's organization as seen on AuthorService ...
        ... credits.by[x].org is inconsistent and sometimes returns the author's location, instead of it's organization. It's only consistent with returning guest author orgs, so we check that if affiliations fail..
      */
      if (isMap) {
        authorOrg = author.additional_properties && author.additional_properties.original && author.additional_properties.original.affiliations ? ` - ${author.additional_properties.original.affiliations}` : '';

        if (!authorOrg) authorOrg = author.org ? ` - ${author.org}` : '';
      } else {
        authorOrg = credits && credits.by && credits.by[0] && credits.by[0].additional_properties && credits.by[0].additional_properties.original && credits.by[0].additional_properties.original.affiliations ? `${credits.by[0].additional_properties.original.affiliations}` : '';

        if (!authorOrg) authorOrg = credits && credits.by && credits.by[0] && credits.by[0].org ? `${credits.by[0].org}` : '';
      }

      return authorOrg;
    };

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

      return filteredContent.map((item) => {
        const {
          content_elements: contentElements = [], first_publish_date: firstPubDate, display_date: displayDate, canonical_url: canonicalUrl, _id: guid, type = '', headlines, description, credits = {}, promo_items: promoItems, streams,
        } = item || {};

        const title = headlines && headlines.basic ? `<![CDATA[${headlines.basic}]]>` : '';

        const orgString = getAuthorOrganization(credits, null, false);

        const org = orgString ? `<![CDATA[${orgString}]]>` : '';


        let author = credits && credits.by && credits.by[0] && credits.by[0].name ? `<![CDATA[${credits.by[0].name}${orgString ? ` - ${orgString}` : ''}]]>` : '';

        if (credits && credits.by && credits.by.length > 1) {
          author = `<![CDATA[${credits.by.map(eachAuthor => `${eachAuthor.name}${getAuthorOrganization(null, eachAuthor, true)}`).join(', ')}]]>`;
        }

        if (!author) {
          author = org;
        }

        const formattedDescription = description && description.basic ? `<![CDATA[${description.basic}]]>` : getFirst120CharsFromStory(contentElements);

        const formattedDate = formatApiTime(firstPubDate, displayDate);

        if (type === 'story') {
          const formatContentElements = formatNavigaContent(siteID, contentElements);
          const outputContent = noHeaderAndFooter || newsletterFeed ? `<![CDATA[${formatContentElements.join('')}]]>` : formattedDescription;

          const mediaArray = getMediaContent(type, siteID, contentElements, promoItems, newsletterFeed, standardFeed);

          const xmlObject = {
            item: [
              {
                guid: `urn:uuid:${guid}`,
              },
              {
                link: `https://${siteDomain}${canonicalUrl}`,
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
          const { basic = {} } = promoItems || {};
          const { caption, resized_obj: resizedObj, url } = basic || {};
          const { src: existingResizedVideoThumb } = resizedObj || {};
          // fetch resized thumb when such is not existing
          const imgQuery = {
            src: url,
            width: 500,
            height: 282,
            arcSite: siteID,
          };
          const { src: manuallyResizedThumb } = resizer.fetch(imgQuery);
          const videoThumbResized = existingResizedVideoThumb || manuallyResizedThumb;
          const videoCaption = caption || '';
          const { url: mp4Url, stream_type: videoType } = streams && streams[0] ? streams[0] : {};
          let mediumType = '';
          if (videoType === 'ts') {
            mediumType = 'application/x-mpegurl';
          } else if (videoType === 'mp4') {
            mediumType = 'video/mp4';
          }

          return {
            item: [
              {
                guid: `urn:uuid:${guid}`,
              },
              {
                link: `https://${siteDomain}${canonicalUrl}`,
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
                    medium: `${mediumType}`,
                    url: mp4Url,
                  },
                  _content: [
                    {
                      'media:title': title,
                    },
                    {
                      'media:description': `<![CDATA[${videoCaption}]]>`,
                    },
                    {
                      _name: 'media:credit',
                      _attrs: {
                        role: 'author',
                      },
                      _content: `${author}`, // for type video, author & media:credit are the same
                    },
                    {
                      _name: 'media:thumbnail',
                      _attrs: {
                        url: videoThumbResized,
                      },
                    },
                  ],
                },
              ],
            ],
          };
        }
        // Standalone Gallery
        if (type === 'gallery') {
          const galleryMediaArray = getMediaContent(type, siteID, contentElements, promoItems, newsletterFeed, standardFeed);

          const galleryXmlObject = {
            item: [
              {
                guid: `urn:uuid:${guid}`,
              },
              {
                link: `https://${siteDomain}${canonicalUrl}`,
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
