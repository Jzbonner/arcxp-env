import React from 'react';
import { useAppContext, useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import LazyLoad from 'react-lazyload';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import getAltText from '../../../layouts/_helper_functions/getAltText';
import getDomain from '../../../layouts/_helper_functions/getDomain';
import getTeaseIcon from './_helper_functions/getTeaseIcon';
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
  width, height, src, imageMarginBottom, imageType, maxTabletViewWidth, teaseContentType,
  ampPage = false, onClickRun, useSrcSet = false, srcSetSizes = [], additionalClasses = '',
}) => {
  const {
    url, height: originalHeight, width: originalWidth, caption, credits, alt_text: altText, additional_properties: additionalProperties,
  } = src || {};
  const { focal_point: focalPoint } = additionalProperties || {};
  const { min: focalMin = [], max: focalMax = [] } = focalPoint || {};
  const focalCoords = focalMin || focalMax || [];
  const fusionContext = useFusionContext();
  const { arcSite, layout } = fusionContext;
  const appContext = useAppContext();
  const { deployment, contextPath } = appContext;
  const { logoPlaceholder, cdnSite, cdnOrg } = getProperties(arcSite);
  const placeholder = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${deployment(`${contextPath}${logoPlaceholder}`)}`;

  const imgQuery = {
    src: url,
    height,
    width,
    srcSetSizes,
    originalHeight,
    originalWidth,
    focalCoords,
    arcSite,
  };

  const img = useContent({
    source: 'resizer',
    query: imgQuery,
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

  const altTextContent = getAltText(altText, caption);

  if (img) {
    const {
      src: imgSrc = null,
      0: dtImage = null,
      1: tImage = null,
      2: mImage = null,
    } = img;
    const dataSrc = imgSrc || mImage.src || url;
    return (
      <div className={`c-image-component ${imageMarginBottom || ''}`}>
        <div className={`image-component-image ${ampPage ? 'amp' : ''}`}>
          <>
            {!ampPage ? (
              <LazyLoad
                placeholder={<img src={placeholder} style={{ width: '100%' }} data-placeholder={true} data-src={dataSrc} alt={altTextContent}
                className={`${teaseContentType ? 'tease-image' : ''} ${additionalClasses}`} />}
                height="100%"
                width="100%"
                once={true}>
                {useSrcSet && srcSetSizes.length ? (
                  <picture className={teaseContentType ? 'tease-image' : ''}>
                    <source srcSet={dtImage.src} media="(min-width: 1200px)" />
                    <source srcSet={tImage.src} media="(min-width: 768px)" />
                    <img src={mImage.src} alt={altTextContent} />
                  </picture>
                ) : (
                  <img
                    src={dataSrc}
                    alt={altTextContent}
                    className={`${teaseContentType ? 'tease-image' : ''} ${additionalClasses}`}
                    onClick={onClickRun}
                  />
                )}
              </LazyLoad>
            ) : (
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
            {teaseContentType && getTeaseIcon(teaseContentType)}
          </>
          {imageType !== 'isHomepageImage' && renderCaption()}
        </div>
        {imageType !== 'isHomepageImage' && <p className="photo-credit-text">{giveCredit}</p>}
      </div>
    );
  }
  return null;
};
Image.propTypes = {
  src: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  imageMarginBottom: PropTypes.string,
  imageType: PropTypes.oneOf(['isLeadImage', 'isInlineImage', 'isHomepageImage', 'isGalleryImage']).isRequired,
  maxTabletViewWidth: PropTypes.number,
  teaseContentType: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ampPage: PropTypes.bool,
  onClickRun: PropTypes.func,
  customScrollContainerEl: PropTypes.string,
  useSrcSet: PropTypes.bool,
  srcSetSizes: PropTypes.array,
  additionalClasses: PropTypes.string,
};
export default Image;
