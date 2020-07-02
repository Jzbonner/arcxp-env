import React, { useState, useEffect } from 'react';
import { useFusionContext } from 'fusion:context';
import PropTypes from 'prop-types';
import Caption from '../caption/default.jsx';
import checkWindowSize from '../utils/check_window_size/default';
import './default.scss';
import imageResizer from '../../../layouts/_helper_functions/Thumbor';
import getAltText from '../../../layouts/_helper_functions/getAltText';
import getTeaseIcon from './_helper_functions/getTeaseIcon';
import placeholder from '../../../../resources/images/placeholder.svg';


const Image = ({
  width, height, src, imageMarginBottom, imageType, maxTabletViewWidth, teaseContentType, ampPage = false,
}) => {
  const {
    url, height: originalHeight, width: originalWidth, caption, credits, alt_text: altText,
  } = src || {};
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const [imageSrc, setImageSrc] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setImageSrc(imageResizer(url, arcSite, width, height));
  }, []);

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
              style={ loaded ? {} : { display: 'none' }}
              alt={getAltText(altText, caption)}
              className={teaseContentType ? 'tease-image' : ''}
              onLoad={() => setLoaded(true)}/>
            <img src={placeholder}
              style={ loaded ? { display: 'none' } : { width: '100%' }}/>
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
