import React, { useState, useEffect } from 'react';
import { useAppContext } from 'fusion:context';
import leftArrow from '../../../resources/icons/gallery/left-arrow.svg';
import middleBox from '../../../resources/icons/gallery/middle-box.svg';
import rightArrow from '../../../resources/icons/gallery/right-arrow.svg';
import GalleryItem from '../../_helper_components/global/gallery/galleryItem.jsx';
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
  // holds string desc. which nav arrow was clicked
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
  let mobileElemData;

  /* HELPERS START */

  /* applies transform: translateX to center on the focused image */
  const calculateTranslateX = () => {
    const focusElement = document.getElementById(`gallery-item-${currentIndex}`) || null;
    const galleryWidth = document.getElementById('GALLERY') ? document.getElementById('GALLERY').offsetWidth : null;
    if (galleryWidth && focusElement) {
      const translateAmount = parseInt(galleryWidth, 10)
      / 2 - parseInt(focusElement.offsetWidth, 10)
      / 2 - parseInt(focusElement.offsetLeft, 10);

      if (translateX !== translateAmount) {
        setTranslateX(translateAmount);
      }
    }
  };

  const changeIndex = (action) => {
    // change current image index by -1
    if (action === 'PREV') {
      setCurrentAction(action);
      if (currentIndex === 0) {
        setCurrentIndex(maxIndex);
      } else {
        setCurrentIndex(currentIndex - 1);
      }
    }
    // change current image index by +1
    if (action === 'NEXT') {
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
    if (isMobile) {
      setStickyState(true);
    }
  };

  // on & off buttons for mobile caption
  const handleCaptionToggle = (action) => {
    if (action === 'ON') {
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
    const middle = Math.floor(arr.length / 2);
    const temp = [];

    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (i > middle) {
        temp.unshift(arr[i]);
        arr.pop();
      }
    }

    for (let i = 0; i < arr.length; i += 1) {
      if (i <= middle) {
        temp.push(arr[i]);
      }
    }

    return temp;
  };

  const handleNext = (arr) => {
    arr.push(arr.shift());
    return arr;
  };

  const handlePrevious = (arr) => {
    arr.unshift(arr.pop());
    return arr;
  };

  // adds focus class to current gallery-item element
  const handleImageFocus = (arr) => {
    const elements = arr;
    let isFocused = false;

    const finalElements = elements.map((element) => {
      if (currentIndex === element.props.index) {
        isFocused = true;
      } else {
        isFocused = false;
      }

      return (
        <GalleryItem
          url={element.props.url}
          key={`gallery-item-${element.props.url}`}
          id={element.props.id}
          alt={element.props.alt}
          width={element.props.width}
          index={element.props.index}
          focus={isFocused}
          isStickyVisible={isStickyVisible}
          isMobile={isMobile}
          isCaptionOn={isCaptionOn}
          captionObj={element.props.captionObj}
        />
      );
    });

    return finalElements;
  };

  const renderCaptionByCurrentIndex = () => {
    const captionToRender = baseCaptionData.map((element) => {
      if (element.index === currentIndex) {
        return (
          <div className="gallery-caption-container hidden-small hidden-medium">
            <div className="gallery-credit hidden-small hidden-medium">
              {element.credit && element.credit[0] ? `Photo: ${element.credit[0].name}` : ''}
            </div>
            {isCaptionOn
              ? <div className="gallery-caption hidden-small hidden-medium">
                {element.caption && <span>{element.caption}</span>}
              </div>
              : null
            }
          </div>
        );
      }
      return null;
    });

    setCaptionData(captionToRender);
  };

  const handleResizeEvent = () => {
    calculateTranslateX();

    if (window.innerWidth <= 1023) {
      setMobileState(true);
    }
    if (window.innerWidth > 1023) {
      setMobileState(false);
    }
  };

  // tracks which photo user is on (scrolling mobile gallery)
  const handleScrollEvent = () => {
    const elementParent = document.getElementById('MOBILE_GALLERY') ? document.getElementById('MOBILE_GALLERY').scrollTop : null;

    if (elementParent) {
      const index = currentIndex;
      const targetElementOffsetHeight = document.getElementById(`gallery-item-${index}`).offsetHeight;
      const targetHeight = testOffsetHeight + targetElementOffsetHeight;
      if (testOffsetHeight === 0 && (elementParent > targetElementOffsetHeight)) {
        setHeight(testOffsetHeight + targetElementOffsetHeight);
        changeIndex('NEXT');
      }

      if (testOffsetHeight > 0) {
        let newHeight;
        const previousTarget = document.getElementById(`gallery-item-${index === 0 ? 0 : index - 1}`).offsetHeight;

        if (currentIndex === maxIndex && elementParent > targetHeight) {
          return null;
        }

        if ((elementParent < testOffsetHeight) && index !== 0) {
          newHeight = testOffsetHeight - previousTarget;
          setHeight(newHeight);
          changeIndex('PREV');
        }

        if ((elementParent > targetHeight)) {
          setHeight(testOffsetHeight + targetElementOffsetHeight);
          changeIndex('NEXT');
        }
      }
    }

    return null;
  };

  /* renders updated gallery elements after currentIndex is changed */
  const finalizeGalleryItems = () => {
    let elements;
    if (currentAction === 'PREV') {
      elements = handlePrevious([...elementData]);
    } else {
      elements = handleNext([...elementData]);
    }
    const finalizedElements = handleImageFocus(elements);
    setElementData(finalizedElements);
    renderCaptionByCurrentIndex();
  };

  const getMobileElements = () => {
    const finalElements = mobileElementData.map((element, i) => (
      <GalleryItem
        url={element.props.url}
        id={`gallery-item-${i}`}
        key={`gallery-item-${element.props.url}`}
        alt={element.props.alt}
        width={element.props.width}
        index={element.props.index}
        isStickyVisible={isStickyVisible}
        isMobile={isMobile}
        isCaptionOn={isCaptionOn}
        captionObj={element.props.captionObj}
      />
    ));
    return finalElements;
  };

  /* HELPERS END */

  // only runs if currentIndex has changed
  useEffect(() => {
    if (elementData && !isStickyVisible && currentAction !== '') {
      finalizeGalleryItems();
    }
  }, [currentIndex]);

  // calculate translateX if currentIndex is changed
  useEffect(() => {
    calculateTranslateX();
  }, [currentIndex, translateX, elementData]);

  // runs only once since baseCaptionData will populate only once
  useEffect(() => {
    renderCaptionByCurrentIndex();
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
  if (globalContent && !elementData) {
    console.log('contentElements', globalContent);
    const { content_elements: contentElements } = globalContent;
    console.log(contentElements);
    const tempCaptionData = [];
    let galleryItem;
    let captionItem;
    let isFocused;
    const galleryData = contentElements.map((element, i) => {
      galleryItem = {};
      captionItem = {};
      isFocused = false;

      if (element.url) {
        galleryItem.url = element.url;
      }

      if (element.copyright) {
        captionItem.copyright = element.copyright;
      }

      if (element.caption) {
        captionItem.caption = element.caption;
      }

      if (element.alt) {
        galleryItem.alt = element.alt;
      }

      if (element.credits.by) {
        captionItem.credit = element.credits.by;
      }

      if (element.width) {
        galleryItem.width = element.width;
      }

      if (currentIndex === i) {
        isFocused = true;
      }

      captionItem.index = i;

      tempCaptionData.push(captionItem);

      return (
        <GalleryItem
          url={galleryItem.url}
          key={`gallery-item-${galleryItem.url}`}
          alt={galleryItem.alt}
          index={i}
          focus={isFocused}
          id={`gallery-item-${i}`}
          width={galleryItem.width}
          isStickyVisible={isStickyVisible}
          isMobile={isMobile}
          isCaptionOn={isCaptionOn}
          captionObj={captionItem}
        />
      );
    });

    const baseElementsForMobile = [...galleryData];
    const finalizedGalleryItems = reorganizeElements(galleryData);

    if (!elementData) {
      setElementData(finalizedGalleryItems);
    }

    if (maxIndex === 0) {
      setMaxIndex(finalizedGalleryItems.length - 1);
    }

    if (window.innerWidth <= 1023) {
      setMobileState(true);
    }

    setBaseCaptionData(tempCaptionData);
    setMobileElementData(baseElementsForMobile);
  }

  if (isStickyVisible || isMobile) {
    mobileElemData = getMobileElements();
  }

  return (
    <div id="GALLERY" className={`gallery-wrapper ${isMobile && !isStickyVisible ? 'mobile-display' : ''}`}>
      {
        isStickyVisible
          ? <div className="gallery-immersive hidden-large">
            <div className="gallery-sticky">
              <div className="gallery-caption-toggle">
                <a onClick={() => handleCaptionToggle('OFF')} href="#"
                  title="captions on"
                  className={`gallery-caption-trigger ${isCaptionOn ? 'is-active' : ''}`}>on</a>
                <a onClick={() => handleCaptionToggle('ON')} href="#"
                  title="captions off"
                  className={`gallery-caption-trigger 
                ${!isCaptionOn ? 'is-active' : ''}`}>off</a>
                <div>Captions</div>
              </div>
              <div className="gallery-count">
                <img src={middleBox} className="icon-sticky"></img>
                <span className="gallery-index"> {currentIndex + 1}   /   {maxIndex + 1} </span>
              </div>
              <div onClick={handleStickyClose} className="gallery-immersive--close"></div>
            </div>
            <div id="MOBILE_GALLERY" className="gallery-full">
              {isStickyVisible ? mobileElemData : null}
            </div>
          </div>
          : null
      }
      {
        !isMobile
          ? <div className="gallery-container " style={{ transform: `translateX(${translateX}px)` }}>
            {elementData}
          </div>
          : null
      }
      <div
        onClick={() => handleStickyOpen()}
        className={`gallery-caption-container ${!isStickyVisible && isMobile ? 'mosiac-gallery' : ''}`}>
        <div className="gallery-overlay hidden-large">
          {
            isMobile ? <div className="gallery-overlay-backdrop ">
              <div className="left-backdrop">
                {mobileElementData && mobileElementData[0]}
              </div>
              <div className="right-backdrop">
                {mobileElementData && mobileElementData[1]}
                {mobileElementData && mobileElementData[mobileElementData.length - 1]}
              </div>
            </div> : null
          }
        </div>
        <div className="gallery-count view-gallery">
          <div className="gallery-count-prev hidden-small hidden-medium">
            <a onClick={() => changeIndex('PREV')}>
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
            <a onClick={() => changeIndex('NEXT')}>
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
