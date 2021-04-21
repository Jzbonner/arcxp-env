import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'htmlparser2';
import get from 'lodash/get';
import ScriptWrapper from './components/Script/default';
import ExpandableTextMessage from './components/ExpandableTextMessage/default';
import PymLoader from './components/PymLoader/default';

class MarkupWrapper extends PureComponent {
  constructor(props) {
    super(props);

    const plugins = [
      'script',
      'ExpandableTextMessage',
      'PymLoader',
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
    switch (component) {
      case 'ExpandableTextMessage':
        return <ExpandableTextMessage html={this.props.html} />;
      case 'script':
        return <ScriptWrapper html={this.props.html} />;
      case 'PymLoader':
        return <PymLoader html={this.props.html} />;
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
