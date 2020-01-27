// resolving git issues
import React from 'react';
import PropTypes from 'prop-types';
import middleBox from '../../../../resources/icons/gallery/middle-box.svg';

const MobileGallery = (props) => {
  const {
    data, states, objectRef, funcs,
  } = props;
  const {
    handleStickyClose, captionOn, captionOff,
  } = funcs;
  const {
    isStickyVisible, isCaptionOn, currentIndex, maxIndex,
  } = states;

  return (
    <div className="gallery-immersive hidden-large">
      <div className="gallery-sticky">
        <div className="gallery-caption-toggle">
          <a onClick={captionOff} href="#"
            title="captions on"
            className={`gallery-caption-trigger ${isCaptionOn ? 'is-active' : ''}`}>on</a>
          <a onClick={captionOn} href="#"
            title="captions off"
            className={`gallery-caption-trigger
                ${!isCaptionOn ? 'is-active' : ''}`}>off</a>
          <div>Captions</div>
        </div>
        <div className="gallery-count">
          <img src={middleBox} className="icon-sticky"></img>
          <span className="gallery-index"> {currentIndex + 1}   /   {maxIndex + 1} </span>
        </div>
        <div onClick={handleStickyClose} className="gallery-immersive--close"></div>
      </div>
      <div id="MOBILE_GALLERY" ref={objectRef} className="gallery-full">
        {isStickyVisible ? data : null}
      </div>
    </div>
  );
};

MobileGallery.propTypes = {
  data: PropTypes.array,
  states: PropTypes.object,
  objectRef: PropTypes.object,
  funcs: PropTypes.object,
};

export default MobileGallery;
