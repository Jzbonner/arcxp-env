import PropTypes from 'prop-types';
import Consumer from 'fusion:consumer';

@Consumer
class Api {
  constructor(props) {
    this.props = props;
    const {
      customFields: {
        content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      } = {},
    } = props;

    this.fetchContent({
      data: {
        source: contentService,
        query: {
          ...contentConfigValues,
          arcSite: 'ajc',
        },
      },
    });
  }

  render() {
    const { data } = this.state || {};

    if (data) {
      const apiData = data.content_elements.map((el) => {
        console.log('carlos el', el);
        // pass to another component that fetches content based on content id?
        return el;
      });

      return {
        ...apiData,
      };
    }

    return null;
  }
}

Api.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 100,
    }),
    displayClass: PropTypes.oneOf(['Top Photo', 'Left Photo', 'No Photo', 'Link']).tag({
      name: 'Display Class',
      defaultValue: 'Top Photo',
    }),
    columns: PropTypes.oneOf(['1', '2', '3', '4']).tag({
      name: 'Columns',
      defaultValue: 1,
    }),
    title: PropTypes.string.tag({
      name: 'Title - Top, Left, No Photo Display Classes Only',
    }),
  }),
};

export default Api;
