import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import {
  DesktopGallery, DesktopCaption, GalleryItem, OverlayMosiac, MobileGallery,
} from '../../_helper_components/global/gallery/index';
import {
  debounce, createBaseGallery, handleImageFocus, reorganizeElements,
} from './_helper_functions/index';
import ArcAd from '../ads/default';
import PGO1Element from '../../_helper_components/global/ads/pg01/default';
import MPGO1Element from '../../_helper_components/global/ads/mpg01/default';
import leftArrow from '../../../resources/icons/gallery/left-arrow.svg';
import middleBox from '../../../resources/icons/gallery/middle-box.svg';
import rightArrow from '../../../resources/icons/gallery/right-arrow.svg';
import './default.scss';

const PG01 = () => <ArcAd staticSlot={'PG01'} key={'PG01'} />;
const PG02 = () => <ArcAd staticSlot={'PG02'} key={'PG02'} />;
const MPG01 = () => <ArcAd staticSlot={'MPG01'} key={'MPG01'} />;

const Gallery = (props) => {
  const {
    contentElements = [], leafContentElements = [], promoItems = {}, customFields = {}, ads = [], pageType = '',
  } = props;

  // const [PG01, PG02, MPG01] = ads;

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
  // holds true max # of photos ( w/o changing value when adding ads into Element array)
  const [maxIndex, setMaxIndex] = useState(null);

  /* Ads */
  const [clickCount, setClickCount] = useState(0);
  const [isAdVisible, setAdVisibleState] = useState(false);

  /* Mobile */
  const [offsetHeight, setHeight] = useState(0);
  const [isCaptionOn, setCaptionState] = useState(true);
  const [isStickyVisible, setStickyState] = useState(false);
  const [isMobile, setMobileState] = useState('NOT INIT');
  const [mobileAdsIndices, setMobileAdsIndices] = useState([]);
  const [photosScrolled, setPhotosScrolled] = useState(0);
  const [isAdInsertionAble, setAdInsertionAbleState] = useState(true);

  const galleryEl = useRef(null);
  const galleryMobileEl = useRef(null);
  const debugFixEl = useRef(null);
  const PG01Ref = useRef(null);
  const mobileBreakPoint = 1023;

  const actions = {
    PREV: 'PREV',
    NEXT: 'NEXT',
    ON: 'ON',
    OFF: 'OFF',
    RESIZE: 'RESIZE',
    AD_RESET: 'AD_RESET',
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
  // const maxIndex = elementData && elementData.length > 1 ? elementData.length - 1 : mobileElementData && mobileElementData.length - 1;
  const featuredGalleryData = Object.keys(promoItems).length > 0 ? promoItems : null;
  const { headlines = {} } = featuredGalleryData || contentElements || fetchedGalleryData;
  let headline = headlines.basic ? headlines.basic : null;

  if (!maxIndex) {
    if (elementData && elementData.length > 1) {
      setMaxIndex(elementData.length - 1);
    } else if (mobileElementData && mobileElementData.length > 1) {
      setMaxIndex(mobileElementData.length - 1);
    }
  }

  /* applies transform: translateX to center on the focused image */
  const calculateTranslateX = () => {
    if (isMobile) return;
    let translateAmount;
    const focusElement = isAdVisible ? PG01Ref.current : (document.getElementById(`gallery-item-${currentIndex}`) || null);
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

  const handleClickCount = () => {
    if (clickCount === 4) {
      setClickCount(1);
    } else {
      setClickCount(clickCount + 1);
    }
  };

  const handleScrollCount = () => {
    if (photosScrolled === 4) {
      setPhotosScrolled(0);
    } else {
      setPhotosScrolled(photosScrolled + 1);
    }
  };

  const changeIndex = (action, maxNumber) => {
    const currentClickCount = clickCount;

    if (!isMobile) {
      handleClickCount();
    } else {
      handleScrollCount();
    }

    if ((!isAdVisible && (currentClickCount === 0 || currentClickCount % 3 !== 0))
      || (isAdVisible && currentClickCount === 4)) {
      // change current image index by -1
      if (action === actions.PREV) {
        setCurrentAction(action);
        if (!isAdVisible || (currentClickCount % 4) === 0) {
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
      }
      // change current image index by +1
      if (action === actions.NEXT) {
        setCurrentAction(action);
        if (!isAdVisible || ((currentClickCount % 4) === 0)) {
          if (currentIndex === maxIndex) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex(currentIndex + 1);
          }
        }
      }
    } else {
      setCurrentIndex(currentIndex);
    }
  };

  const clickFuncs = {
    prev: () => changeIndex(actions.PREV),
    next: () => changeIndex(actions.NEXT),
  };


  const insertDesktopGalleryAd = () => {
    const elements = [...elementData];
    elementData.forEach((element, i) => {
      if (element.props.data.states.isFocused) elements.splice(i + 1, 0, <PGO1Element refHook={PG01Ref} adSlot={PG01} />);
    });

    return elements;
  };

  const insertMobileGalleryAd = () => {
    const mobileElements = [...mobileElementData];
    let hasAdBeenInserted = false;
    console.log('running');
    mobileElementData.forEach((element) => {
      if (element.props.data && element.props.data.index >= currentIndex && !hasAdBeenInserted && photosScrolled === 3) {
        mobileElements.splice(element.props.data.index + 1, 0, <MPGO1Element adSlot={MPG01} />);
        hasAdBeenInserted = true;
      }
    });
    return mobileElements;
  };

  const removeGalleryAd = () => {
    const elements = [...elementData];

    elementData.forEach((element, i) => {
      if (element.props.adSlot) {
        elements.splice(i, 1);
        // console.log(element.props.adSlot);
      }
    });

    return elements;
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
    setCurrentAction(actions.AD_RESET);
    setCurrentIndex(0);
    setHeight(0);
    setMobileAdsIndices([]);
    setAdInsertionAbleState(true);
    setPhotosScrolled(0);
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
    if (!isAdVisible) {
      const finalizedElements = handleImageFocus((elements), {
        isStickyVisible, isMobile, isCaptionOn, currentIndex, maxIndex,
      }, clickFuncs, ads);

      setElementData(finalizedElements);
      renderCaptionByCurrentIndex();
    }
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

  // keeps tracks of which photos have already been scrolled through to prevent redundent ad insetions (mobile)
  const addIndexToListForAds = (index) => {
    const indexArray = [...mobileAdsIndices];

    if (!mobileAdsIndices.includes(index)) indexArray.push(index);

    return setMobileAdsIndices(indexArray);
  };

  // tracks which photo user is on (scrolling mobile gallery)
  const handleScrollEvent = debounce(() => {
    if (galleryMobileEl.current) {
      const index = currentIndex;
      const galleryScrollTop = galleryMobileEl.current.scrollTop;
      const targetElementoffsetHeight = document.getElementById(`gallery-item-${index}`).offsetHeight;
      const targetHeight = offsetHeight + targetElementoffsetHeight;

      // lazy loading ads
      if (isAdInsertionAble && !mobileAdsIndices.includes(index) && mobileElementData && photosScrolled === 3) {
        // debugger;
        const adInsertedMobileArray = insertMobileGalleryAd();
        setMobileElementData(adInsertedMobileArray);
        setAdInsertionAbleState(false);
      }

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

      addIndexToListForAds(index);
    }

    return null;
  }, 10);

  /* renders updated gallery elements after currentIndex is changed */
  const finalizeGalleryItems = () => {
    if (currentAction === actions.PREV) {
      handlePrevious([...elementData]);
    } else {
      handleNext([...elementData]);
    }
  };

  // maps mobile elements with updated parent states
  const getMobileElements = (arr) => {
    const finalElements = arr.map((element) => {
      if (element.props.adSlot && element.props.adSlot.name && element.props.adSlot.name === 'MPG01') {
        return element;
      }
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
    if (elementData && !isStickyVisible && currentAction !== '') finalizeGalleryItems();
    if (isMobile && isStickyVisible) setAdInsertionAbleState(true);
  }, [currentIndex]);

  useEffect(() => {
    if (!isMobile) calculateTranslateX();
  }, [isAdVisible, currentIndex, currentAction, translateX, elementData, captionData, galleryEl]);

  useEffect(() => {
    if (!isAdVisible && !isMobile) renderCaptionByCurrentIndex();
  }, [baseCaptionData]);

  useEffect(() => {
    if (!isMobile) {
      if (clickCount !== 0 && clickCount % 4 === 0) setAdVisibleState(true);

      if (!isAdVisible && clickCount && clickCount % 4 === 0) {
        const adInsertedElementArray = insertDesktopGalleryAd();
        setElementData(adInsertedElementArray);
        setAdVisibleState(true);
      } else if (isAdVisible && (clickCount % 4) === 1) {
        const adRemovedElementArray = removeGalleryAd();
        setAdVisibleState(false);
        const finalizedElements = handleImageFocus((adRemovedElementArray), {
          isStickyVisible, isMobile, isCaptionOn, currentIndex, maxIndex,
        }, clickFuncs, ads);

        setElementData(finalizedElements);
        renderCaptionByCurrentIndex();
      }
    }
  }, [isAdVisible, clickCount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent, true);

    // returned function will be called when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScrollEvent, true);
    };
  }, [currentIndex, isCaptionOn, isAdInsertionAble]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeEvent, true);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, true);
    };
  }, [isMobile]);

  // initializing the gallery w/ either propped or fetched content elements
  // NOTE: leafContentElements = Gallery-page-only propped contentElements array
  if (isMobile !== 'NOT INIT' && ((contentElements || leafContentElements || fetchedGalleryData || featuredGalleryData)
    && ((currentAction === actions.RESIZE || currentAction === actions.AD_RESET) || (!elementData && !mobileElementData)))) {
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
    } else if (!mobileElementData || currentAction === actions.AD_RESET) {
      const baseElementsForMobile = [...galleryData];
      if (!isMobile) setMobileState(true);
      setMobileElementData(baseElementsForMobile);
      setMobileAdsIndices([]);
      setCurrentAction('');
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

  return (
    <>
      {isMobile && galHeadline ? <div className="gallery-headline">{galHeadline}</div> : null}
      {pageType !== 'Article' ? <div className="gallery-ads-PG02">{PG02 && PG02()}</div> : null}
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
                <img src={leftArrow} />
              </a>
            </div>
            <div className="mobile-change">
              <a>
                <img src={middleBox} className="icon-gallery" />
              </a>
              <div className="icon-text hidden-large">View Gallery</div>
            </div>
            <div className="gallery-count-next hidden-small hidden-medium">
              <a onClick={() => changeIndex(actions.NEXT)}>
                <img src={rightArrow} />
              </a>
            </div>
            <div className="count--box hidden-small hidden-medium">
              <span className="gallery-index">{currentIndex + 1} / </span>
              <span>{maxIndex && maxIndex + 1}</span>
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
  pageType: PropTypes.string,
  customFields: PropTypes.shape({
    galleryUrl: PropTypes.string.tag({
      label: 'Gallery URL',
      description: 'Please enter a valid gallery url to fetch related content.',
    }),
  }),
};

export default Gallery;
