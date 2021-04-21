import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import socialPatterns from './ampSocialPatterns';
import { decodeString } from '../stringUtils';

class AmpEmbedWrapper extends PureComponent {
  constructor(props) {
    super(props);

    const { element, isHtml } = this.props;
    const html = decodeString(get(element, 'content', get(element, 'html', '')));
    this.data = {};
    this.isHtml = isHtml;

    socialPatterns.map((item) => {
      const reg = new RegExp(item.idRegex);
      const regArr = html.match(reg);

      if (regArr) {
        const socialId = regArr[item.idIndex];
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
      if (this.isHtml && pattern.name !== 'pinterest') {
        return null;
      }
      const TagName = pattern.ampTag;
      const tagAttributes = {};
      const [idRefAttributeItem] = pattern.ampTagAttributes.filter(item => item.name === pattern.idRefAttribute);
      tagAttributes[pattern.idRefAttribute] = `${get(idRefAttributeItem, 'defaultvalue', '')}${socialId}`;
      pattern.ampTagAttributes.forEach((item) => {
        if (item.name === pattern.idRefAttribute) return;
        tagAttributes[item.name] = item.defaultvalue;
      });
      return <TagName {...tagAttributes} />;
    }

    if (this.props.render) return this.props.render();
    return null;
  }
}

AmpEmbedWrapper.propTypes = {
  element: PropTypes.object,
  isHtml: PropTypes.bool,
  render: PropTypes.func,
};

export default AmpEmbedWrapper;
