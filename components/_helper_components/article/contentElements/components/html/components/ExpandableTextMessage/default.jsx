import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'htmlparser2';
import get from 'lodash.get';
import './default.scss';

class ExpandableTextMessage extends PureComponent {
  constructor(props) {
    super(props);

    let headingText;
    let contentText;

    const parser = new Parser({
      onopentag: (tag, attribs) => {
        headingText = get(attribs, 'data-heading');
      },
      ontext: (text) => {
        contentText = text;
      },
    });

    parser.write(this.props.html);
    parser.end();
    this.headingText = headingText;
    this.contentText = contentText;
  }

  /* eslint-disable */
  componentDidMount() {
    const toggleBoxClass = (parentBox) => {
      let parentBoxClass = parentBox.className;
      parentBox.className = parentBoxClass.indexOf('condensed') > -1 ? parentBoxClass.replace(
        'condensed', '') : parentBoxClass + ' condensed';
    };
    const boxTextArr = document.querySelectorAll('.inline--box_text');
    document.querySelectorAll('.box_text--arrow').forEach((boxText, i) => {
      let parentBox = boxTextArr[i];
      boxText.addEventListener('click', () => {
        toggleBoxClass(parentBox);
      });
    });
  }
  /* eslint-enable */

  render() {
    const headingText = get(this, 'headingText');
    const contentText = get(this, 'contentText');

    return (<div className="inline--box_text condensed">
      {headingText ? <div className="box_text--title">{headingText}</div> : null}
      {contentText ? <div className="box_text--content"><p>{contentText}</p></div> : null}
      <div className="box_text--footer">
        <div className="box_text--arrow"><span className="arrow--pointer"></span><span className="arrow--line"></span></div>
      </div>
    </div>);
  }
}

ExpandableTextMessage.propTypes = {
  html: PropTypes.string,
  src: PropTypes.string,
  render: PropTypes.func,
};

export default ExpandableTextMessage;