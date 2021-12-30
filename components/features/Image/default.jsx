import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import ImageGlobal from '../../_helper_components/global/image/default';
import fetchEnv from '../../_helper_components/global/utils/environment';
import handleSiteName from '../../layouts/_helper_functions/handleSiteName';
import './default.scss';

const Image = ({ customFields }) => {
  const appContext = useAppContext();
  const {
    arcSite,
    id: featureId,
    renderables,
  } = appContext;
  let isPartOfUbbn = false;
  let isPartOfLiveUpdates = false;
  let isPartOfLiveUpdateSnippets = false;
  if (renderables && renderables.length) {
    const chains = renderables.filter((item) => {
      const { collection } = item;
      return collection === 'chains';
    });
    if (chains.length) {
      chains.forEach((chain) => {
        const { children, props: chainProps } = chain || {};
        const imageFeature = children.filter(block => block.props.id === featureId);
        if (imageFeature) {
          if (chainProps.type === 'UBBN') {
            isPartOfUbbn = true;
          } else if (chainProps.type === 'LiveUpdatePageHeader') {
            isPartOfLiveUpdates = true;
          } else if (chainProps.type === 'LiveUpdateSnippets') {
            isPartOfLiveUpdateSnippets = true;
          }
        }
      });
    }
  }
  let src = customFields?.src;
  let srcMobile = customFields?.srcMobile;
  const {
    width,
    caption,
    credit,
    alt = '',
    link,
    label,
    explainerText,
    additionalText,
    doNotLazyLoad,
  } = customFields;

  if (!src) {
    return null;
  }

  let fetchedImage = null;

  const buildFullUrl = imgSrc => `https://${fetchEnv() !== 'prod' ? 'sandbox' : 'www'}.${handleSiteName(arcSite)}.com${imgSrc}`;

  const isAbsolute = src.indexOf('http') === 0 || src.indexOf('//') === 0;
  const isResizerOrAbsolute = /resizer/.test(src) || isAbsolute;

  if (!isAbsolute && /resizer/.test(src)) {
    src = buildFullUrl(src);
  }

  if (!isAbsolute && /resizer/.test(srcMobile)) {
    srcMobile = buildFullUrl(srcMobile);
  }

  let srcSetSizes = [
    [1600, 0],
    [800, 0],
    [400, 0],
  ];
  if (isPartOfUbbn) {
    srcSetSizes = [
      [1600, 856],
      [1100, 588],
      [475, 475],
    ];
  }
  if (isPartOfLiveUpdates) {
    srcSetSizes = [
      [1600, 278],
      [1100, 191],
      [475, 204],
    ];
  }
  if (isPartOfLiveUpdateSnippets) {
    // On smaller breakpoints the feature takes up a larger percentage of the screen.
    srcSetSizes = [
      [600, 338],
      [500, 282],
      [800, 451],
    ];
  }

  if (!isResizerOrAbsolute) {
    // it's neither a resizer nor an absolute url, so process it as a photo ID & fetch from content API
    fetchedImage = useContent({
      source: 'photo-center-api',
      query: {
        arcSite,
        id: src,
        useSrcSet: isPartOfUbbn || isPartOfLiveUpdates || isPartOfLiveUpdateSnippets,
        srcSetSizes,
      },
    });
    if (!fetchedImage) return null;
  }

  const credits = {
    affiliation: [{ name: credit }],
  };

  const getImage = () => {
    const isGif = src?.endsWith('.gif');
    let suppliedImgObj = null;
    /* we do some logic to know if we should supply `components/_helper_components/global/image/default.jsx` with an image array (to power the srcSet with desktop- and mobile- specific images) or single object. */
    if (isResizerOrAbsolute) {
      suppliedImgObj = src && srcMobile ? [
        {
          src, // desktop ("dtImage" on line 97)
        },
        {
          src, // tablet ("tImage" on line 98)
        },
        {
          src: srcMobile, // mobile ("mImage" on line 99)
        },
      ] : {
        src, // it's a single image, pass it to ImageGlobal
      };
    }

    const imageObj = isResizerOrAbsolute ? {
      resized_obj: isAbsolute ? suppliedImgObj : null,
      url: src,
      useSrcSet: !isGif,
      caption,
      credits,
      alt_text: alt,
    } : fetchedImage;

    if (!imageObj) return null;

    if (isPartOfUbbn || isPartOfLiveUpdates) {
      delete imageObj.caption;
      delete imageObj.credits;
    }

    return (
      <>
        {label && <div className="label">{label}</div>}
        {explainerText && <div className="explainerText">{explainerText}</div>}
        {imageObj && <ImageGlobal
          src={imageObj}
          imageType={!isPartOfUbbn && !isPartOfLiveUpdates && (caption || credit) ? 'isInlineImage' : 'isFeatureImage'}
          useSrcSet={!isGif || isPartOfUbbn || isPartOfLiveUpdates || isPartOfLiveUpdateSnippets}
          srcSetSizes={srcSetSizes}
          noLazyLoad={doNotLazyLoad}
        />}
        {additionalText && (
          <div className="additionalText">{additionalText}</div>
        )}
      </>
    );
  };

  if (!isResizerOrAbsolute && !fetchedImage) return null;

  return (
    <div className='c-image-feature b-margin-bottom-d40-m20' style={{ '--width': width }}>
      {link && <a href={link}>{getImage()}</a>}
      {!link && getImage()}
    </div>
  );
};

Image.propTypes = {
  customFields: PropTypes.shape({
    src: PropTypes.string.tag({
      name: 'Source',
      description:
        'Can be the resizer url from photo center (that starts with /resizer/), an absolute url or a photo ID (from photo center).',
    }).isRequired,
    srcMobile: PropTypes.string.tag({
      name: 'Source (Mobile)',
      description:
        'Optional, mobile-specific image.  Can be the resizer url from photo center, an absolute url or a photo ID (from photo center).',
    }),
    width: PropTypes.oneOf([
      '20%',
      '30%',
      '40%',
      '50%',
      '60%',
      '70%',
      '80%',
      '100%',
    ]).tag({
      name: 'Desktop Width',
      defaultValue: '100%',
      description:
        'Sets width on desktop. On tablet and mobile width will be set to 100%.',
    }),
    label: PropTypes.string.tag({
      name: 'Label',
    }),
    explainerText: PropTypes.richtext.tag({
      name: 'Explainer Text',
    }),
    additionalText: PropTypes.richtext.tag({
      name: 'Additional Text',
    }),
    alt: PropTypes.richtext.tag({
      name: 'Alt Text',
    }),
    caption: PropTypes.richtext.tag({
      name: 'Caption',
    }),
    credit: PropTypes.string.tag({
      name: 'Credit',
    }),
    link: PropTypes.string.tag({
      name: 'Image Link',
    }),
    doNotLazyLoad: PropTypes.bool.tag({
      label: 'Disable lazy load',
      description: 'Check this box to turn off lazy loading of this image.',
      value: '',
    }),
  }),
};

export default Image;
