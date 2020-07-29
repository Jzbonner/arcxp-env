import React, { useState, useEffect, useRef } from 'react';
import { useAppContext, useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import './default.scss';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';
import getAltText from '../../../layouts/_helper_functions/getAltText';
import getTeaseIcon from './_helper_functions/getTeaseIcon';

const Image = ({
  width, height, src, imageMarginBottom, imageType, maxTabletViewWidth, teaseContentType, ampPage = false,
}) => {
  const {
    url, height: originalHeight, width: originalWidth, caption, credits, alt_text: altText,
  } = src || {};
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const appContext = useAppContext();
  const { deployment, contextPath } = appContext;
  const { logoPlaceholder } = getProperties(arcSite);
  const placeholder = deployment(`${contextPath}${logoPlaceholder}`);

  const [imageSrc, setImageSrc] = useState('');
  const [placeholderWidth, setPlaceholderWidth] = useState('100%');
  const imageEl = useRef(null);
  const placeholderEl = useRef(null);

  const setLoaded = () => {
    imageEl.current.style.display = 'block';
    placeholderEl.current.style.display = 'none';
  };

  const lazyLoadImage = () => {
    const imagePosition = placeholderEl.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    const buffer = 300;

    if (!imageSrc && (imagePosition < windowHeight + buffer)) {
      setImageSrc(imageResizer(url, arcSite, width, height));
    }
  };

  useEffect(() => {
    const styles = window.getComputedStyle(imageEl.current);
    setPlaceholderWidth(styles.width);
    if (contextPath === '/pf') {
      setImageSrc(imageResizer(url, arcSite, width, height));
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', lazyLoadImage);
    window.addEventListener('DOMContentLoaded', lazyLoadImage);
    return () => {
      window.removeEventListener('scroll', lazyLoadImage);
      window.addEventListener('DOMContentLoaded', lazyLoadImage);
    };
  });

  useEffect(() => {
    if (teaseContentType) {
      const currentTimeInMilliseconds = new Date().getTime();
      if (!window.lastNativoCall) {
        window.lastNativoCall = {
          time: currentTimeInMilliseconds - 1000,
          timeOutSet: false,
        };
      }
      const { lastNativoCall } = window;

      // calls nativo script 1s after last call or
      // immediately if it has been more than 1s.
      if (!lastNativoCall.timeOutSet) {
        lastNativoCall.timeOutSet = true;
        setTimeout(() => {
          lastNativoCall.timeOutSet = false;
          lastNativoCall.time = new Date().getTime();
          if (window.PostRelease) {
            window.PostRelease.Start();
          }
        }, 1000 - (currentTimeInMilliseconds - lastNativoCall.time));
      }
    }
  });

  const screenSize = checkWindowSize();

  let mainCredit;
  let secondaryCredit;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
    secondaryCredit = credits.by && credits.by.length && credits.by[0] && credits.by[0].name ? credits.by[0].name : null;
  }

  let giveCredit;
  if (mainCredit) {
    giveCredit = `Credit: ${mainCredit}`;
  } else if (secondaryCredit) {
    giveCredit = `Credit: ${secondaryCredit}`;
  }

  const renderCaption = () => {
    if (
      (imageType === 'isLeadImage' && !giveCredit && !caption)
      || (imageType === 'isInlineImage' && !caption)
      || (imageType === 'isLeadImage' && giveCredit && !caption && screenSize.width > maxTabletViewWidth)
      || teaseContentType
    ) {
      return null;
    }
    if (imageType === 'isLeadImage' && giveCredit && !caption && screenSize.width < maxTabletViewWidth) {
      return <Caption src={src} />;
    }
    return <Caption src={src} />;
  };

  return (
    <div className={`c-image-component ${imageMarginBottom || ''}`}>
      <div className={`image-component-image ${ampPage ? 'amp' : ''}`}>
        <>
          {!ampPage ? (
            <>
            <img src={imageSrc}
              style={{ display: 'none' }}
              alt={getAltText(altText, caption)}
              className={teaseContentType ? 'tease-image' : ''}
              ref={imageEl}
              onLoad={setLoaded}/>
            <img src={placeholder} ref={placeholderEl}
              style={{ width: placeholderWidth }}/>
            </>
          ) : (
            <amp-img
              src={imageResizer(url, arcSite, width, height)}
              alt={getAltText(altText, caption)}
              width={width}
              height={height !== 0 ? height : (width / originalWidth) * originalHeight}
              layout="responsive"
              class={teaseContentType ? 'tease-image' : ''}>
              <amp-img
                src={placeholder}
                alt={getAltText(altText, caption)}
                fallback=""
                width={width}
                height={height !== 0 ? height : (width / originalWidth) * originalHeight}
                layout="responsive"
                class={teaseContentType ? 'tease-image' : ''}
                >
              </amp-img>
            </amp-img>
          )}
          {teaseContentType && getTeaseIcon(teaseContentType)}
        </>
        {imageType !== 'isHomepageImage' && renderCaption()}
      </div>
      {imageType !== 'isHomepageImage' && <p className="photo-credit-text">{giveCredit}</p>}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageMarginBottom: PropTypes.string,
  imageType: PropTypes.oneOf(['isLeadImage', 'isInlineImage', 'isHomepageImage']).isRequired,
  maxTabletViewWidth: PropTypes.number,
  teaseContentType: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ampPage: PropTypes.bool,
};
export default Image;
