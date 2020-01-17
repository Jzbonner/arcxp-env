import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import {
  DesktopGallery, DesktopCaption, GalleryItem, OverlayMosiac, MobileGallery,
} from '../../_helper_components/global/gallery/index';
import {
  debounce, createBaseGallery, handleImageFocus, reorganizeElements,
} from './_helper_functions/index';
import leftArrow from '../../../resources/icons/gallery/left-arrow.svg';
import middleBox from '../../../resources/icons/gallery/middle-box.svg';
import rightArrow from '../../../resources/icons/gallery/right-arrow.svg';
import './default.scss';

const Gallery = (props) => {
  const { contentElements = [], customFields = {} } = props;
  // holds Gallery items
  const [elementData, setElementData] = useState(null);
  const [mobileElementData, setMobileElementData] = useState(null);
  // holds current caption + credits (specific to the current image)
  const [captionData, setCaptionData] = useState(null);
  // holds current image position
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAction, setCurrentAction] = useState('');
  // holds how far gallery needs to translate in order to center on the current image
  const [translateX, setTranslateX] = useState(0);
  // holds all captions w/ the same index(id) as their image counter parts
  const [baseCaptionData, setBaseCaptionData] = useState(null);

  /* Mobile */
  const [offsetHeight, setHeight] = useState(0);
  const [isCaptionOn, setCaptionState] = useState(true);
  const [isStickyVisible, setStickyState] = useState(false);
  const [isMobile, setMobileState] = useState(false);

  const galleryEl = useRef(null);
  const galleryMobileEl = useRef(null);
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

  /* applies transform: translateX to center on the focused image */
  const calculateTranslateX = () => {
    if (galleryEl.current) {
      const galleryFullWidth = galleryEl.current.offsetWidth;
      const focusElement = document.getElementById(`gallery-item-${currentIndex}`) || null;
      if (galleryEl && focusElement) {
        const translateAmount = parseInt(galleryFullWidth, 10)
          / 2 - parseInt(focusElement.offsetWidth, 10)
          / 2 - parseInt(focusElement.offsetLeft, 10);
        if (translateX !== translateAmount) setTranslateX(translateAmount);
      }
    }
  };

  const changeIndex = (action) => {
    // change current image index by -1
    if (action === actions.PREV) {
      setCurrentAction(action);
      if (currentIndex === 0) {
        setCurrentIndex(maxIndex);
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
    const finalizedElements = handleImageFocus(elements, {
      isStickyVisible, isMobile, isCaptionOn, currentIndex,
    });
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
    if (!isMobile && !galleryMobileEl) calculateTranslateX();
    if (window.innerWidth <= mobileBreakPoint) setMobileState(true);
    if (window.innerWidth > mobileBreakPoint) setMobileState(false);
    setCurrentAction(actions.RESIZE);
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
  }, 12);

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
      if (element.type === 'gallery') {
        relevantData = element;
      }
    });

    return relevantData;
  };

  // only runs if currentIndex has changed
  useEffect(() => {
    if (elementData && !isStickyVisible && currentAction !== '') {
      finalizeGalleryItems();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isMobile) calculateTranslateX();
  }, [currentIndex, translateX, elementData, galleryEl]);

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
  }, []);

  // initializing the gallery w/ either propped or fetched content elements
  if ((contentElements || fetchedGalleryData) && (currentAction === actions.RESIZE || (!elementData && !mobileElementData))) {
    let isWindowMobile = false;
    let relevantGalleryData = null;
    let galleryContentElements = null;
    let fetchedContentElements = null;
    if (window.innerWidth <= mobileBreakPoint) isWindowMobile = true;

    if (contentElements) relevantGalleryData = handlePropContentElements();

    if (!relevantGalleryData && !fetchedGalleryData) return null;

    if (fetchedGalleryData) fetchedContentElements = fetchedGalleryData.content_elements;

    if (relevantGalleryData) galleryContentElements = relevantGalleryData.content_elements;

    const baseGalleryData = fetchedContentElements || galleryContentElements;

    const captionAndGalleryData = createBaseGallery(baseGalleryData, {
      isStickyVisible, isMobile, isCaptionOn, currentIndex,
    });
    const { galleryData = [], desktopCaptionData = [] } = captionAndGalleryData;

    if (!isWindowMobile) {
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

  return (
      <div ref={galleryEl} className={`gallery-wrapper ${isMobile && !isStickyVisible ? 'mobile-display' : ''}`}>
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
          className={`gallery-caption-container ${!isStickyVisible && isMobile ? 'mosiac-gallery' : ''}`}>
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
              <div className="hidden-large">View Gallery</div>
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
  );
};

Gallery.propTypes = {
  contentElements: PropTypes.object,
  customFields: PropTypes.shape({
    galleryUrl: PropTypes.string.tag({
      label: 'Gallery URL',
      description: 'Please enter a valid gallery url to fetch related content.',
    }),
  }),
};

export default Gallery;
