import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { buildSliderItems, getAmount } from './_helper_functions/index';
import rightArrow from '../../../resources/images/right-arrow.svg';
import './Slider.scss';

const Slider = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      // itemLimit = 100,
      displayClass = '',
      startIndex = 1,
      title = '',
    },
  } = customFields;

  // general
  const [sliderItems, setSliderItems] = useState(null);
  const [isMobile, setMobileState] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  // mobile touch swiping
  const [startX, setStartX] = useState(0);
  const [isTouched, setTouchState] = useState(null);
  const [changeX, setChangeValue] = useState(0);

  const actions = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    ADD: 'ADD',
    SUB: 'SUB',
  };

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const elRefs = useRef([]);

  const marginOffset = 15;
  const mobileBreakPoint = 768;

  if (startIndex > 1) contentConfigValues.startIndex = startIndex;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) refArray.current.push(el);
  };

  if (data && !sliderItems) setSliderItems(buildSliderItems(data, el => addToRefs(el, elRefs)));

  const itemOffsetWidth = elRefs.current && elRefs.current[0] ? elRefs.current[0].scrollWidth + marginOffset : null;
  const wrapperClientWidth = wrapperRef.current ? wrapperRef.current.clientWidth : null;
  const contentFullWidth = contentRef.current && sliderItems
    ? (contentRef.current.offsetWidth - wrapperClientWidth) + (marginOffset * 2) : null;

  const calculateTranslateX = (direction) => {
    if (direction === actions.LEFT) {
      const change = getAmount(contentFullWidth, itemOffsetWidth, translateX, actions.SUB);
      if (change) setTranslateX(translateX + change);
    } else if (direction === actions.RIGHT) {
      const change = getAmount(contentFullWidth, itemOffsetWidth, translateX, actions.ADD);
      if (change) setTranslateX(translateX - change);
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === actions.RIGHT) {
      calculateTranslateX(actions.RIGHT);
    } else if (direction === actions.LEFT) {
      calculateTranslateX(actions.LEFT);
    }

    return null;
  };

  const getInitWindowSize = () => {
    if (window.innerWidth <= mobileBreakPoint) {
      setMobileState(true);
    } else {
      setMobileState(false);
    }
  };

  /* mobile slider touch funcs */

  const handleStart = (clientX) => {
    setStartX(clientX);
    setTouchState(true);
  };

  const handleMove = (clientX) => {
    if (isTouched) {
      const deltaX = startX - clientX;
      setChangeValue(deltaX);
    }
  };

  const handleEnd = () => {
    if (changeX < 0) {
      calculateTranslateX(actions.LEFT);
    } else if (changeX > 0) {
      calculateTranslateX(actions.RIGHT);
    }

    setChangeValue(0);
    setStartX(0);
    setTouchState(false);
  };

  const handleTouchStart = (event) => {
    handleStart(event.targetTouches[0].clientX);
  };

  const handleTouchMove = (event) => {
    handleMove(event.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    getInitWindowSize();
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`c-slider-wrapper ${displayClass.toLowerCase().includes('special feature') ? 'is-special-feature' : ''}`}>
      <h1 className="slider-title">{title}</h1>
      <div className="c-slider">
        <div id="slider" className="c-slider-content" >
          <div ref={contentRef}
            onTouchStart={e => handleTouchStart(e)}
            onTouchMove={e => handleTouchMove(e)}
            onTouchEnd={handleTouchEnd}
            className="itemList"
            style={{ transform: `translateX(${translateX - changeX}px)` }}>
            {sliderItems}
          </div>
        </div>
        {!isMobile && <div className="c-slider-arrows">
          {translateX !== 0
            ? <a className="left-arrow" onClick={() => handleArrowClick(actions.LEFT)}>
              <img src={rightArrow} />
            </a>
            : null}
          {Math.abs(translateX) < contentFullWidth ? <a className="right-arrow" onClick={() => handleArrowClick(actions.RIGHT)}>
            <img src={rightArrow} />
          </a> : null}
        </div>}
      </div>
    </div>
  );
};

Slider.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig('collections', 'query-feed').tag({
      name: 'Content',
    }),
    startIndex: PropTypes.number.tag({
      name: 'Start Index',
      defaultValue: 1,
    }),
    itemLimit: PropTypes.number.tag({
      name: 'Item Limit',
      defaultValue: 1,
    }),
    title: PropTypes.string.tag({
      name: 'Slider Title',
      defaultValue: 'Special Features',
    }),
    displayClass: PropTypes.oneOf(['Slider', 'Slider - Special Features']).tag({
      name: 'Display Class',
      defaultValue: 'Slider',
    }),
  }),
};

export default Slider;
