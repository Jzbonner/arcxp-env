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
      content,
      list_type: listType,
      items: listItems,
      _id: elId,
    } = cEl;

    switch (cElType) {
      case 'divider':
        if (!dividerSet) {
          dividerIndex = i;
          dividerSet = true;
        }
        infoBoxContent.push({ type: 'hr', key: elId, content: '' });
        break;
      case 'text':
        infoBoxContent.push({ type: 'p', key: elId, content });
        break;
      case 'header':
        infoBoxContent.push({ type: 'h3', key: elId, content });
        break;
      case 'list':
        if (listType === 'ordered') {
          infoBoxContent.push({ type: 'ol', key: elId, content: listItems.map(li => <li key={`li-${li._id}`}>{li.content}</li>) });
        } else {
          infoBoxContent.push({ type: 'ul', key: elId, content: listItems.map(li => <li key={`li-${li._id}`}>{li.content}</li>) });
        }
        break;
      default:
        infoBoxContent.push({
          type: 'span',
          key: elId,
          class: 'is-hidden',
          content: `unsupported content element: ${cElType}`,
        });
    }
    return infoBoxContent;
  });
  const shownContent = dividerIndex > 0 ? infoBoxContent.splice(0, dividerIndex) : infoBoxContent;
  const hiddenContent = dividerIndex > 0 ? infoBoxContent.splice(dividerIndex + 1) : [];
  const hasHiddenContent = hiddenContent.length;

  return <div className={`c-infoBox ${border}`}>
    {infoBoxHeadline && <h1>{infoBoxHeadline}</h1>}
    {shownContent.map(sCon => <sCon.type key={sCon.key} className={sCon.class}>{sCon.content}</sCon.type>)}
    {hasHiddenContent && <div className={`infoBox-hiddenContent ${isHidden ? '' : 'is-visible'}`}>
      {hiddenContent.map(hCon => <hCon.type key={hCon.key} className={hCon.class}>{hCon.content}</hCon.type>)}
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
