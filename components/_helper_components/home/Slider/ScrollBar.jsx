import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './ScrollBar.scss';

const ScrollBar = ({
  currentScrollLeft, maxWidth = 0, maxScrollLeft, sliderId,
}) => {
  const scrollId = `slider-${sliderId}`;

  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbScrollLeft, setThumbScrollLeft] = useState(0);

  const scrollTrackEl = useRef(null);

  const calculateThumbWidth = () => {
    const scrollWidth = scrollTrackEl.current ? scrollTrackEl.current.offsetWidth : null;
    const widthRatio = parseInt(scrollWidth, 10) / parseInt(maxWidth, 10);

    const thumbW = parseInt(scrollWidth, 10) * widthRatio;

    if (thumbWidth !== thumbW) {
      setThumbWidth(thumbW);
    }
  };
  /* Ensures the ScrollBar thumb's scrollLeft value
  is proportional to the main content container's scrollLeft value */
  const calculateScrollLeft = (sliderScrollLeft) => {
    const scrollWidth = scrollTrackEl.current ? scrollTrackEl.current.offsetWidth : null;
    const adjustedRatio = sliderScrollLeft / parseInt(maxScrollLeft, 10);
    const adjustedScrollWidth = scrollWidth - thumbWidth;
    setThumbScrollLeft(adjustedScrollWidth * adjustedRatio);
  };

  useEffect(() => {
    calculateThumbWidth();
  }, [sliderId, maxWidth]);

  useEffect(() => {
    calculateScrollLeft(currentScrollLeft);
  }, [currentScrollLeft]);

  return (
    <div className="c-scroll-bar">
      <div ref={scrollTrackEl} className={`scroll-track ${scrollId}`}>
        <div id={scrollId} style={{ width: `${thumbWidth}px`, transform: `translateX(${thumbScrollLeft}px)` }} className="scroll-thumb"></div>
      </div>
    </div>
  );
};

ScrollBar.propTypes = {
  currentScrollLeft: PropTypes.number,
  maxScrollLeft: PropTypes.number,
  maxWidth: PropTypes.number,
  sliderId: PropTypes.any,
};

export default ScrollBar;
