import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'htmlparser2';
import sanitizeHtml from 'sanitize-html';
import './styles.scss';

class MarkupWrapper extends PureComponent {
  constructor(props) {
    super(props);
    if (!props.src) {
      // don't have a defined endpoint so we need to parse the html
      let inScript = false;
      let src = '';
      let script = '';
      const parser = new Parser({
        onopentag: (tag, attribs) => {
          if (tag !== 'script') return;
          ({ src } = attribs);
          if (!src) inScript = true;
        },
        ontext: (text) => {
          if (!inScript) return;
          script = text;
        },
        onclosetag: (tag) => {
          if (tag !== 'script') return;
          inScript = false;
        },
      });
      parser.write(this.props.html);
      parser.end();
      if (src) this.scriptSrc = src;
      if (script) this.scriptText = script;
    }

    this.parsedHtml = sanitizeHtml(
      this.props.html,
      {
        allowedTags: false,
        allowedAttributes: false,
        exclusiveFilter: frame => frame.tag === 'script',
      },
    );
  }

  componentDidMount() {
    const src = this.props.src || this.scriptSrc;
    if (src) {
      // if the endpoint is more than 1024 char, something is wrong
      const type = `src-${src}`.substring(0, 1024);
      if (window[type]) return;
      window[type] = true;
    }
    const script = document.createElement('script');
    script.setAttribute('data-script', 'constructed');
    script.async = true;
    if (src) script.src = src;
    if (this.scriptText) script.text = this.scriptText;
    document.getElementsByTagName('body')[0].appendChild(script);
  }

  render() {
    if (this.props.render) return this.props.render();
    return <div dangerouslySetInnerHTML={{ __html: this.parsedHtml }} />;
  }
}


MarkupWrapper.propTypes = {
  html: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
};

export default MarkupWrapper;
