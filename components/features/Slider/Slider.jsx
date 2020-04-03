/* eslint-disable */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import buildSliderItems from './_helper_functions/buildSliderItems';
import getAmount from './_helper_functions/getAmount';
import rightArrow from '../../../resources/images/right-arrow.svg';
import './slider.scss';
import { debug } from 'webpack';

const Slider = (customFields = {}) => {
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      startIndex = 1,
      itemLimit = 100,
      displayClass = '',
      title = '',
    },
  } = customFields;

  const [sliderItems, setSliderItems] = useState(null);
  const [isMobile, setMobileState] = useState(false);
  const [translateX, setTranslateX] = useState(0);

  const actions = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    ADD: 'ADD',
    SUB: 'SUB',
  };

  const contentRef = useRef(null);
  const itemRef = useRef(null);
  const marginOffset = 30;

  const data = useContent({
    source: contentService,
    query: contentConfigValues,
  });

  console.log(data);

  if (data && !sliderItems) setSliderItems(buildSliderItems(data, itemRef));

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

    //
    const itemOffsetWidth = itemRef.current ? itemRef.current.scrollWidth + marginOffset : null;
    // account for margins and last items so slider doesn't over transform and leave whitespace
    const contentFullWidth = contentRef.current ? contentRef.current.offsetWidth - (marginOffset * sliderItems.length) - (itemOffsetWidth / 1.2) : null;

    console.log('contentRef', contentRef);
    console.log('itemRef', itemRef);


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

  console.log(translateX);

  return (
    <div className="c-slider-wrapper">
      <h1 className="slider-title">{title}</h1>
      <div className="c-slider">
        <div id="slider" className="c-slider-content" >
          <div ref={contentRef} className="itemList" style={{ transform: `translateX(${translateX}px)` }}>{sliderItems}</div>
        </div>
        { !isMobile && <div className="c-slider-arrows">
          {translateX !== 0 ? 
            <a className="left-arrow" onClick={() => handleArrowClick(actions.LEFT)}>
              <img src={rightArrow} />
            </a> 
          : null}
          <a className="right-arrow" onClick={() => handleArrowClick(actions.RIGHT)}>
            <img src={rightArrow} />
          </a>
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
