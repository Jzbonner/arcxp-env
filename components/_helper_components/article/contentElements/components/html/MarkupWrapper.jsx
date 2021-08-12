import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'htmlparser2';
import get from 'lodash/get';
import ScriptWrapper from './components/Script/default';
import ExpandableTextMessage from './components/ExpandableTextMessage/default';
import PymLoader from './components/PymLoader/default';
import ComposerEmbed from '../../../../../features/ComposerEmbed/default';

class MarkupWrapper extends PureComponent {
  constructor(props) {
    super(props);

    const plugins = [
      'script',
      'ExpandableTextMessage',
      'PymLoader',
      'CustomInfoBox',
    ];

    let component;

    const parser = new Parser({
      onopentag: (tag) => {
        const findComponent = plugins.find(item => item.toLowerCase() === tag.toLowerCase());
        if (!findComponent) return;
        component = findComponent;
      },
    });

    parser.write(this.props.html);
    parser.end();
    if (component) this.component = component;
  }

  render() {
    const component = get(this, 'component');
    if (!component) return <div dangerouslySetInnerHTML={{ __html: this.props.html }} />;
    const embedHtml = this.props.html;
    switch (component) {
      case 'ExpandableTextMessage':
        return <ExpandableTextMessage html={embedHtml} />;
      case 'script':
        return <ScriptWrapper html={embedHtml} />;
      case 'PymLoader':
        return <PymLoader html={embedHtml} />;
      case 'CustomInfoBox':
        return <ComposerEmbed {...{ composerHtml: embedHtml }} />;
      default:
        return <></>;
    }
  }
}

MarkupWrapper.propTypes = {
  html: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
};

export default MarkupWrapper;
