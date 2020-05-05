import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash.get';
import socialPatterns from './ampSocialPatterns';

class AmpEmbedWrapper extends PureComponent {
  constructor(props) {
    super(props);

    const { element } = this.props;
    const html = decodeURI(get(element, 'content', get(element, 'html')));
    this.data = {};

    // console.log("----------------------------------------------------------------")
    // console.log("AmpEmbedWrapper => ", html)

    socialPatterns.map((item) => {
      const reg = new RegExp(item.idRegex);
      const regArr = html.match(reg);
      // console.log("AmpEmbedWrapper map => ", reg, regArr)

      if (regArr) {
        const socialId = regArr[1];

        if (socialId) {
          this.data.socialId = socialId;
          this.data.pattern = item;
        }
      }
      return false;
    });
  }

  render() {
    if (this.data.socialId && this.data.pattern) {
      const { pattern, socialId } = this.data;
      const TagName = pattern.ampTag;
      const tagAttributes = {};
      const [idRefAttributeItem] = pattern.ampTagAttributes.filter(item => item.name === pattern.idRefAttribute);
      tagAttributes[pattern.idRefAttribute] = `${get(idRefAttributeItem, 'defaultvalue', '')}${socialId}`;
      pattern.ampTagAttributes.forEach((item) => {
        if (item.name === pattern.idRefAttribute) return;
        tagAttributes[item.name] = item.defaultvalue;
      });
      // console.log("=== tagAttributes => ", tagAttributes)
      return <TagName {...tagAttributes} />;
    }

    if (this.props.render) return this.props.render();
    return null;
  }
}

AmpEmbedWrapper.propTypes = {
  element: PropTypes.object,
  render: PropTypes.func,
};

export default AmpEmbedWrapper;
