import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './default.scss';

/* this helper component renders the Custom Info Box as outlined in APD-1441 */
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
  // the border color is customizable, either via dropdown in pagebuilder custom fields (line 19) or via tags added in composer (lines 20-27)
  let border = borderColor && borderColor !== '' ? `border-${borderColor}` : 'border-gray';
  const { tags = [] } = taxonomy || {};
  if (tags.length) {
    const borderTags = tags.filter(tag => tag?.slug.indexOf('border-') > -1);
    if (borderTags.length) {
      const { 0: borderTag } = borderTags;
      border = borderTag?.slug;
    }
  }
  let dividerIndex = -1;
  let dividerSet = false;
  const infoBoxContent = [];
  contentElements.forEach((cEl, i) => {
    const {
      type: cElType,
      content,
      level,
      list_type: listType,
      items: listItems,
      _id: elId,
    } = cEl;
    const formattedListItems = listItems && listItems.map(li => <li key={`li-${li._id}`} dangerouslySetInnerHTML={{ __html: li.content }}></li>);

    // we loop through the elements in the custom info box subtype and push their contents to a new array for later rendering
    switch (cElType) {
      case 'divider':
        // dividers are special, they (the first one) determine the "hide/show" delimiter of the info box
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
        infoBoxContent.push({ type: `h${level}`, key: elId, content });
        break;
      case 'list':
        if (listType === 'ordered') {
          infoBoxContent.push({ type: 'ol', key: elId, content: formattedListItems });
        } else {
          infoBoxContent.push({ type: 'ul', key: elId, content: formattedListItems });
        }
        break;
      default:
        // if it's an element that we don't officially support in info boxes, it gets pushed as a hidden span (so that we have evidence of the mismatched element in source code)
        infoBoxContent.push({
          type: 'span',
          key: elId,
          class: 'is-hidden',
          content: `unsupported content element: ${cElType}`,
        });
    }
    return infoBoxContent;
  });
  // if there is a divider, we split the array accordingly
  const shownContent = dividerIndex > 0 ? infoBoxContent.splice(0, dividerIndex) : infoBoxContent;
  const hiddenContent = dividerIndex > 0 ? infoBoxContent.splice(dividerIndex) : [];
  const hasHiddenContent = hiddenContent.length;
  const renderContent = (con) => {
    if (typeof con.content === 'string') {
      return <con.type key={con.key} className={con.class} dangerouslySetInnerHTML={{ __html: con.content }}></con.type>;
    }
    return <con.type key={con.key} className={con.class}>{con.content}</con.type>;
  };

  return <div className={`c-infoBox ${border}`}>
    {infoBoxHeadline && <h1>{infoBoxHeadline}</h1>}
    {shownContent.map(sCon => renderContent(sCon))}
    {hasHiddenContent && <div className={`infoBox-hiddenContent ${isHidden ? '' : 'is-visible'}`}>
      {hiddenContent.map(hCon => renderContent(hCon))}
    </div>}
    {/* the divider becomes an HR element which handles the hide/show click event */}
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
