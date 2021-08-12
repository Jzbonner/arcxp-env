import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import Image from '../../global/image/default.jsx';
import './default.scss';

const CustomInfoBox = ({ data, borderColor }) => {
  const {
    headlines,
    content_elements: contentElements,
    taxonomy,
  } = data || {};

  const infoBoxHeadline = headlines?.basic;
  const [isHidden, setVisibility] = useState(true);
  const toggleVisibility = () => {
    setVisibility(!isHidden);
  };
  let border = borderColor && borderColor !== '' ? `border-${borderColor}` : 'border-gray';
  const { tags = [] } = taxonomy || {};
  if (tags.length) {
    const borderTags = tags.filter(tag => tag.indexOf('border-') > -1);
    if (borderTags.length) {
      const { 0: borderTag } = borderTags;
      border = borderTag;
    }
  }
  let dividerIndex = -1;
  let dividerSet = false;
  const infoBoxContent = [];
  contentElements.forEach((cEl, i) => {
    const {
      type: cElType,
      level,
      content,
      list_type: listType,
      items: listItems,
    } = cEl;

    switch (cElType) {
      case 'divider':
        if (!dividerSet) {
          dividerIndex = i;
          dividerSet = true;
        }
        infoBoxContent.push(<hr key={`divider${i}`} />);
        break;
      case 'text':
        infoBoxContent.push(<p key={`p${i}`}>{content}</p>);
        break;
      case 'header':
        infoBoxContent.push(<h3 key={`h${level}-${i}`}>{content}</h3>);
        break;
      case 'list':
        if (listType === 'ordered') {
          infoBoxContent.push(<ol key={`list-${i}`}>
            {listItems.map((li, l) => <li key={`li${l}`}>{li.content}</li>)}
          </ol>);
        } else {
          infoBoxContent.push(<ul key={`list-${i}`}>
            {listItems.map((li, l) => <li key={`li${l}`}>{li.content}</li>)}
          </ul>);
        }
        break;
      default:
        infoBoxContent.push(<span style={{ display: 'none' }}>unsupported content element: {cElType}</span>);
    }
    return infoBoxContent;
  });
  const shownContent = dividerIndex > 0 ? infoBoxContent.splice(0, dividerIndex) : infoBoxContent;
  const hiddenContent = dividerIndex > 0 ? infoBoxContent.splice(dividerIndex + 1) : [];
  const hasHiddenContent = hiddenContent.length;

  return <div className={`c-infoBox ${border}`}>
    {infoBoxHeadline && <h1>{infoBoxHeadline}</h1>}
    {shownContent.map(sCon => <>{sCon}</>)}
    {hasHiddenContent && <div className={`infoBox-hiddenContent ${isHidden ? '' : 'is-visible'}`}>
      {hiddenContent.map(hCon => <>{hCon}</>)}
    </div>}
    {hasHiddenContent && <hr className={isHidden ? '' : 'is-clicked'} onClick={toggleVisibility} />}
  </div>;
};


CustomInfoBox.propTypes = {
  data: PropTypes.object,
  borderColor: PropTypes.string,
};
CustomInfoBox.defaultProps = {
  componentName: 'CustomInfoBox',
};

export default CustomInfoBox;
