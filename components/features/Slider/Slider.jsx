/* eslint-disable */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import buildSliderItems from './_helper_functions/buildSliderItems';
import getAmount from './_helper_functions/getAmount';
import rightArrow from '../../../resources/images/right-arrow.svg';
import './Slider.scss';

const Slider = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '', startIndex: '' } } = {},
      itemLimit = 100,
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextItemCoordsX, setNextItemCoordsX] = useState(0);
  const [previousItemCoordsX, setPreviousItemCoordsX] = useState(0);
  const [isTouched, setTouchState] = useState(null);
  const [timeOfLastDrag, setTimeOfLastDrag] = useState(0);
  const [velocity, setVelocity] = useState(0);
  // rate of change between start and end touchpoint
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


  // console.log('config', contentConfigValues);

  const data = useContent({
    source: contentService,
    query: contentConfigValues
  });
  // if (!elRefs.current) elRefs.current = [];
  if (data && !sliderItems) setSliderItems(buildSliderItems(data, (el) => addToRefs(el, elRefs)));

  const itemOffsetWidth = elRefs.current && elRefs.current[0] ? elRefs.current[0].scrollWidth + marginOffset : null;
  const currItemMidPoint = elRefs.current && elRefs.current[currentIndex] ? elRefs.current[currentIndex].offsetLeft + (elRefs.current[currentIndex].offsetLeft / 2) : null;
  const wrapperClientWidth = wrapperRef.current ? wrapperRef.current.clientWidth : null;
  const contentFullWidth = contentRef.current && sliderItems ? (contentRef.current.offsetWidth - wrapperClientWidth) + (marginOffset * 2) : null;
  const contentOffestLeft = contentRef.current && sliderItems ? contentRef.current.offsetLeft : null;


  const handleArrowClick = (direction) => {
    switch (direction) {
      case actions.RIGHT:
        calculateTranslateX(actions.RIGHT);
        // debugger;
        break;
      case actions.LEFT:
        calculateTranslateX(actions.LEFT);
        break;
      default:
        break;
    }
  };

  const calculateTranslateX = (direction) => {
    // if (isMobile) return null;
    // debugger;
    if (direction === actions.LEFT) {
      const change = getAmount(contentFullWidth, itemOffsetWidth, translateX, actions.SUB);
      if (change) setTranslateX(translateX + change);
    } else if (direction === actions.RIGHT) {
      const change = getAmount(contentFullWidth, itemOffsetWidth, translateX, actions.ADD);
      console.log('change after calc', change);
      if (change) setTranslateX(translateX - change);
    }

    // debugger;
  };

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) refArray.current.push(el);
  }

  const getInitWindowSize = () => {
    if (window.innerWidth <= mobileBreakPoint) {
      setMobileState(true);
    } else {
      setMobileState(false);
    }
  };

  // mobile slider touch funcs

  const handleStart = (clientX) => {
    setVelocity(0);
    setTimeOfLastDrag(Date.now());
    setStartX(clientX);
    setTouchState(true);
  }

  const handleMove = (clientX) => {
    if (isTouched) {
      console.log(clientX);
      const currentTime = Date.now();
      const elapsed = currentTime - timeOfLastDrag;
      const deltaX = startX - clientX;

      setChangeValue(deltaX);

    }
  }

  const handleEnd = () => {
    // slide content left
    if (changeX < 0) {
      calculateTranslateX(actions.LEFT)
      // setTranslateX(translateX + Math.abs(changeX));
      // slide content right
    } else if (changeX > 0) {
      calculateTranslateX(actions.RIGHT);
      // setTranslateX(translateX - changeX);
    }
    setChangeValue(0);
    setVelocity(0);
    setStartX(0);
    setChangeValue(0);
    setTouchState(false);
  }

  const handleTouchStart = (event) => {
    console.log('touching', event.targetTouches[0].clientX);
    handleStart(event.targetTouches[0].clientX);
  }

  const handleTouchMove = (event) => {
    console.log('moving', event.targetTouches[0]);

    handleMove(event.targetTouches[0].clientX);
    // handleMove(event.targetTouches[0].clientX)
  }


  const handleTouchEnd = (event) => {
    console.log('ending');
    handleEnd();
  }

  useEffect(() => {
    getInitWindowSize();
  }, []);

  /*   const preventDefault = e => {
      e.preventDefault();
      console.log('touching', e);
      
    }
   */

  /*   useEffect(() => {
      if(isMobile) {
        window.addEventListener('touchmove', preventDefault, { passive: false });
        return () => {
          window.removeEventListener('touchmove', preventDefault);
        };
      }
    }, [isMobile]); */

  console.log('refs', elRefs);

  return (
    <div ref={wrapperRef} className={`c-slider-wrapper ${displayClass.toLowerCase().includes('special feature') ? 'is-special-feature' : ''}`}>
      <h1 className="slider-title">{title}</h1>
      <div className="c-slider">
        <div id="slider" className="c-slider-content" >
          <div ref={contentRef}
            onTouchStart={e => handleTouchStart(e)}
            onTouchMove={e => handleTouchMove(e)}
            onTouchEnd={e => handleTouchEnd(e)}
            className="itemList"
            style={{ left: `${-changeX}px`, transform: `translateX(${translateX}px)` }}>
            {sliderItems}
          </div>
        </div>
        {!isMobile && <div className="c-slider-arrows">
          {translateX !== 0 ?
            <a className="left-arrow" onClick={() => handleArrowClick(actions.LEFT)}>
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
