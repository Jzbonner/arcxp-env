import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import {
  DesktopGallery, DesktopCaption, GalleryItem, OverlayMosiac, MobileGallery,
} from '../../_helper_components/global/gallery/index';
import {
  debounce, createBaseGallery, handleImageFocus, reorganizeElements, insertGalleryAd,
} from './_helper_functions/index';
import leftArrow from '../../../resources/icons/gallery/left-arrow.svg';
import middleBox from '../../../resources/icons/gallery/middle-box.svg';
import rightArrow from '../../../resources/icons/gallery/right-arrow.svg';
import './default.scss';


const Gallery = (props) => {
  const {
    contentElements = [], leafContentElements = [], promoItems = {}, customFields = {}, ads = [],
  } = props;

  const [PG01 = {}] = ads;
  // , PG02 = {}, MPG01 = {}
  // console.log('propped ads', PG02());


  // holds Gallery items
  const [elementData, setElementData] = useState(null);
  const [mobileElementData, setMobileElementData] = useState(null);
  // holds current caption + credits (specific to the current image)
  const [captionData, setCaptionData] = useState(null);
  // holds current image position
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  // holds how far gallery needs to translate in order to center on the current image
  const [translateX, setTranslateX] = useState(null);
  // holds all captions w/ the same index(id) as their image counter parts
  const [baseCaptionData, setBaseCaptionData] = useState(null);
  // only used if 'raw' contentElements are proped down from article
  const [galHeadline, setHeadline] = useState(null);

  /* Ads */
  const [clickCount, setClickCount] = useState(0);
  // const [scrollCount, setScrollCount] = useState(0);

  /* Mobile */
  const [offsetHeight, setHeight] = useState(0);
  const [isCaptionOn, setCaptionState] = useState(true);
  const [isStickyVisible, setStickyState] = useState(false);
  const [isMobile, setMobileState] = useState('NOT INIT');

  const galleryEl = useRef(null);
  const galleryMobileEl = useRef(null);
  const debugFixEl = useRef(null);
  const mobileBreakPoint = 1023;

  const actions = {
    PREV: 'PREV',
    NEXT: 'NEXT',
    ON: 'ON',
    OFF: 'OFF',
    RESIZE: 'RESIZE',
  };

  let mobileElemData;
  let mobileFuncs = {};
  let mobileState = {};

  // if standalone feature, fetches a specific gallery
  const { galleryUrl } = customFields;

  const fetchedGalleryData = useContent({
    source: 'content-api',
    query: {
      path: galleryUrl,
    },
  });
  const maxIndex = elementData && elementData.length > 1 ? elementData.length - 1 : mobileElementData && mobileElementData.length - 1;
  const featuredGalleryData = Object.keys(promoItems).length > 0 ? promoItems : null;
  const { headlines = {} } = featuredGalleryData || contentElements || fetchedGalleryData;
  let headline = headlines.basic ? headlines.basic : null;

  /* applies transform: translateX to center on the focused image */
  const calculateTranslateX = () => {
    if (isMobile) return;
    let translateAmount;
    const focusElement = document.getElementById(`gallery-item-${currentIndex}`) || null;
    const galleryFullWidth = galleryEl.current ? galleryEl.current.offsetWidth : null;
    if (galleryEl.current && focusElement) {
      // fixes initializing translate bug...?
      if (debugFixEl.current && focusElement.offsetWidth === 0) {
        translateAmount = parseInt(galleryFullWidth, 10)
          / 2 - parseInt(debugFixEl.current.offsetWidth, 10)
          / 2 - parseInt(debugFixEl.current.offsetLeft, 10);
        if (translateX !== translateAmount) setTranslateX(translateAmount);
      } else {
        translateAmount = parseInt(galleryFullWidth, 10)
          / 2 - parseInt(focusElement.offsetWidth, 10)
          / 2 - parseInt(focusElement.offsetLeft, 10);
        if (translateX !== translateAmount) setTranslateX(translateAmount);
      }
    }
  };

  const changeIndex = (action, maxNumber) => {
    // change current image index by -1
    if (action === actions.PREV) {
      setCurrentAction(action);
      if (currentIndex <= 0) {
        if (!maxIndex) {
          setCurrentIndex(maxNumber);
        } else {
          setCurrentIndex(maxIndex);
        }
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
    // change current image index by +1
    if (action === actions.NEXT) {
      setCurrentAction(action);
      if (currentIndex === maxIndex) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const clickFuncs = {
    prev: () => changeIndex(actions.PREV),
    next: () => changeIndex(actions.NEXT),
  };

  // opens mobile sticky
  const handleStickyOpen = () => {
    if (isMobile) setStickyState(true);
  };

  // on & off buttons for mobile caption
  const handleCaptionToggle = (action) => {
    if (action === actions.ON) {
      setCaptionState(false);
    } else {
      setCaptionState(true);
    }
  };

  // close mobile sticky
  const handleStickyClose = () => {
    setStickyState(false);
  };

  const renderCaptionByCurrentIndex = () => {
    if (baseCaptionData && !isMobile) {
      const captionToRender = baseCaptionData.map((element) => {
        if (element.index === currentIndex) {
          const propData = {
            elementData: element,
            isCaptionOn,
          };
          return <DesktopCaption key={element.index} data={propData} />;
        }
        return null;
      });
      setCaptionData(captionToRender);
    }
  };

  const renderDesktopGalleryElements = (elements) => {
    let adInsertedElems = null;

    if (clickCount && clickCount % 4 === 0) {
      // run ad insertions
      adInsertedElems = insertGalleryAd(elements, PG01);
      console.log('condition met');
    }
    // testing

    // console.log('inserted', insertGalleryAd([...elements], PG01));
    const finalizedElements = handleImageFocus((adInsertedElems || elements), {
      isStickyVisible, isMobile, isCaptionOn, currentIndex, maxIndex,
    }, clickFuncs, ads);

    setElementData(finalizedElements);
    renderCaptionByCurrentIndex();
  };

  const handleNext = (arr) => {
    arr.push(arr.shift());
    renderDesktopGalleryElements(arr);
  };

  const handlePrevious = (arr) => {
    arr.unshift(arr.pop());
    renderDesktopGalleryElements(arr);
  };

  const handleResizeEvent = () => {
    calculateTranslateX();
    if (window.innerWidth <= mobileBreakPoint) {
      setMobileState(true);
    } else {
      setMobileState(false);
    }

    setCurrentAction(actions.RESIZE);
  };

  const getInitWindowSize = () => {
    if (window.innerWidth <= mobileBreakPoint) {
      setMobileState(true);
    } else {
      setMobileState(false);
    }
  };

  // tracks which photo user is on (scrolling mobile gallery)
  const handleScrollEvent = debounce(() => {
    if (galleryMobileEl.current) {
      const index = currentIndex;
      const galleryScrollTop = galleryMobileEl.current.scrollTop;
      const targetElementoffsetHeight = document.getElementById(`gallery-item-${index}`).offsetHeight;
      const targetHeight = offsetHeight + targetElementoffsetHeight;
      if (offsetHeight === 0 && (galleryScrollTop > targetElementoffsetHeight)) {
        setHeight(offsetHeight + targetElementoffsetHeight);
        changeIndex(actions.NEXT);
      }

      if (offsetHeight > 0) {
        let newHeight;
        const previousTarget = document.getElementById(`gallery-item-${index === 0 ? 0 : index - 1}`).offsetHeight;

        if (currentIndex === maxIndex && galleryScrollTop > targetHeight) {
          return null;
        }

        if ((galleryScrollTop < offsetHeight) && index !== 0) {
          newHeight = offsetHeight - previousTarget;
          setHeight(newHeight);
          changeIndex(actions.PREV);
        }

        if ((galleryScrollTop > targetHeight)) {
          setHeight(offsetHeight + targetElementoffsetHeight);
          changeIndex(actions.NEXT);
        }
      }
    }

    return null;
  }, 10);

  /* renders updated gallery elements after currentIndex is changed */
  const finalizeGalleryItems = () => {
    setClickCount(clickCount + 1);
    if (currentAction === actions.PREV) {
      handlePrevious([...elementData]);
    } else {
      handleNext([...elementData]);
    }
  };

  // maps mobile elements with updated parent states
  const getMobileElements = (arr) => {
    const finalElements = arr.map((element) => {
      const elementItemData = { ...element.props.data };
      const parentStates = {
        isStickyVisible,
        isMobile,
        isCaptionOn,
      };
      elementItemData.states = { ...parentStates };
      return (
        <GalleryItem data={elementItemData} key={`gallery-item-${elementItemData.url}`} />
      );
    });
    return finalElements;
  };

  // finds the gallery obj within the contentElements prop
  const handlePropContentElements = () => {
    let relevantData = null;
    contentElements.forEach((element) => {
      if (element.type === 'gallery') relevantData = element;
    });
    return relevantData;
  };

  useEffect(() => {
    getInitWindowSize();
  }, []);

  useEffect(() => {
    if (elementData && !isStickyVisible && currentAction !== '') {
      finalizeGalleryItems();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isMobile) calculateTranslateX();
  }, [currentIndex, currentAction, translateX, elementData, captionData, galleryEl]);

  useEffect(() => {
    if (!isMobile) renderCaptionByCurrentIndex();
  }, [baseCaptionData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent, true);

    // returned function will be called when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScrollEvent, true);
    };
  }, [currentIndex, isCaptionOn]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeEvent, true);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, true);
    };
  }, [isMobile]);

  // initializing the gallery w/ either propped or fetched content elements
  // NOTE: leafContentElements = Gallery-page-only propped contentElements array
  if (isMobile !== 'NOT INIT' && ((contentElements || leafContentElements || fetchedGalleryData || featuredGalleryData)
    && (currentAction === actions.RESIZE || (!elementData && !mobileElementData)))) {
    let relevantGalleryData = null;
    let galleryContentElements = null;
    let fetchedContentElements = null;
    let featuredContentElements = null;

    if (contentElements.length > 0 && !leafContentElements.length > 0) relevantGalleryData = handlePropContentElements();

    // checks if other gallery sources exists, else do not render
    if (leafContentElements.length > 0) {
      galleryContentElements = leafContentElements;
    } else if (featuredGalleryData) {
      featuredContentElements = featuredGalleryData.content_elements;
    } else if (fetchedGalleryData) {
      fetchedContentElements = fetchedGalleryData.content_elements;
    } else if (!relevantGalleryData) {
      return null;
    }

    if (relevantGalleryData && !galleryContentElements) galleryContentElements = relevantGalleryData.content_elements;

    if (relevantGalleryData && !headline && !galHeadline) {
      headline = relevantGalleryData.headlines && relevantGalleryData.headlines.basic
        ? setHeadline(relevantGalleryData.headlines.basic) : null;
    }

    const baseGalleryData = fetchedContentElements || featuredContentElements || galleryContentElements;
    const captionAndGalleryData = createBaseGallery(baseGalleryData, {
      isStickyVisible, isMobile, isCaptionOn, currentIndex,
    }, debugFixEl, isMobile, {
      prev: () => changeIndex(actions.PREV, baseGalleryData.length - 1),
      next: () => changeIndex(actions.NEXT),
    });
    const { galleryData = [], desktopCaptionData = [] } = captionAndGalleryData;

    if (!isMobile) {
      if (!elementData) {
        const finalizedGalleryItems = reorganizeElements([...galleryData]);
        setElementData(finalizedGalleryItems);
      }

      if (!baseCaptionData) setBaseCaptionData(desktopCaptionData);
    } else if (!mobileElementData) {
      const baseElementsForMobile = [...galleryData];
      setMobileState(true);
      setMobileElementData(baseElementsForMobile);
    }
  }

  if (isStickyVisible || isMobile) {
    mobileFuncs = {
      handleStickyClose,
      captionOn: () => handleCaptionToggle(actions.ON),
      captionOff: () => handleCaptionToggle(actions.OFF),
    };

    mobileState = {
      isStickyVisible,
      isCaptionOn,
      currentIndex,
      maxIndex,
    };

    if (mobileElementData) {
      mobileElemData = getMobileElements([...mobileElementData]);
    }
  }

  // init translate bug fix ~ run only once
  if (elementData && !isMobile && galleryEl && debugFixEl && currentAction === '') {
    calculateTranslateX();
  }

  console.log('click count', clickCount);

  return (
    <>
    {isMobile && galHeadline ? <div className="gallery-headline">{galHeadline}</div> : null}
    <div ref={galleryEl} className={`gallery-wrapper ${isMobile && !isStickyVisible ? 'mobile-display' : ''}`}>
      {!isMobile && galHeadline ? <div className="gallery-headline">{galHeadline}</div> : null}
      {
        isStickyVisible
          ? <MobileGallery
            objectRef={galleryMobileEl}
            data={mobileElemData}
            states={mobileState}
            funcs={mobileFuncs}
          />
          : null
      }
      {
        !isMobile
          ? <DesktopGallery data={elementData} translateX={translateX} />
          : null
      }
      <div
        onClick={handleStickyOpen}
        className={`gallery-caption-icons-box ${!isStickyVisible && isMobile ? 'mosaic-gallery' : ''}`}>
        <div className="gallery-overlay hidden-large">
          {
            isMobile ? <OverlayMosiac data={mobileElemData} /> : null
          }
        </div>
        <div className="gallery-count view-gallery">
          <div className="gallery-count-prev hidden-small hidden-medium">
            <a onClick={() => changeIndex(actions.PREV)}>
              <img src={leftArrow}></img>
            </a>
          </div>
          <div className="mobile-change">
            <a>
              <img src={middleBox} className="icon-gallery"></img>
            </a>
            <div className="icon-text hidden-large">View Gallery</div>
          </div>
          <div className="gallery-count-next hidden-small hidden-medium">
            <a onClick={() => changeIndex(actions.NEXT)}>
              <img src={rightArrow}></img>
            </a>
          </div>
          <div className="count--box hidden-small hidden-medium">
            <span className="gallery-index">{currentIndex + 1} / </span>
            <span>{maxIndex + 1}</span>
          </div>
        </div>
      </div>
      {captionData}
    </div>
    </>
  );
};

Gallery.propTypes = {
  contentElements: PropTypes.array,
  leafContentElements: PropTypes.array,
  promoItems: PropTypes.object,
  ads: PropTypes.array,
  customFields: PropTypes.shape({
    galleryUrl: PropTypes.string.tag({
      label: 'Gallery URL',
      description: 'Please enter a valid gallery url to fetch related content.',
    }),
  }),
};

export default Gallery;
