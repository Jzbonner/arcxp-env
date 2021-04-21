import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { useContent } from 'fusion:content';
import { useFusionContext } from 'fusion:context';
import { buildSliderItems, getAmount } from './_helper_functions/index';
import rightArrow from '../../../resources/images/right-arrow.svg';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import ScrollBar from '../../_helper_components/home/Slider/ScrollBar';
import './default.scss';

const Slider = (customFields = {}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, displayClass = '', title = '', moreURL = '',
    },
  } = customFields;

  let { from: startIndex, size: itemLimit } = contentConfigValues || {};
  startIndex = parseInt(startIndex, 10) - 1 > -1 ? parseInt(startIndex, 10) - 1 : 0;
  itemLimit = parseInt(itemLimit, 10) || 10;

  const [sliderItems, setSliderItems] = useState(null);
  const [viewportState, setViewportState] = useState('');
  const [translateX, setTranslateX] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [idSuffix, setIdSuffix] = useState('');
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);

  const actions = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    ADD: 'ADD',
    SUB: 'SUB',
  };

  const states = {
    DESKTOP: 'DESKTOP',
    TABLET: 'TABLET',
    MOBILE: 'MOBILE',
  };

  const wrapperRef = useRef(null);
  const contentRef = useRef(null);
  const elRefs = useRef([]);

  const marginOffset = 15;
  const tabletBreakPoint = 1023;
  const mobileBreakpoint = 768;

  const displayClassesRequiringImg = ['Slider', 'Slider - Special Features'];

  const windowExists = typeof window !== 'undefined';

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

  if (data && !sliderItems) setSliderItems(buildSliderItems(data, el => addToRefs(el, elRefs), startIndex, itemLimit, viewportState));

  const isPad = typeof navigator !== 'undefined' ? navigator.userAgent.match(/iPad|Tablet/i) != null : false;
  const itemOffsetWidth = elRefs.current && elRefs.current[0] ? elRefs.current[0].scrollWidth + marginOffset : null;
  const wrapperClientWidth = wrapperRef.current ? wrapperRef.current.clientWidth : null;
  const contentFullWidth = contentRef.current && sliderItems
    ? contentRef.current.offsetWidth - wrapperClientWidth + marginOffset * 2 : null;

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
    console.log('running');
    if (window.innerWidth > tabletBreakPoint) {
      setViewportState(states.DESKTOP);
      console.log('is desktop');
    }
    if (window.innerWidth <= tabletBreakPoint) {
      setViewportState(states.TABLET);
    }
    if (window.innerWidth <= mobileBreakpoint) {
      setViewportState(states.MOBILE);
    }
  };

  const getIsSpecial = () => {
    if (displayClass.toLowerCase().includes('special feature')) return true;

    return null;
  };

  const genId = () => {
    if (!idSuffix) {
      const rng = Math.floor(Math.random() * 9999999);
      setIdSuffix(rng);
    }

    return null;
  };

  useEffect(() => {
    getInitWindowSize();
    genId();
  }, []);

  const handleOverflowScroll = () => {
    // console.log('scrolling');
    const sliderContent = document.querySelector('.itemList');
    const sliderContainer = document.querySelector('.c-slider-content');

    const sliderMaxWidth = window.getComputedStyle(sliderContent).width;
    const sliderScrollLeft = sliderContainer.scrollLeft;

    if (sliderScrollLeft !== scrollLeft) {
      setScrollLeft(sliderScrollLeft);
    }

    if (sliderMaxWidth !== contentWidth) {
      setContentWidth(sliderMaxWidth);
    }

    if (!maxScrollLeft) {
      const maxScrollLeftSlider = sliderContainer.scrollWidth - sliderContainer.clientWidth;
      console.log('maxScrollLeftSlider', maxScrollLeftSlider);
      setMaxScrollLeft(maxScrollLeftSlider);
    }
  };

  return (
    <LazyLoad
      placeholder={<div className="c-placeholder-slider" />}
      height="100%"
      width="100%"
      offset={300}
      overflow={true}
      once={true}>
      <div ref={wrapperRef} className={`c-slider-wrapper
      b-padding-d30-m20 ${getIsSpecial() ? 'is-special-feature' : ''}`}>
        <FeatureTitle title={title} moreURL={moreURL} />
        <div className="c-slider">
          <div className={`c-slider-content ${isPad ? 'is-Tablet' : ''}`} onScroll={handleOverflowScroll}>
            <div ref={contentRef} className="itemList" style={{ transform: `translateX(${translateX}px)` }}>
              {sliderItems}
            </div>
          </div>
          <ScrollBar
            maxWidth={contentWidth}
            maxScrollLeft={maxScrollLeft}
            currentScrollLeft={scrollLeft}
            sliderId={idSuffix}
          />
          {viewportState === states.DESKTOP && !isPad && (
            <>
              {translateX !== 0 ? (
                <a className="left-arrow" onClick={() => handleArrowClick(actions.LEFT)}>
                  <img src={rightArrow} />
                </a>
              ) : null}
              {Math.abs(translateX) < contentFullWidth ? (
                <a className="right-arrow" onClick={() => handleArrowClick(actions.RIGHT)}>
                  <img src={rightArrow} />
                </a>
              ) : null}
            </>
          )}
        </div>
      </div>
    </LazyLoad>
  );
};

Slider.propTypes = {
  customFields: PropTypes.shape({
    content: PropTypes.contentConfig(['collections', 'query-feed']).tag({
      name: 'Content',
    }),
    title: PropTypes.string.tag({
      name: 'Slider Title',
    }),
    moreURL: PropTypes.string.tag({
      name: 'More URL',
    }),
    displayClass: PropTypes.oneOf(['Slider', 'Slider - Special Features']).tag({
      name: 'Display Class',
      defaultValue: 'Slider',
    }),
  }),
};

export default Slider;
