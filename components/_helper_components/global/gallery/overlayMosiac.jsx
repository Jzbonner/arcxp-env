import React from 'react';
import PropTypes from 'prop-types';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';

const OverlayMosiac = ({ data }) => {
  const first = data && data[0] ? data[0] : null;
  const second = data && data[1] ? data[1] : null;
  const final = data && data.length ? data[data.length - 1] : null;

  const secondImgSrc = second && second.props && second.props.data && second.props.data.url ? second.props.data.url : null;
  const finalImgSrc = final && final.props && final.props.data && final.props.data.url ? final.props.data.url : null;

  const resizedSecond = secondImgSrc ? imageResizer(secondImgSrc, 157, 106) : null;
  const resizedFinal = finalImgSrc ? imageResizer(finalImgSrc, 157, 106) : null;

  return (
    <div className="gallery-overlay-backdrop ">
      <div className="left-backdrop">
        {first || null}
      </div>
      <div className="right-backdrop">
        {resizedSecond && <div className="mosaic-container"><img className="gallery-image mosaic-image" src={resizedSecond} /></div>}
        {resizedFinal && <div className="mosaic-container"><img className="gallery-image mosaic-image" src={resizedFinal} /></div>}
      </div>
    </div>
  );
};

OverlayMosiac.propTypes = {
  data: PropTypes.array,
};

export default OverlayMosiac;
