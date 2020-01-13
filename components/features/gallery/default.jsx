import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from 'fusion:context';
import {
  DesktopGallery, DesktopCaption, GalleryItem, OverlayMosiac, MobileGallery,
} from '../../_helper_components/global/gallery/index';
import { debounce, createBaseGallery } from './_helper_functions/index';
import leftArrow from '../../../resources/icons/gallery/left-arrow.svg';
import middleBox from '../../../resources/icons/gallery/middle-box.svg';
import rightArrow from '../../../resources/icons/gallery/right-arrow.svg';
import './default.scss';

const Gallery = () => {
  // holds Gallery items
  const [elementData, setElementData] = useState(null);
  const [mobileElementData, setMobileElementData] = useState(null);
  // holds current caption + credits (specific to the current image)
  const [captionData, setCaptionData] = useState(null);
  // holds current image position
  const [currentIndex, setCurrentIndex] = useState(0);
  // holds max number of images
  const [maxIndex, setMaxIndex] = useState(0);
  // holds string which nav arrow was just clicked
  const [currentAction, setCurrentAction] = useState('');
  // holds how far gallery needs to translate in order to center on the current image
  const [translateX, setTranslateX] = useState(0);
  // holds all captions w/ the same index(id) as their image counter parts
  const [baseCaptionData, setBaseCaptionData] = useState(null);

  /* Mobile */
  const [testOffsetHeight, setHeight] = useState(0);
  const [isCaptionOn, setCaptionState] = useState(true);
  const [isStickyVisible, setStickyState] = useState(false);
  const [isMobile, setMobileState] = useState(false);

  const appContext = useAppContext();
  const { globalContent = {} } = appContext;
  const galleryEl = useRef(null);
  const galleryMobileEl = useRef(null);
  const mobileBreakPoint = 1023;

  const actions = {
    PREV: 'PREV',
    NEXT: 'NEXT',
    ON: 'ON',
    OFF: 'OFF',
  };

  let mobileElemData;
  let mobileFuncs = {};
  let mobileState = {};

  /* HELPERS START */

  /* applies transform: translateX to center on the focused image */
  const calculateTranslateX = () => {
    const galleryFullWidth = galleryEl.current.offsetWidth;
    const focusElement = document.getElementById(`gallery-item-${currentIndex}`) || null;
    if (galleryEl && focusElement) {
      const translateAmount = parseInt(galleryFullWidth, 10)
      / 2 - parseInt(focusElement.offsetWidth, 10)
      / 2 - parseInt(focusElement.offsetLeft, 10);

      if (translateX !== translateAmount) setTranslateX(translateAmount);
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

  // organizes element array, where last element is right before the first
  // VISIBLE GALLERY = |semi-last ,last, [first], second, third...|
  const reorganizeElements = (arr) => {
    const elemArray = [...arr];
    const middle = Math.floor(elemArray.length / 2);
    const temp = [];

    for (let i = elemArray.length - 1; i >= 0; i -= 1) {
      if (i > middle) {
        temp.unshift(elemArray[i]);
      }
    }

    for (let i = 0; i < elemArray.length; i += 1) {
      if (i <= middle) {
        temp.push(elemArray[i]);
      }
    }

    return temp;
  };

  // adds focus class to current gallery-item element
  const handleImageFocus = (arr) => {
    const elements = arr;
    const finalElements = elements.map((element) => {
      const elementItemData = { ...element.props.data };
      const parentStates = {
        isStickyVisible,
        isMobile,
        isCaptionOn,
      };

      elementItemData.states = { ...parentStates };

      if (currentIndex === element.props.data.index) {
        elementItemData.states.isFocused = true;
      } else {
        elementItemData.states.isFocused = false;
      }

      return (
        <GalleryItem data={elementItemData} key={`gallery-item-${elementItemData.url}`}/>
      );
    });

    return finalElements;
  };

  const renderCaptionByCurrentIndex = () => {
    if (baseCaptionData && !isMobile) {
      const captionToRender = baseCaptionData.map((element) => {
        if (element.index === currentIndex) {
          const propData = {
            elementData: element,
            isCaptionOn,
          };

          return <DesktopCaption data={propData} />;
        }
        return null;
      });

      setCaptionData(captionToRender);
    }
  };

  const renderDesktopGalleryElements = (elements) => {
    const finalizedElements = handleImageFocus(elements);
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
    if (!isMobile) calculateTranslateX();
    if (window.innerWidth <= mobileBreakPoint) setMobileState(true);
    if (window.innerWidth > mobileBreakPoint) setMobileState(false);
  };

  // tracks which photo user is on (scrolling mobile gallery)
  const handleScrollEvent = debounce(() => {
    if (galleryMobileEl.current) {
      const index = currentIndex;
      const galleryScrollTop = galleryMobileEl.current.scrollTop;
      const targetElementOffsetHeight = document.getElementById(`gallery-item-${index}`).offsetHeight;
      const targetHeight = testOffsetHeight + targetElementOffsetHeight;
      if (testOffsetHeight === 0 && (galleryScrollTop > targetElementOffsetHeight)) {
        setHeight(testOffsetHeight + targetElementOffsetHeight);
        changeIndex(actions.NEXT);
      }

      if (testOffsetHeight > 0) {
        let newHeight;
        const previousTarget = document.getElementById(`gallery-item-${index === 0 ? 0 : index - 1}`).offsetHeight;

        if (currentIndex === maxIndex && galleryScrollTop > targetHeight) {
          return null;
        }

        if ((galleryScrollTop < testOffsetHeight) && index !== 0) {
          newHeight = testOffsetHeight - previousTarget;
          setHeight(newHeight);
          changeIndex(actions.PREV);
        }

        if ((galleryScrollTop > targetHeight)) {
          setHeight(testOffsetHeight + targetElementOffsetHeight);
          changeIndex(actions.NEXT);
        }
      }
    }

    return null;
  }, 15);

  /* renders updated gallery elements after currentIndex is changed */
  const finalizeGalleryItems = () => {
    if (currentAction === actions.PREV) {
      handlePrevious([...elementData]);
    } else {
      handleNext([...elementData]);
    }
  };

  const getMobileElements = () => {
    const finalElements = mobileElementData.map((element) => {
      const elementItemData = { ...element.props.data };
      const parentStates = {
        isStickyVisible,
        isMobile,
        isCaptionOn,
      };
      elementItemData.states = { ...parentStates };
      return (
          <GalleryItem data={elementItemData} key={`gallery-item-${elementItemData.url}`}/>
      );
    });
    return finalElements;
  };

  /* HELPERS END */

  // only runs if currentIndex has changed
  useEffect(() => {
    if (elementData && !isStickyVisible && currentAction !== '') {
      finalizeGalleryItems();
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isMobile) calculateTranslateX();
  }, [currentIndex, translateX, elementData]);

  // runs only once since baseCaptionData will populate only once
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

  // initializing the gallery w/ globalContent ~ runs only once
  if (globalContent && (!elementData && !mobileElementData)) {
    const { content_elements: contentElements } = globalContent;
    let isWindowMobile = false;
    if (window.innerWidth <= 1023) isWindowMobile = true;

    const captionAndGalleryData = createBaseGallery(contentElements, {
      isStickyVisible, isMobile, isCaptionOn, currentIndex,
    });

    const { galleryData, desktopCaptionData } = captionAndGalleryData;
    if (maxIndex === 0) setMaxIndex(contentElements.length - 1);

    if (!isWindowMobile) {
      if (!elementData) {
        const finalizedGalleryItems = reorganizeElements([...galleryData]);
        setElementData(finalizedGalleryItems);
      }

      if (!baseCaptionData) setBaseCaptionData(desktopCaptionData);
    } else {
      if (!mobileElementData) {
        const baseElementsForMobile = [...galleryData];
        setMobileState(true);
        setMobileElementData(baseElementsForMobile);
      }

      return null;
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

    mobileElemData = getMobileElements();
  }

  return (
    <div id="GALLERY" ref={galleryEl} className={`gallery-wrapper ${isMobile && !isStickyVisible ? 'mobile-display' : ''}`}>
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

export default Gallery;
