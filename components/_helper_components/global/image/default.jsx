import React, { useState } from 'react';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import LazyLoad from 'react-lazyload';
import Caption from '../caption/default.jsx';
import Overlay from '../overlay/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import getAltText from '../../../layouts/_helper_functions/getAltText';
import setFocalCoords from '../../../../content/sources/helper_functions/setFocalCoords';
import expandIcon from '../../../../resources/icons/expand.svg';
import closeIcon from '../../../../resources/icons/close.svg';
import './default.scss';

/*
  srcSetSizes is an optional array to be used when an image should render with `srcset` & `sizes` attributes.  It is an array of 3 nested arrays, and should be ordered from desktop -> mobile with width preceding height, as such:
  [
    [w, h], // desktop
    [w, h], // tablet
    [w, h], // mobile
  ]
*/
const Image = ({
  width, height, src, imageMarginBottom, imageType, maxTabletViewWidth, teaseContentType, squareImage = false,
  ampPage = false, onClickRun, useSrcSet = false, srcSetSizes = [], additionalClasses = '', noLazyLoad = false, index,
}) => {
  const {
    resized_obj: resizedObject = null,
    url,
    height: originalHeight,
    width: originalWidth,
    caption, credits,
    alt_text: altText,
    additional_properties: additionalProperties,
    focal_point: rootFocalPoint,
    useSrcSet: hasSrcSet = false,
    alignment,
    vanity_credits: vanityCredits,
  } = src || {};

  const appContext = useAppContext();
  const {
    arcSite,
    layout,
    deployment,
    contextPath,
  } = appContext;
  const { logoPlaceholder } = getProperties(arcSite);
  const placeholder = deployment(`${contextPath}${logoPlaceholder}`);
  const isGalleryImage = imageType === 'isGalleryImage';
  let img = null;

  const [toggle, setToggle] = useState(false);

  if (resizedObject && (resizedObject.src || resizedObject.length) && !squareImage) {
    img = resizedObject;
  } else if (url) {
    const focalCoords = setFocalCoords(additionalProperties, rootFocalPoint);
    const imgQuery = {
      src: url,
      height,
      width,
      srcSetSizes,
      originalHeight,
      originalWidth,
      focalCoords,
      arcSite,
      squareImage,
      isGallery: isGalleryImage,
    };

    img = useContent({
      source: 'resizer',
      query: imgQuery,
    });
  }

  const screenSize = checkWindowSize();

  let mainCredit;
  let mainCreditPhotographer;
  let vanityCredit;
  let vanityCreditPhotographer;
  if (credits) {
    mainCredit = credits.affiliation && credits.affiliation[0] && credits.affiliation[0].name ? credits.affiliation[0].name : null;
    mainCreditPhotographer = credits.by && credits.by.length && credits.by[0] && credits.by[0].byline ? credits.by[0].byline : null;
  }
  if (vanityCredits) {
    vanityCredit = vanityCredits.affiliation && vanityCredits.affiliation[0] && vanityCredits.affiliation[0].name ? vanityCredits.affiliation[0].name : null;
    vanityCreditPhotographer = vanityCredits.by && vanityCredits.by.length && vanityCredits.by[0] && vanityCredits.by[0].name ? vanityCredits.by[0].name : null;
  }

  let giveCredit;
  if (vanityCredit) {
    giveCredit = `Credit: ${vanityCredit}`;
  } else if (vanityCreditPhotographer) {
    giveCredit = `Credit: ${vanityCreditPhotographer}`;
  } else if (mainCredit) {
    giveCredit = `Credit: ${mainCredit}`;
  } else if (mainCreditPhotographer) {
    giveCredit = `Credit: ${mainCreditPhotographer}`;
  }

  const renderCaption = () => {
    if (
      (imageType === 'isLeadImage' && !giveCredit && !caption)
      || (imageType === 'isInlineImage' && !toggle && !caption)
      || (imageType === 'isLeadImage' && giveCredit && !caption)
      || teaseContentType
      || imageType === 'isAuthorImage'
    ) {
      return null;
    }
    if (imageType === 'isLeadImage' && giveCredit && caption && screenSize.width < maxTabletViewWidth) {
      return <Caption imageType={imageType} src={src} />;
    }
    return <Caption imageType={imageType} src={src} ampPage={ampPage} />;
  };

  const altTextContent = getAltText(altText, caption);
  const outputCaptionAndCredit = imageType !== 'isHomepageImage' && imageType !== 'isFeatureImage' && imageType !== 'isAuthorImage';
  const enableExpandableImage = imageType === 'isInlineImage' && layout === 'article-basic';

  if (img) {
    const {
      src: imgSrc = null,
      0: dtImage = {},
      1: tImage = {},
      2: mImage = {},
    } = img;
    const dataSrc = imgSrc || url;
    const renderImgTag = () => <>
      {useSrcSet || hasSrcSet ? (
        <picture className={teaseContentType ? 'tease-image' : ''}>
          <source srcSet={dtImage.src} media="(min-width: 1200px)" />
          <source srcSet={tImage.src} media="(min-width: 768px)" />
          <img src={mImage.src} alt={altTextContent} />
        </picture>
      ) : (
        <>
          <img
            src={dataSrc}
            alt={altTextContent}
            className={`${teaseContentType ? 'tease-image' : ''} ${additionalClasses}`}
            onClick={onClickRun}
          />
        </>
      )}
    </>;
    const renderedImageOutput = () => <>
      {!ampPage && (
        noLazyLoad ? (
          renderImgTag()
        ) : (
          <LazyLoad
            placeholder={
              <img src={placeholder} style={{ width: '100%' }} data-placeholder={true} data-src={dataSrc} alt={altTextContent}
                className={`placeholder-image ${teaseContentType ? 'tease-image' : ''} ${additionalClasses}`} />
            }
            height="100%"
            width="100%"
            once={true}>
            {renderImgTag()}
          </LazyLoad>
        )
      )}
      {ampPage && (
          <amp-img
            src={dataSrc}
            alt={altTextContent}
            width={width}
            height={height !== 0 ? height : (width / originalWidth) * originalHeight}
            layout="responsive"
            class={teaseContentType ? 'tease-image' : ''}>
            <amp-img
              src={placeholder}
              alt={altTextContent}
              fallback=""
              width={width}
              height={height !== 0 ? height : (width / originalWidth) * originalHeight}
              layout="responsive"
              class={teaseContentType ? 'tease-image' : ''}>
            </amp-img>
          </amp-img>
      )}
    </>;

    if (isGalleryImage) {
      return renderedImageOutput();
    }

    return (
      <div className={`c-image-component ${toggle ? 'overlay-active' : ''} ${imageMarginBottom || ''} ${alignment ? `align-${alignment}` : ''}`} data-index={index || null}>
        {enableExpandableImage && renderCaption()}
        <div className={`image-component-image ${ampPage ? 'amp' : ''} ${enableExpandableImage ? 'inline' : ''} ${originalHeight > originalWidth ? 'image-portrait' : 'image-landscape'}`}>
          <div className='enlargeImage-wrapper'>
            {renderedImageOutput()}
            <p className="photo-credit-text">{giveCredit}</p>
          </div>
          {outputCaptionAndCredit && renderCaption()}
          {enableExpandableImage && screenSize.width >= maxTabletViewWidth && <>
            <img src={closeIcon} className='image-close' alt='icon to close expanded image' onClick={(e) => { e.preventDefault(); setToggle(false); }} />
            <Overlay toggle={toggle} setToggle={setToggle}/>
            <img src={expandIcon} className='image-expand' alt={'icon to expand image'} onClick={(e) => { e.preventDefault(); setToggle(true); }}/>
          </>}
        </div>
        {outputCaptionAndCredit && <p className="photo-credit-text">{giveCredit}</p>}
      </div>
    );
  }
  return null;
};

Image.propTypes = {
  resized_obj: PropTypes.object,
  src: PropTypes.object.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  imageMarginBottom: PropTypes.string,
  imageType: PropTypes.oneOf(['isLeadImage', 'isInlineImage', 'isHomepageImage', 'isGalleryImage', 'isFeatureImage']).isRequired,
  maxTabletViewWidth: PropTypes.number,
  minTabletViewWidth: PropTypes.number,
  teaseContentType: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ampPage: PropTypes.bool,
  onClickRun: PropTypes.func,
  customScrollContainerEl: PropTypes.string,
  useSrcSet: PropTypes.bool,
  srcSetSizes: PropTypes.array,
  additionalClasses: PropTypes.string,
  noLazyLoad: PropTypes.bool,
  squareImage: PropTypes.bool,
  index: PropTypes.number,
};
export default Image;
