import React from 'react';
import PropTypes from 'prop-types';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';

const OverlayMosiac = ({ data }) => {
  const first = data && data[0] ? data[0] : null;
  const second = data && data[1] ? data[1] : null;
  const final = data && data.length ? data[data.length - 1] : null;

  const firstImgSrc = first && first.props && first.props.data && first.props.data.url ? first.props.data.url : null;
  const firstWidth = 500;
  const firstHeight = Math.floor(firstWidth * 0.58);
  const rightImageWidth = 200;
  const rightImageHeight = Math.floor(200 * 0.58);

  const secondImgSrc = second && second.props && second.props.data && second.props.data.url ? second.props.data.url : null;
  const finalImgSrc = final && final.props && final.props.data && final.props.data.url ? final.props.data.url : null;

  const resizedFirst = firstImgSrc ? imageResizer(firstImgSrc, firstWidth, firstHeight) : null;
  const resizedSecond = secondImgSrc ? imageResizer(secondImgSrc, rightImageWidth, rightImageHeight) : null;
  const resizedFinal = finalImgSrc ? imageResizer(finalImgSrc, rightImageWidth, rightImageHeight) : null;

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
