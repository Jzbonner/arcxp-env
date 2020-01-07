import React from 'react';
import PropTypes from 'prop-types';

const DesktopCaption = (props) => {
  const { data } = props;
  const { elementData, isCaptionOn } = data;
  const { credit, caption } = elementData;

  return (
    <div className="gallery-caption-container hidden-small hidden-medium">
    <div className="gallery-credit hidden-small hidden-medium">
      {credit && credit[0] ? `Photo: ${credit[0].name}` : ''}
    </div>
    {isCaptionOn ? (
      <div className="gallery-caption hidden-small hidden-medium">{caption && <span>{caption}</span>}</div>
    ) : null}
  </div>
  );
};

DesktopCaption.propTypes = {
  data: PropTypes.object,
  elementData: PropTypes.object,
  isCaptionOn: PropTypes.bool,
};

export default DesktopCaption;
