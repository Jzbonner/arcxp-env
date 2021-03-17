import React from 'react';
import PropTypes from 'prop-types';
import Image from '../image/default';

const OverlayMosiac = ({ data }) => {
  const first = data && data[0] ? data[0] : null;
  const second = data && data[1] ? data[1] : null;
  const final = data && data.length ? data[data.length - 1] : null;

  const firstImg = first?.props?.data || {};
  const secondImg = second?.props?.data || {};
  const finalImg = final?.props?.data || {};
  const firstWidth = firstImg?.width;
  const firstHeight = firstImg?.height;
  const firstImageWidth = 500;
  // maintains original aspect ratio, for resized first image
  const firstImageHeight = Math.floor(firstImageWidth * (firstHeight / firstWidth));
  const rightImageWidth = 200;
  const rightImageHeight = Math.floor(rightImageWidth * 0.58);

  return (
    <div className="gallery-overlay-backdrop ">
      <div className="left-backdrop">
        {firstImg && <div className="mosaic-container"><Image width={firstImageWidth} height={firstImageHeight} src={firstImg} additionalClasses={'gallery-image mosaic-image'} imageType={'isGalleryImage'} /></div>}
      </div>
      <div className="right-backdrop">
        {secondImg && <div className="mosaic-container"><Image width={rightImageWidth} height={rightImageHeight} src={secondImg} additionalClasses={'gallery-image mosaic-image'} imageType={'isGalleryImage'} /></div>}
        {finalImg && <div className="mosaic-container"><Image width={rightImageWidth} height={rightImageHeight} src={finalImg} additionalClasses={'gallery-image mosaic-image'} imageType={'isGalleryImage'} /></div>}
      </div>
    </div>
  );
};

OverlayMosiac.propTypes = {
  data: PropTypes.array,
};

export default OverlayMosiac;
