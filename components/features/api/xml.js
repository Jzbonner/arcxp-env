import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';

@Consumer
class Api {
  constructor(props) {
    this.props = props;
    const {
      customFields: {
        content: { contentService = 'collections-content-api', contentConfigValues = { id: '' } } = {},
      } = {},
    } = props;

    this.fetchContent({
      data: {
        source: contentService,
        query: {
          ...contentConfigValues,
          site: 'ajc',
        },
      },
    });
  }

  render() {
    const { data } = this.state || {};

    if (data) {
      const { data: arrayData } = data;

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

          const firstPublishDateObject = new Date(Date.parse(firstPubDate));
          const displayDateObject = new Date(Date.parse(displayDate));
          const firstPublishDateInMilliSeconds = firstPublishDateObject.getTime();
          const displayDateInMilliSeconds = displayDateObject.getTime();
          const currentOffset = displayDateInMilliSeconds - firstPublishDateInMilliSeconds;

          const isUpdated = currentOffset >= 60000;
          const pubDate = isUpdated ? displayDateObject : firstPublishDateObject;

          const weekDay = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(pubDate);
          const day = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(pubDate);
          const month = new Intl.DateTimeFormat('en', { month: 'long' }).format(pubDate);
          const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(pubDate);
          const hour = new Intl.DateTimeFormat('en', { hour: '2-digit', hour12: false }).format(pubDate);
          const min = new Intl.DateTimeFormat('en', { minute: '2-digit' }).format(pubDate);
          const sec = new Intl.DateTimeFormat('en', { second: '2-digit' }).format(pubDate);
          const timeZoneName = new Intl.DateTimeFormat('en', { timeZoneName: 'short' }).format(pubDate);

          const [, timezone] = timeZoneName.split(' ');

          const formattedDate = `${weekDay}, ${day} ${month} ${year} ${hour}:${min}:${sec} ${timezone}`;

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

            xmlObject.mediacontent = `
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

Api.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections']).tag({
      name: 'Content',
    }),
  }),
};

export default Api;
