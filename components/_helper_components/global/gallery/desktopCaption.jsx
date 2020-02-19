import React from 'react';
import PropTypes from 'prop-types';

const DesktopCaption = (props) => {
  const { data } = props;
  const { elementData } = data;
  const { affiliation = [], credit = [], caption } = elementData;

  return (
    <div className="gallery-caption-container ">
      {(affiliation[0] && affiliation[0].name) || (credit[0] && credit[0].name)
        ? <div className="gallery-credit ">
          {(affiliation[0] && affiliation[0].name) || `Credit: ${credit[0] && credit[0].name}`}
    </div> : null}
      {caption && <div className="gallery-caption "><span>{caption}</span></div>}
    </div>
  );
};

DesktopCaption.propTypes = {
  data: PropTypes.object,
  elementData: PropTypes.object,
  isCaptionOn: PropTypes.bool,
};

export default DesktopCaption;
