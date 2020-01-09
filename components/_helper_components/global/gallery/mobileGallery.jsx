import React from 'react';
import PropTypes from 'prop-types';
import middleBox from '../../../../resources/icons/gallery/middle-box.svg';

const MobileGallery = (props) => {
  const {
    data, states, objectRef, toggleOff, toggleOn, close,
  } = props;
  const {
    isStickyVisible, isCaptionOn, currentIndex, maxIndex,
  } = states;

  return (
    <div className="gallery-immersive hidden-large">
      <div className="gallery-sticky">
        <div className="gallery-caption-toggle">
          <a onClick={toggleOff} href="#"
            title="captions on"
            className={`gallery-caption-trigger ${isCaptionOn ? 'is-active' : ''}`}>on</a>
          <a onClick={toggleOn} href="#"
            title="captions off"
            className={`gallery-caption-trigger 
                ${!isCaptionOn ? 'is-active' : ''}`}>off</a>
          <div>Captions</div>
        </div>
        <div className="gallery-count">
          <img src={middleBox} className="icon-sticky"></img>
          <span className="gallery-index"> {currentIndex + 1}   /   {maxIndex + 1} </span>
        </div>
        <div onClick={close} className="gallery-immersive--close"></div>
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
  close: PropTypes.func,
  toggleOn: PropTypes.func,
  toggleOff: PropTypes.func,
};

export default MobileGallery;
