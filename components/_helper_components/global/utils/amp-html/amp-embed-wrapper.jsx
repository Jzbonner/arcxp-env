import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import socialPatterns from './ampSocialPatterns';

class AmpEmbedWrapper extends PureComponent {
  constructor(props) {
    super(props);

    const { html } = this.props;
    this.data = {};

    socialPatterns.map((item) => {
      const reg = new RegExp(item.idRegex);
      const regArr = html.match(reg);
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
      tagAttributes[pattern.idRefAttribute] = socialId;
      pattern.ampTagAttributes.forEach((item) => { tagAttributes[item.name] = item.defaultvalue; });
      return <TagName {...tagAttributes} />;
    }

    if (this.props.render) return this.props.render();
    return null;
  }
}

AmpEmbedWrapper.propTypes = {
  html: PropTypes.string,
  render: PropTypes.func,
};

export default AmpEmbedWrapper;
