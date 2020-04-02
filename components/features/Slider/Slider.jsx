/* eslint-disable */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import buildSliderItems from './_helper_functions/buildSliderItems';
import rightArrow from '../../../resources/images/right-arrow.svg';
import './slider.scss';

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
  };

  const contentRef = useRef(null);
  const itemRef = useRef(null);

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
        break;
      case actions.LEFT:
        break;
      default:
        break;
    }
  };

  const calculateTranslateX = (direction) => {
    if (isMobile) return null;
    const contentFullWidth = contentRef.current ? content.current.offsetWidth : null;
    const itemOffsetWidth = itemRef.current ? itemRef.current.offsetWidth : null;


    if (direction === actions.LEFT) {
      // TODO sub logic

    } else if (direction === actions.RIGHT) {
      // TODO finish add logic
      if (translateX <= contentFullWidth) {
        setTranslateX(translateX + itemOffsetWidth);
      }
    }    
  };

  return (
    <div className="c-slider-wrapper">
      <h1 className="slider-title">{title}</h1>
      <div className="c-slider">
        <div ref={contentRef} className="c-slider-content" style={{ transform: `translateX(${translateX}px)` }}>{sliderItems}</div>
        { !isMobile && <div className="c-slider-arrows">
          {translateX !== 0 ? <a className="left-arrow"><img src={rightArrow} /></a> : null}
          <a className="right-arrow" onClick={() => handleArrowClick(actions.RIGHT)}><img src={rightArrow} /></a>
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
