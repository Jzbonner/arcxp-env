import React from 'react';
import PropTypes from 'prop-types';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';

const OverlayMosiac = ({ data }) => {
  const first = data && data[0] ? data[0] : null;
  const second = data && data[1] ? data[1] : null;
  const final = data && data.length ? data[data.length - 1] : null;

  const firstImgSrc = first && first.props && first.props.data && first.props.data.url ? first.props.data.url : null;
  const secondImgSrc = second && second.props && second.props.data && second.props.data.url ? second.props.data.url : null;
  const finalImgSrc = final && final.props && final.props.data && final.props.data.url ? final.props.data.url : null;

  const resizedFirst = firstImgSrc ? imageResizer(firstImgSrc, 600, 600 * 0.58) : null;
  const resizedSecond = secondImgSrc ? imageResizer(secondImgSrc, 300, 300 * 0.58) : null;
  const resizedFinal = finalImgSrc ? imageResizer(finalImgSrc, 300, 300 * 0.58) : null;

  return (
    <div className="gallery-overlay-backdrop ">
      <div className="left-backdrop">
        {resizedFirst && <div className="mosaic-container"><img className="gallery-image mosaic-image" src={resizedFirst} /></div>}
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
