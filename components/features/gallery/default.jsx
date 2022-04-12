/* eslint-disable camelcase */
import React, {
  useState, useEffect, useRef, useReducer,
} from 'react';
import LazyLoad from 'react-lazyload';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import { useAppContext } from 'fusion:context';
import { useSwipeable } from 'react-swipeable';
import {
  DesktopGallery, DesktopCaption, GalleryItem, OverlayMosiac, MobileGallery, ImageModal,
} from '../../_helper_components/global/gallery/index';
import {
  debounce, createBaseGallery, handleImageFocus, reorganizeElements, handlePropContentElements,
} from './_helper_functions/index';
import checkTags from '../../layouts/_helper_functions/checkTags';
import ArcAd from '../ads/default';
import PGO1Element from '../../_helper_components/global/ads/pg01/default';
import MPGO1Element from '../../_helper_components/global/ads/mpg01/default';
import leftArrow from '../../../resources/icons/gallery/left-arrow.svg';
import middleBox from '../../../resources/icons/gallery/middle-box.svg';
import rightArrow from '../../../resources/icons/gallery/right-arrow.svg';
import './default.scss';

const PG01 = galleryTopics => <ArcAd staticSlot={'PG01'} key={'PG01'} galleryTopics={galleryTopics} />;
const PG02 = galleryTopics => <ArcAd staticSlot={'PG02'} key={'PG02'} galleryTopics={galleryTopics} />;

const Gallery = (props) => {
  const {
    contentElements = [], leafContentElements = [], promoItems = {}, customFields = {}, pageType = '', leafHeadline = '', taxonomy = {}, isEmbed = false,
  } = props;

  const appContext = useAppContext();
  const { isAdmin, arcSite = 'ajc', globalContent } = appContext;
  const { taxonomy: globalTaxonomy } = globalContent || {};
  const isStory = pageType === 'story';

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
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [modalVisible, setModalVisibility] = useState(false);
  const [currentImageSrc, setCurrectImageSrc] = useState('');


  /* Ads */
  const [clickCount, setClickCount] = useState(0);
  const [isAdVisible, setAdVisibleState] = useState(false);
  const [previousClickAction, setPreviousClickAction] = useState(null);
  const [clickDirection, setClickDirection] = useState(null);
  const [clickType, setClickType] = useState('');

  /* Mobile */
  const [offsetHeight, setHeight] = useState(0);
  const [isCaptionOn, setCaptionState] = useState(true);
  const [isStickyVisible, setStickyState] = useState(false);
  const [isMobile, setMobileState] = useState('NOT INIT');

  /* Mobile Ads */
  const [mobileAdsIndices, setMobileAdsIndices] = useState([]);
  const [isAdInsertable, setAdInsertionAbleState] = useState(true);

  /* Metrics */
  const [hasOpened, setOpenedState] = useState(null);
  const [isContentDataHeadlineFilled, setContentDataHeadlineState] = useState(false);
  const windowExists = typeof window !== 'undefined';

  /* Special presentation gallery */
  const [previousIndex, setPreviousIndex] = useState(0);

  const galleryEl = useRef(null);
  const galleryMobileEl = useRef(null);
  const PG01Ref = useRef(null);
  const mobileBreakPoint = 767;

  const actions = {
    PREV: 'PREV',
    NEXT: 'NEXT',
    ON: 'ON',
    OFF: 'OFF',
    RESIZE: 'RESIZE',
    AD_REMOVED: 'AD_REMOVED',
    AD_RESET: 'AD_RESET',
    UPDATE_CLICK_FUNCS: 'UPDATE_CLICK_FUNCS',
    NEXT_WITH_INTEGER: 'NEXT_WITH_INTEGER',
    PREV_WITH_INTEGER: 'PREV_WITH_INTEGER',
  };

  const types = {
    IMAGE: 'IMAGE',
    ARROW: 'ARROW',
  };

  let mobileElemData;
  let mobileFuncs = {};
  let mobileState = {};
  let preRenderEls = null;
  let fetchedGalleryData = null;

  // if standalone feature, fetches a specific gallery
  const { galleryUrl } = customFields;
  if (galleryUrl) {
    fetchedGalleryData = useContent({
      source: 'gallery-api',
      query: {
        arcSite,
        path: galleryUrl,
      },
    });
  }

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const featuredGalleryData = Object.keys(promoItems).length > 0 ? promoItems : null;
  const { headlines = {} } = featuredGalleryData || contentElements || fetchedGalleryData;
  let headline = headlines.basic || leafHeadline ? headlines.basic || leafHeadline : null;
  const fetchedHeadline = !headline && fetchedGalleryData?.headlines?.basic;

  const dataLayer = windowExists ? window.dataLayer : [];

  let finalPromoItemTopics = [];
  let finalTaxonomyTopics = [];
  const finalTaxonomyTags = [];

  const { taxonomy: fetchedTaxonomy = {}, promo_items: fetchedPromoItems = {} } = fetchedGalleryData || {};
  const { taxonomy: featuredTaxonomy = {}, promo_items: featuredPromoItems = {} } = featuredGalleryData || {};
  const { tags = [] } = globalTaxonomy || {};
  const noAds = checkTags(tags, 'no-ads');

  if (fetchedPromoItems?.basic?.additional_properties?.keywords) {
    finalPromoItemTopics = fetchedPromoItems.basic.additional_properties.keywords;
  } else if (featuredPromoItems?.basic?.additional_properties?.keywords) {
    finalPromoItemTopics = featuredPromoItems.basic.additional_properties.keywords;
  } else if (promoItems?.additional_properties?.keywords) {
    finalPromoItemTopics = promoItems.additional_properties.keywords;
  }

  if (fetchedTaxonomy.tags && fetchedTaxonomy.tags.length) {
    finalTaxonomyTopics = fetchedTaxonomy.tags;
  } else if (featuredTaxonomy.tags && featuredTaxonomy.tags.length) {
    finalTaxonomyTopics = featuredTaxonomy.tags;
  } else if (taxonomy.tags && taxonomy.tags.length) {
    finalTaxonomyTopics = taxonomy.tags;
  }

  if (finalTaxonomyTopics.length) {
    finalTaxonomyTopics.forEach(tag => (tag?.name ? finalTaxonomyTags.push(tag.name)
      : tag?.text && finalTaxonomyTags.push(tag.text)));
  }

  const galleryTopics = [...new Set([...finalTaxonomyTags, ...finalPromoItemTopics])];

  // push headline for home/section galleries
  if (!galHeadline && !headline && !isContentDataHeadlineFilled && fetchedHeadline) {
    dataLayer.push({
      contentData: {
        galleryName: `${fetchedHeadline}`,
      },
    });

    setContentDataHeadlineState(true);
  }

  if (!maxIndex) {
    if (elementData && elementData.length > 1) {
      setMaxIndex(elementData.length - 1);
    } else if (mobileElementData && mobileElementData.length > 1) {
      setMaxIndex(mobileElementData.length - 1);
    }
  }

  /* applies transform: translateX to center on the focused image */
  const calculateTranslateX = () => {
    if (isMobile && !isEmbed) return;
    let translateAmount;
    const focusElement = isAdVisible ? PG01Ref.current : document.getElementById(`gallery-item-${currentIndex}`) || null;
    const galleryFullWidth = galleryEl.current ? galleryEl.current.offsetWidth : null;
    if (galleryEl.current && focusElement) {
      translateAmount = parseInt(galleryFullWidth, 10) / 2 - parseInt(focusElement.offsetWidth, 10) / 2 - parseInt(focusElement.offsetLeft, 10);
      setTranslateX(translateAmount);
      // The gallery component needs to re-render every time this function is called.
      forceUpdate();
    }
  };

  const dispatchGalleryOpenEvent = () => {
    if (!hasOpened) dataLayer.push({ event: 'photoGalleryOpened' }, { galleryName: `${galHeadline || headline || ''}` });
    setCurrentAction(actions.UPDATE_CLICK_FUNCS);
    setOpenedState(true);
  };

  const dispatchPhotoViewedEvent = () => {
    dataLayer.push({ event: 'gallerySecondaryPhotoViewed' }, { galleryName: `${galHeadline || headline || ''}` });
  };

  const handelImageModalView = (imageSrc, isModalVisible) => {
    if (!hasOpened) dispatchGalleryOpenEvent();

    if (!isModalVisible) {
      setModalVisibility(true);
    } else {
      setModalVisibility(false);
    }

    setCurrentAction(actions.UPDATE_CLICK_FUNCS);

    if (imageSrc) setCurrectImageSrc(imageSrc);
  };

  // manages click count for desktop ads
  const handleClickCount = () => {
    if (clickCount === 4) {
      setClickCount(1);
    } else {
      setClickCount(clickCount + 1);
    }
  };

  const changeIndex = (action, maxNumber, isPhoto = true) => {
    const targetIndex = isPhoto ? 0 : 1;
    if (!hasOpened && (currentIndex === targetIndex || currentIndex === maxIndex)) dispatchGalleryOpenEvent();

    if (!isMobile && (currentIndex === 0 || clickCount % 3 !== 0)) {
      dispatchPhotoViewedEvent();
    } else if (isMobile && !isEmbed) {
      dispatchPhotoViewedEvent();
    }

    const currentClickCount = clickCount;
    if (!isMobile || isEmbed) handleClickCount();
    setPreviousClickAction(currentAction);

    /* if an index integer is suppied, then the gallery will jump to whatever index is passed. This is only used when non-adajcent images are clicked.  */
    if (typeof action === 'number') {
      setPreviousIndex(currentIndex);
      setCurrentIndex(action);
      if (currentIndex === 0) {
        const middleIndex = maxIndex / 2;
        if (action > middleIndex) {
          setCurrentAction(actions.PREV_WITH_INTEGER);
          setClickDirection(actions.PREV);
        } else {
          setCurrentAction(actions.NEXT_WITH_INTEGER);
          setClickDirection(actions.NEXT);
        }
      } else if (action > currentIndex) {
        setCurrentAction(actions.NEXT_WITH_INTEGER);
        setClickDirection(actions.NEXT);
      } else if (action < currentIndex) {
        setCurrentAction(actions.PREV_WITH_INTEGER);
        setClickDirection(actions.PREV);
      }
    } else if (noAds || (!isAdVisible && (currentClickCount === 0 || currentClickCount % 3 !== 0)) || (isAdVisible && currentClickCount === 4)) {
      // change current image index by -1
      if (action === actions.PREV) {
        setCurrentAction(action);
        setClickDirection(actions.PREV);
        if (!isAdVisible || currentClickCount % 4 === 0) {
          if (currentIndex <= 0) {
            if (!maxIndex) {
              setCurrentIndex(maxNumber);
            } else {
              setCurrentIndex(maxIndex);
            }
          } else if (!noAds && isAdVisible && previousClickAction === actions.NEXT) {
            setCurrentIndex(currentIndex);
          } else {
            setCurrentIndex(currentIndex - 1);
          }
        }
      } else if (action === actions.NEXT) {
        // change current image index by +1
        setCurrentAction(action);
        setClickDirection(actions.NEXT);
        if (!isAdVisible || currentClickCount % 4 === 0) {
          if (currentIndex === maxIndex) {
            setCurrentIndex(0);
          } else if (!noAds && isAdVisible && previousClickAction === actions.PREV) {
            setCurrentIndex(currentIndex);
          } else {
            setCurrentIndex(currentIndex + 1);
          }
        }
      }
    } else {
      setCurrentIndex(currentIndex);
    }

    if (isPhoto) {
      setClickType(types.IMAGE);
    } else {
      setClickType(types.ARROW);
    }

    return null;
  };

  const clickFuncs = {
    prev: () => changeIndex(actions.PREV, null, true, hasOpened),
    next: () => changeIndex(actions.NEXT, null, true, hasOpened),
    nonAdjacent: actionIndex => changeIndex(actionIndex, null, true, hasOpened),
    modal: (src, isModalVisible) => handelImageModalView(src, isModalVisible),
    calculateTranslateX: () => calculateTranslateX(),
  };

  const insertDesktopGalleryAd = () => {
    const elements = [...elementData];

    const insertionBuffer = currentAction === actions.PREV ? 0 : 1;

    elementData.forEach((element, i) => {
      // inserts add after current photo
      if (element.props.data.states.isFocused) {
        elements.splice(i + insertionBuffer, 0, <PGO1Element refHook={PG01Ref} adSlot={PG01} key={`${i}-PG01`} galleryTopics={galleryTopics} />);
      }
    });

    return elements;
  };

  const insertMobileGalleryAd = () => {
    const mobileElements = [...mobileElementData];
    let currentAdCount = 0;

    mobileElementData.forEach((el, i) => {
      if (el.props.data && i !== 0 && i % 4 === 0) {
        // My only explanation for moving this here is because this function is called
        // browser side on, the MPG01 variable is out of scope. Once moved inside of here,
        // the ads were appearing on sandbox. This may or may not be the reason. But since
        // the MPG01 ad is only called here, I think it's safe to leave it here.
        const MPG01 = (adCount, mpg01GalleryTopics) => <ArcAd staticSlot={'MPG01'} adSuffix={`_${adCount}`} key={'MPG01'} galleryTopics={mpg01GalleryTopics} />;
        /* eslint-disable-next-line max-len */
        mobileElements.splice(i + (i > 0 ? currentAdCount : 0), 0, <MPGO1Element adSlot={MPG01} adCount={currentAdCount} key={`${i}-MPG01`} galleryTopics={galleryTopics} />);
        currentAdCount += 1;
      }
    });

    return mobileElements;
  };

  const removeGalleryAd = () => {
    const elements = [...elementData];

    elementData.forEach((element, i) => {
      if (element.props.adSlot) elements.splice(i, 1);
    });

    return elements;
  };

  // opens mobile sticky
  const handleStickyOpen = () => {
    if (isMobile) setStickyState(true);
    dispatchGalleryOpenEvent();
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
    document.body.style.overflow = 'initial';
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
    preRenderEls = handleImageFocus(
      elements,
      {
        isStickyVisible,
        isMobile,
        isCaptionOn,
        currentIndex,
        maxIndex,
        isAdVisible,
        currentAction,
        hasOpened,
        modalVisible,
      },
      clickFuncs,
      isEmbed,
    );

    setElementData(preRenderEls);

    if (!isAdVisible) renderCaptionByCurrentIndex();
  };

  const handleNext = (arr, returnOnly = false) => {
    const newArr = [...arr];

    if (currentAction === actions.NEXT_WITH_INTEGER) {
      const difference = Math.abs(currentIndex - previousIndex);

      for (let i = 0; i < difference; i += 1) {
        newArr.push(newArr.shift());
      }
    } else {
      newArr.push(newArr.shift());
    }

    if (returnOnly) {
      return newArr;
    }
    return renderDesktopGalleryElements(newArr);
  };

  const handlePrevious = (arr, returnOnly = false) => {
    const newArr = [...arr];
    let difference = null;

    if (currentAction === actions.PREV_WITH_INTEGER) {
      if (previousIndex === 0 && maxIndex !== currentIndex) {
        difference = Math.abs((maxIndex - currentIndex) + 1);
      } else if (previousIndex === 0 && maxIndex === currentIndex) {
        difference = 1;
      } else {
        difference = Math.abs(currentIndex - previousIndex);
      }

      for (let i = 0; i < difference; i += 1) {
        newArr.unshift(newArr.pop());
      }
    } else {
      newArr.unshift(newArr.pop());
    }

    if (returnOnly) {
      return newArr;
    }
    return renderDesktopGalleryElements(newArr);
  };

  const handleResizeEvent = () => {
    calculateTranslateX();

    if (!isEmbed) {
      if (windowExists && window.innerWidth <= mobileBreakPoint) {
        setMobileState(true);
      } else {
        setMobileState(false);
      }
    }

    setCurrentAction(actions.RESIZE);
  };

  const getInitWindowSize = () => {
    if (!isEmbed && windowExists && window.innerWidth <= mobileBreakPoint) {
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
      const targetOffsetTop = document.getElementById(`gallery-item-${index}`).offsetTop;

      if (offsetHeight === 0 && galleryScrollTop > targetOffsetTop) {
        setHeight(offsetHeight + targetOffsetTop);
        changeIndex(actions.NEXT);
      }

      if (offsetHeight > 0) {
        const previousTarget = document.getElementById(`gallery-item-${index === 0 ? 0 : index - 1}`).offsetTop;

        if (currentIndex === maxIndex && galleryScrollTop > targetOffsetTop) {
          return null;
        }

        if (galleryScrollTop < offsetHeight && index !== 0) {
          setHeight(previousTarget);
          changeIndex(actions.PREV);
        }

        if (galleryScrollTop > targetOffsetTop) {
          setHeight(targetOffsetTop);
          changeIndex(actions.NEXT);
        }
      }
    }

    return null;
  }, 10);

  /* renders updated gallery elements after currentIndex is changed */
  const finalizeGalleryItems = () => {
    if (clickDirection === actions.PREV) {
      handlePrevious([...elementData]);
    } else {
      handleNext([...elementData]);
    }
  };

  // maps mobile elements with updated parent states
  const getMobileElements = (arr) => {
    const finalElements = arr.map((element) => {
      // if the element is an ad, just return it
      if (element && element.props && element.props.adSlot) return element;

      const elementItemData = { ...element.props.data };
      const parentStates = {
        isStickyVisible,
        isMobile,
        isCaptionOn,
      };
      elementItemData.states = { ...parentStates };

      return <GalleryItem data={elementItemData} key={`gallery-item-${elementItemData.url}`} isMobileGallery={true} />;
    });
    return finalElements;
  };

  useEffect(() => {
    getInitWindowSize();
  }, []);

  useEffect(() => {
    if (elementData && !isStickyVisible && currentAction !== '' && currentAction !== actions.AD_REMOVED) {
      finalizeGalleryItems();
    } else if (elementData && !isStickyVisible && currentAction === actions.AD_REMOVED && clickType === types.IMAGE) {
      renderDesktopGalleryElements([...elementData]);
    }

    if (isStickyVisible && isAdInsertable && mobileElementData) {
      const adsInstertedMobileEls = insertMobileGalleryAd();
      setMobileElementData(adsInstertedMobileEls);
      setAdInsertionAbleState(false);
    }
  }, [currentIndex, isAdVisible, isStickyVisible]);

  useEffect(() => {
    if (!isMobile && galleryEl && galleryEl.current) {
      calculateTranslateX();

      if (elementData && (hasOpened || modalVisible) && !isMobile && currentAction === actions.UPDATE_CLICK_FUNCS) {
        const elements = preRenderEls || elementData;
        renderDesktopGalleryElements([...elements]);
        setCurrentAction('');
      }
    }
  }, [isAdVisible, currentIndex, currentAction, translateX, elementData, captionData, galleryEl, hasOpened, modalVisible]);

  useEffect(() => {
    if (!isAdVisible && !isMobile) renderCaptionByCurrentIndex();
  }, [baseCaptionData]);

  // handles swiping functionality for tablets
  const handlers = useSwipeable({
    onSwipedLeft: () => changeIndex(actions.NEXT, null, true),
    onSwipedRight: () => changeIndex(actions.PREV, null, true),
    preventDefaultTouchmoveEvent: false,
    trackTouch: true,
    trackMouse: true,
  });

  // handles ad insertions and removals for desktop gallery
  useEffect(() => {
    if (!noAds && (!isMobile || isEmbed)) {
      if (clickCount !== 0 && clickCount % 4 === 0) setAdVisibleState(true);
      if (!isAdVisible && clickCount && clickCount % 4 === 0) {
        const adInsertedElementArray = insertDesktopGalleryAd();
        setElementData(adInsertedElementArray);
      } else if (isAdVisible && (clickCount % 4) === 1) {
        const adRemovedElementArray = removeGalleryAd();
        let reorganizedElements = null;

        if (clickType !== types.IMAGE) {
          if (clickDirection === actions.PREV) {
            reorganizedElements = handlePrevious(adRemovedElementArray, true);
          } else {
            reorganizedElements = handleNext(adRemovedElementArray, true);
          }
        }

        setAdVisibleState(false);

        const finalizedElements = handleImageFocus(
          reorganizedElements || adRemovedElementArray,
          {
            isStickyVisible,
            isMobile,
            isCaptionOn,
            currentIndex,
            maxIndex,
            hasOpened,
            modalVisible,
          },
          clickFuncs,
          isEmbed,
        );

        setElementData(finalizedElements);
        setCurrentAction(actions.AD_REMOVED);
        renderCaptionByCurrentIndex();
      }
    }
  }, [isAdVisible, clickCount, noAds]);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollEvent, true);

    // returned function will be called when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScrollEvent, true);
    };
  }, [currentIndex, isCaptionOn, mobileAdsIndices, isAdInsertable, offsetHeight]);

  useEffect(() => {
    window.addEventListener('resize', handleResizeEvent, true);
    return () => {
      window.removeEventListener('resize', handleResizeEvent, true);
    };
  }, [isMobile]);

  // initializing the gallery w/ either propped or fetched content elements
  // NOTE: leafContentElements = Gallery-page-only propped contentElements array
  if (isMobile !== 'NOT INIT' && (contentElements || leafContentElements || fetchedGalleryData || featuredGalleryData) && (currentAction === actions.RESIZE || currentAction === actions.AD_RESET || (!elementData && !mobileElementData))) {
    let relevantGalleryData = null;
    let galleryContentElements = null;
    let fetchedContentElements = null;
    let featuredContentElements = null;

    if ((contentElements.length > 0 || contentElements?.content_elements?.length > 0) && leafContentElements.length <= 0) {
      relevantGalleryData = handlePropContentElements(contentElements);
    }

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

    if ((!headline && !galHeadline) || !canonicalUrl) {
      const mainData = relevantGalleryData || fetchedGalleryData;

      if (mainData) {
        headline = mainData.headlines && mainData.headlines.basic ? setHeadline(mainData.headlines.basic) : null;

        if (mainData && mainData.canonical_url) setCanonicalUrl(mainData.canonical_url);
      }
    }

    const baseGalleryData = fetchedContentElements || featuredContentElements || galleryContentElements;
    const captionAndGalleryData = createBaseGallery(
      baseGalleryData,
      {
        isStickyVisible,
        isMobile,
        isCaptionOn,
        currentIndex,
        modalVisible,
      },
      isMobile,
      {
        prev: () => changeIndex(actions.PREV, baseGalleryData.length - 1),
        next: () => changeIndex(actions.NEXT),
        nonAdjacent: actionIndex => changeIndex(actionIndex, null, true, hasOpened),
        modal: (src, isModalVisible) => handelImageModalView(src, isModalVisible),
      },
      isEmbed,
    );
    const { galleryData = [], desktopCaptionData = [] } = captionAndGalleryData || {};

    if (!isMobile || isEmbed) {
      if (!elementData) {
        const finalizedGalleryItems = reorganizeElements([...galleryData]);
        setElementData(finalizedGalleryItems);
      }

      if (!baseCaptionData) setBaseCaptionData(desktopCaptionData);
    } else if ((!mobileElementData && !isEmbed) || currentAction === actions.AD_RESET) {
      const baseElementsForMobile = [...galleryData];
      if (!isMobile) setMobileState(true);
      setMobileElementData(baseElementsForMobile);
      setMobileAdsIndices([]);
      setCurrentAction('');
    }
  }

  if (isStickyVisible || (isMobile && !isEmbed)) {
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

  const galleryOutput = () => (
    <div className={`${!isStory && !isEmbed ? 'c-gallery-homeSection' : ''} ${isEmbed ? 'c-gallery-embed' : ''}`}>
      {!isMobile ? (
        <div onClick={() => handelImageModalView(currentImageSrc, modalVisible)}>
          <ImageModal src={currentImageSrc} isVisible={modalVisible} />
        </div>
      ) : null}
      <div ref={galleryEl} className={`gallery-wrapper ${!isEmbed && isMobile && !isStickyVisible ? 'mobile-display' : ''}`} >
        {(!isMobile && galHeadline && isStory && !isEmbed) ? (
          <div className={`gallery-headline ${isEmbed ? 'hide' : ''}`}>
            <a href={canonicalUrl || null}>{galHeadline}</a>
          </div>
        ) : null}
        {isStickyVisible && !isEmbed ? <MobileGallery objectRef={galleryMobileEl} data={mobileElemData} states={mobileState} funcs={mobileFuncs} /> : null}
        {!isMobile || isEmbed ? <DesktopGallery data={elementData} translateX={translateX} handlers={handlers} /> : null}
        <div onClick={handleStickyOpen} className={`gallery-caption-icons-box ${!isEmbed && !isStickyVisible && isMobile ? 'mosaic-gallery' : ''}`}>
          {!isEmbed && <div className="gallery-overlay hidden-large">{isMobile ? <OverlayMosiac data={mobileElemData} arcSite={arcSite} /> : null}</div>}
          <div className="gallery-count view-gallery">
            <div className={`gallery-count-prev ${!isEmbed ? 'hidden-small hidden-medium' : ''}`} onClick={() => changeIndex(actions.PREV, null, false)}>
              <img src={leftArrow} alt="Left arrow" />
            </div>
            {<div className="mobile-change">
              <a>
                <img src={middleBox} className="icon-gallery" alt="Mobile gallery icon" />
              </a>
              {!isEmbed && <div className="icon-text hidden-large">View Gallery</div>}
            </div>}
            <div className={`gallery-count-next ${!isEmbed ? 'hidden-small hidden-medium' : ''}`} onClick={() => changeIndex(actions.NEXT, null, false)}>
              <img src={rightArrow} alt="Right arrow" />
            </div>
            <div className={`count--box ${!isEmbed ? 'hidden-small hidden-medium' : ''}`}>
              <span className="gallery-index">{currentIndex + 1} / </span>
              <span>{maxIndex && maxIndex + 1}</span>
            </div>
          </div>
        </div>
        {captionData}
      </div>
    </div>
  );

  const galleryHeadlineAdOutput = () => (
    <>
      {(isMobile || !isStory) && galHeadline ? (
        <div className={`gallery-headline ${isMobile ? '' : 'with-ad'} ${isEmbed ? 'hide' : ''}`}>
          <a href={canonicalUrl || null}>{galHeadline}</a>
        </div>
      ) : null}
      {!isStory && !isMobile && !isEmbed ? <div className="gallery-ads-PG02">{PG02 && PG02(galleryTopics)}</div> : null}
    </>
  );

  if (isAdmin) {
    return (
      <>
        {galleryHeadlineAdOutput()}
        {galleryOutput()}
      </>
    );
  }

  return (
    <>
      {galleryHeadlineAdOutput()}
      <LazyLoad placeholder={<div className="c-placeholder-gallery" data-uri={canonicalUrl || null} />} height="100%" width="100%" offset={300} overflow={!isMobile} once={true}>
        {galleryOutput()}
      </LazyLoad>
    </>
  );
};

Gallery.propTypes = {
  contentElements: PropTypes.array,
  leafContentElements: PropTypes.array,
  promoItems: PropTypes.object,
  ads: PropTypes.array,
  pageType: PropTypes.string,
  leafHeadline: PropTypes.string,
  taxonomy: PropTypes.object,
  isEmbed: PropTypes.bool,
  customFields: PropTypes.shape({
    galleryUrl: PropTypes.string.tag({
      label: 'Gallery URL',
      description: 'Please enter a valid gallery url to fetch related content.',
    }),
  }),
};

export default Gallery;
