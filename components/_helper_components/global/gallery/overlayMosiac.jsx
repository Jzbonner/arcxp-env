import React from 'react';
import PropTypes from 'prop-types';
import imageResizer from '../../../layouts/_helper_functions/Resizer';

const OverlayMosiac = ({ data }) => {
  const first = data && data[0] ? data[0] : null;
  const second = data && data[1] ? data[1] : null;
  const final = data && data.length ? data[data.length - 1] : null;

  const firstImgSrc = first && first.props && first.props.data && first.props.data.url ? first.props.data.url : null;
  const firstWidth = first && first.props && first.props.data && first.props.data.width ? first.props.data.width : null;
  const firstHeight = first && first.props && first.props.data && first.props.data.height ? first.props.data.height : null;
  const firstImageWidth = 500;
  // maintains original aspect ratio, for resized first image
  const firstImageHeight = Math.floor(firstImageWidth * (firstHeight / firstWidth));
  const rightImageWidth = 200;
  const rightImageHeight = Math.floor(rightImageWidth * 0.58);

  const secondImgSrc = second && second.props && second.props.data && second.props.data.url ? second.props.data.url : null;
  const finalImgSrc = final && final.props && final.props.data && final.props.data.url ? final.props.data.url : null;

  const resizedFirst = firstImgSrc ? imageResizer(firstImgSrc, firstImageWidth, firstImageHeight) : null;
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
