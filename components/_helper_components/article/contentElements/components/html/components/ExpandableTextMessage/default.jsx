import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Parser } from 'htmlparser2';
import get from 'lodash/get';
import './default.scss';
import { safeHtml } from '../../../../../../global/utils/stringUtils';

class ExpandableTextMessage extends PureComponent {
  constructor(props) {
    super(props);

    let headingText;
    const contentText = this.props.html;

    const parser = new Parser({
      onopentag: (tag, attribs) => {
        if (tag === 'expandabletextmessage') {
          headingText = get(attribs, 'data-heading');
        }
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
    document.querySelectorAll('.box_text--footer .icon').forEach((boxText, i) => {
      let parentBox = boxTextArr[i];
      if (!boxText.getAttribute('data-handler-assigned')) {
        boxText.addEventListener('click', () => {
          toggleBoxClass(parentBox);
        });
        boxText.setAttribute('data-handler-assigned', true);
      }
    });
  }
  /* eslint-enable */

  render() {
    const headingText = get(this, 'headingText');
    const contentText = get(this, 'contentText');

    return (<div className="inline--box_text condensed">
      {headingText ? <div className="box_text--title">{headingText}</div> : null}
      {contentText ? <div className="box_text--content" dangerouslySetInnerHTML={{ __html: safeHtml(contentText) }} /> : null}
      <div className="box_text--footer">
        <div className="icon">
          <div className="arrow"></div>
        </div>
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
