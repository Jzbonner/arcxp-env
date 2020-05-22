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

      return {
        ...arrayData,
      };
    }

    return ['no data'];
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
