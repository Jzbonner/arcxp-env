import React, { useState, useEffect } from 'react';
import './ScrollBar.scss';

const ScrollBar = ({ maxWidth, currentScrollLeft, sliderId }) => {
  console.log('propped width', maxWidth);
  console.log('propped scrollLeft', currentScrollLeft);
  console.log('propped id', sliderId);

  const scrollId = `slider-${sliderId}`;

  const [thumbWidth, setThumbWidth] = useState(1);

  const [thumbScrollLeft, setThumbScrollLeft] = useState(0);

  const scrollTrack = document.querySelector('.scroll-track');

  const maxScrollLeft = maxWidth - document.querySelector('.itemList').clientWidth;

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
    console.log('calculating scroll left');
    const scrollWidth = document.querySelector('.scroll-track').offsetWidth;

    const adjustedRatio = sliderScrollLeft / maxScrollLeft;

    setThumbScrollLeft(scrollWidth * adjustedRatio);
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
        <div id={scrollId} style={{ width: `${thumbWidth}px`, transform: `translateX(${-thumbScrollLeft}px)` }} className="scroll-thumb"></div>
      </div>
    </div>
  );
};

export default ScrollBar;
