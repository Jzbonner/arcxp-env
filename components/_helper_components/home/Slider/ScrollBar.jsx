import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScrollBar.scss';

const ScrollBar = ({
  currentScrollLeft, maxWidth, maxScrollLeft, sliderId,
}) => {
  const scrollId = `slider-${sliderId}`;

  const [thumbWidth, setThumbWidth] = useState(0);
  const [thumbScrollLeft, setThumbScrollLeft] = useState(0);


  const calculateThumbWidth = () => {
    const scrollWidth = document.querySelector('.scroll-track').offsetWidth;

    const widthRatio = parseInt(scrollWidth, 10) / parseInt(maxWidth, 10);

    const thumbW = parseInt(scrollWidth, 10) * widthRatio;

    if (thumbWidth !== thumbW) {
      setThumbWidth(thumbW);
    }
  };

  const calculateScrollLeft = (sliderScrollLeft) => {
    const scrollWidth = document.querySelector('.scroll-track').offsetWidth;

    const adjustedRatio = sliderScrollLeft / maxScrollLeft;
    const adjustedScrollWidth = scrollWidth - thumbWidth;
    setThumbScrollLeft(adjustedScrollWidth * adjustedRatio);
  };

  useEffect(() => {
    calculateThumbWidth();
  }, [maxWidth]);

  useEffect(() => {
    calculateScrollLeft(currentScrollLeft);
  }, [currentScrollLeft]);

  return (
    <div className="c-scroll-bar">
      <div className={`scroll-track ${scrollId}`}>
        <div id={scrollId} style={{ width: `${thumbWidth}px`, transform: `translateX(${thumbScrollLeft}px)` }} className="scroll-thumb"></div>
      </div>
    </div>
  );
};

ScrollBar.propTypes = {
  currentScrollLeft: PropTypes.number,
  maxScrollLeft: PropTypes.number,
  maxWidth: PropTypes.string,
  sliderId: PropTypes.string,
};

export default ScrollBar;
