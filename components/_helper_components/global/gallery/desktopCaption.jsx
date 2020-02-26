import React from 'react';
import PropTypes from 'prop-types';

const DesktopCaption = (props) => {
  const { data } = props;
  const { elementData } = data;
  const { affiliation = [], credit = [], caption } = elementData;

  let affiliationCredit = affiliation[0] && affiliation[0].name ? affiliation[0].name : null;

  console.log('affiliation', affiliationCredit);

  if (affiliationCredit && !affiliationCredit.includes('Credit:')) {
    affiliationCredit = `Credit: ${affiliationCredit}`;
  }

  return (
    <div className="gallery-caption-container ">
      {affiliationCredit || (credit[0] && credit[0].name)
        ? <div className="gallery-credit ">
          {affiliationCredit || `Credit: ${credit[0] && credit[0].name}`}
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
