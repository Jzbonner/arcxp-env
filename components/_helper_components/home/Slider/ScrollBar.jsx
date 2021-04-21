import React, { useState, useEffect } from 'react';
import './ScrollBar.scss';

const ScrollBar = ({ maxWidth, maxScrollLeft, currentScrollLeft, sliderId }) => {
  console.log('propped width', maxWidth);
  console.log('propped scrollLeft', currentScrollLeft);
  console.log('propped id', sliderId);

  const scrollId = `slider-${sliderId}`;

  const [thumbWidth, setThumbWidth] = useState(1);

  const [thumbScrollLeft, setThumbScrollLeft] = useState(0);

  console.log('offset left from scrollbar', currentScrollLeft);


  const calculateThumbWidth = () => {
    const scrollWidth = document.querySelector('.scroll-track').offsetWidth;

    const widthRatio = parseInt(scrollWidth, 10) / parseInt(maxWidth, 10);

    const thumbW = parseInt(scrollWidth, 10) * widthRatio;

    if (thumbWidth !== thumbW) {
      setThumbWidth(thumbW);
    }
  };

  const calculateScrollLeft = (sliderScrollLeft) => {
    console.log('calculating scroll left', sliderScrollLeft);
    const scrollWidth = document.querySelector('.scroll-track').offsetWidth;
    console.log('calculating scroll with', scrollWidth);
    const adjustedRatio = sliderScrollLeft / maxScrollLeft;
    console.log('calculateScrollLeft adjusted ratio', adjustedRatio);

    console.log('calculated', scrollWidth * adjustedRatio);

    setThumbScrollLeft(scrollWidth * adjustedRatio);
  };

  useEffect(() => {
    calculateThumbWidth();
  }, [maxWidth]);

  useEffect(() => {
    calculateScrollLeft(currentScrollLeft);
  }, [currentScrollLeft]);

  console.log('scrolllbar current thumb scroll', thumbScrollLeft);

  return (
    <div className="c-scroll-bar">
      <div className={`scroll-track ${scrollId}`}>
        <div id={scrollId} style={{ width: `${thumbWidth}px`, transform: `translateX(${thumbScrollLeft}px)` }} className="scroll-thumb"></div>
      </div>
    </div>
  );
};

export default ScrollBar;
