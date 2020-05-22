import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';
import { CONTENT_BASE } from 'fusion:environment';

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
          canonical_url: canonicalUrl,
          _id: guid,
          headlines,
          first_publish_date,
          description,
          credits,
        } = item || {};

        const title = headlines && headlines.basic ? `<![CDATA[${headlines.basic}]]>` : '';
        const author = credits && credits.by && credits.by[0] && credits.by[0].name ? `<![CDATA[${credits.by[0].name}]]>` : '';
        const formattedDescription = description && description.basic ? `<![CDATA[${description.basic}]]>` : '';

        const xmlObject = {
          item: {
            guid: `urn:uuid:${guid}`,
            link: `${CONTENT_BASE}${canonicalUrl}`,
            description: formattedDescription,
            title,
            author,
          },
        };

        return xmlObject;
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
