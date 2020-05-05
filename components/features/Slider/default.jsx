import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { buildSliderItems, getAmount } from './_helper_functions/index';
import rightArrow from '../../../resources/images/right-arrow.svg';
import './default.scss';

const Slider = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {},
      itemLimit = 100,
      displayClass = '',
      startIndex = 1,
      title = '',
    },
  } = customFields;

  const [sliderItems, setSliderItems] = useState(null);
  const [isDesktop, setDesktopState] = useState(true);
  const [translateX, setTranslateX] = useState(0);

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
  const tabletBreakPoint = 1023;

  contentConfigValues.from = startIndex > 1 ? startIndex : null;
  contentConfigValues.size = itemLimit > 3 || null;

  const displayClassesRequiringImg = ['Slider', 'Slider - Special Features'];

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
    },
  });

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) refArray.current.push(el);
  };

  if (data && !sliderItems) setSliderItems(buildSliderItems(data, el => addToRefs(el, elRefs)));

  const isPad = navigator.userAgent.match(/iPad|Tablet/i) != null;
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
    if (window.innerWidth <= tabletBreakPoint) {
      setDesktopState(false);
    } else {
      setDesktopState(true);
    }
  };

  const getIsSpecial = () => {
    if (displayClass.toLowerCase().includes('special feature')) return true;

    return null;
  };

  useEffect(() => {
    getInitWindowSize();
  }, []);

  return (
    <div className={`c-slider-master ${getIsSpecial() ? 'is-special-feature' : ''}`}>
      <div ref={wrapperRef} className="c-slider-wrapper">
        <h1 className="slider-title">{title}</h1>
        <div className="c-slider">
          <div className={`c-slider-content ${isPad ? 'is-Tablet' : ''}`} >
            <div ref={contentRef}
              className="itemList"
              style={{ transform: `translateX(${translateX}px)` }}>
              {sliderItems}
            </div>
          </div>
          {isDesktop && !isPad && <>
            {translateX !== 0
              ? <a className="left-arrow" onClick={() => handleArrowClick(actions.LEFT)}>
                <img src={rightArrow} />
              </a>
              : null}
            {Math.abs(translateX) < contentFullWidth ? <a className="right-arrow" onClick={() => handleArrowClick(actions.RIGHT)}>
              <img src={rightArrow} />
            </a> : null}
          </>
          }
        </div>
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
