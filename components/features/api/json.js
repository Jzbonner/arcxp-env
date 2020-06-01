import Consumer from 'fusion:consumer';

@Consumer
class Api {
  constructor(props) {
    this.props = props;
  }

  render() {
    const { globalContent } = this.props || {};

    if (globalContent) {
      const { data: arrayData } = globalContent || {};

      return {
        ...arrayData,
      };
    }

    return ['no data'];
  }
}

export default Api;
