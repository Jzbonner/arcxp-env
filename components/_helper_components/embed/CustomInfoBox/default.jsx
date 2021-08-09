import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../global/image/default.jsx';

const CustomInfoBox = ({ data }) => {
  const {
    headlines,
    content_elements: contentElements,
  } = data || {};

  const infoBoxHeadline = headlines?.basic;
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
      case 'image':
        // a height of 0 makes the height proportional to the width
        infoBoxContent.push(
          <Image
            width={800}
            height={0}
            src={cEl}
            imageType="isInlineImage"
            imageMarginBottom="b-margin-bottom-d40-m20"
            key={`Image-${i}`}
          />,
        );
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
        return null;
    }
    return infoBoxContent;
  });
  const shownContent = dividerIndex > 0 ? infoBoxContent.splice(0, dividerIndex) : infoBoxContent;
  const hiddenContent = dividerIndex > 0 ? infoBoxContent.splice(dividerIndex + 1) : [];

  return <div className='c-infoBox'>
    {infoBoxHeadline && <h1>{infoBoxHeadline}</h1>}
    {shownContent.map(sCon => <>{sCon}</>)}
    {hiddenContent.length && <div className='infoBox-hiddenContent'>
      {hiddenContent.map(hCon => <>{hCon}</>)}
    </div>}
  </div>;
};


CustomInfoBox.propTypes = {
  data: PropTypes.object,
};
CustomInfoBox.defaultProps = {
  componentName: 'CustomInfoBox',
};

export default CustomInfoBox;
