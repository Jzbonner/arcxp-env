import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { useContent } from 'fusion:content';
import { useAppContext, useFusionContext } from 'fusion:context';
import { buildSliderItems, getAmount } from './_helper_functions/index';
import FeatureTitle from '../../_helper_components/home/featureTitle/featureTitle';
import ScrollBar from '../../_helper_components/home/Slider/ScrollBar';
import LeftArrow from '../../../resources/icons/slider/left-arrow.svg';
import RightArrow from '../../../resources/icons/slider/right-arrow.svg';
import './default.scss';

const Slider = (customFields = {}) => {
  const appContext = useAppContext();
  const fusionContext = useFusionContext();
  const { isAdmin } = appContext;
  const { arcSite } = fusionContext;
  const {
    customFields: {
      content: { contentService = 'collections-api', contentConfigValues = { id: '' } } = {}, displayClass = '', title = '', moreURL = '',
    },
  } = customFields;

  let { size: itemLimit } = contentConfigValues || {};
  const startIndex = 0;
  itemLimit = parseInt(itemLimit, 10) || 10;

  const [sliderItems, setSliderItems] = useState(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [idSuffix, setIdSuffix] = useState('');
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollLeft, setMaxScrollLeft] = useState(0);
  const [wasButtonClicked, setButtonClickState] = useState(false);
  const [overflowScroll, setOverflowScroll] = useState(0);

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
  const displayClassesRequiringImg = ['Slider', 'Slider - Special Features'];

  const squareImageSize = 150;
  const useSquareImageAfter = 0;

  const data = useContent({
    source: contentService,
    query: {
      ...contentConfigValues,
      arcSite,
      displayClass,
      displayClassesRequiringImg,
      squareImageSize,
      useSquareImageAfter,
    },
  });

  const addToRefs = (el, refArray) => {
    if (el && !refArray.current.includes(el)) refArray.current.push(el);
  };

  if (data && !sliderItems) setSliderItems(buildSliderItems(data, el => addToRefs(el, elRefs), startIndex, itemLimit));

  const isPad = typeof navigator !== 'undefined' ? navigator.userAgent.match(/iPad|Tablet/i) != null : false;
  const itemOffsetWidth = elRefs.current && elRefs.current[0] ? elRefs.current[0].scrollWidth + marginOffset : 330;

  const calculateScrollLeft = (direction) => {
    if (direction === actions.LEFT) {
      const change = getAmount(maxScrollLeft, itemOffsetWidth, scrollLeft, actions.SUB);
      if (change) {
        setOverflowScroll(scrollLeft - change);
        setButtonClickState(true);
      }
    } else if (direction === actions.RIGHT) {
      const change = getAmount(maxScrollLeft, itemOffsetWidth, scrollLeft, actions.ADD);
      if (change) {
        setOverflowScroll(scrollLeft + change);
        setButtonClickState(true);
      }
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === actions.RIGHT) {
      calculateScrollLeft(actions.RIGHT);
    } else if (direction === actions.LEFT) {
      calculateScrollLeft(actions.LEFT);
    }

    return null;
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

  const handleOverflowScroll = () => {
    if (wasButtonClicked) return null;
    const sliderContent = document.getElementsByClassName(`itemList ${idSuffix}`);
    const sliderContainer = document.getElementsByClassName(`c-slider-content ${idSuffix}`);
    const sliderMaxWidth = window.getComputedStyle(sliderContent[0]).width;
    const parsedMaxWidth = parseInt(sliderMaxWidth, 10);
    const sliderScrollLeft = sliderContainer[0].scrollLeft;

    if (sliderScrollLeft !== scrollLeft) {
      const diff = sliderScrollLeft - scrollLeft;
      setScrollLeft(scrollLeft + diff);
    }

    if (parsedMaxWidth !== contentWidth) {
      setContentWidth(parsedMaxWidth);
    }

    if (!maxScrollLeft) {
      const maxScrollLeftSlider = sliderContainer[0].scrollWidth - sliderContainer[0].clientWidth;
      setMaxScrollLeft(maxScrollLeftSlider);
    }

    return null;
  };

  const handleButtonScrollEffect = () => {
    const contentSliderArr = document.getElementsByClassName(`c-slider-content ${idSuffix}`);

    if (!contentSliderArr || !contentSliderArr[0]) return null;

    contentSliderArr[0].scrollLeft = overflowScroll;
    setButtonClickState(false);

    return null;
  };

  const sliderOutput = () => (<div ref={wrapperRef} className={`c-slider-wrapper
      b-padding-d30-m20 ${getIsSpecial() ? 'is-special-feature' : ''}`}>
    <FeatureTitle title={title} moreURL={moreURL} />
    <div className="c-slider">
      <div className={`c-slider-content ${idSuffix} ${isPad ? 'is-Tablet' : ''}`} onScroll={handleOverflowScroll}>
        <div ref={contentRef} className={`itemList ${idSuffix}`}>
          {sliderItems}
        </div>
      </div>
      <div className="c-slider-nav">
        <a className="c-slider-button" onClick={() => handleArrowClick(actions.LEFT)}>
          <img src={LeftArrow} />
        </a>
        <ScrollBar
          maxScrollLeft={maxScrollLeft}
          currentScrollLeft={scrollLeft}
          sliderId={idSuffix}
          sliderContentElRef={contentRef}
        />
        <a className="c-slider-button is-right" onClick={() => handleArrowClick(actions.RIGHT)}>
          <img src={RightArrow} />
        </a>
      </div>
    </div>
  </div>
  );

  if (isAdmin) {
    return sliderOutput();
  }

  useEffect(() => {
    genId();
  }, []);

  useEffect(() => {
    handleButtonScrollEffect();
  }, [overflowScroll, wasButtonClicked]);

  return (
    <LazyLoad
      placeholder={<div className="c-placeholder-slider" />}
      height="100%"
      width="100%"
      offset={300}
      overflow={true}
      once={true}>
      {sliderOutput()}
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
