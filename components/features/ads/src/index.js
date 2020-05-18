import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArcAdLib from './children/ArcAdLib';

const AdSetup = ({
  id, slotName, dimensions, display, breakpoints, refresh, targeting, bidding, className, prerender, dfpId,
}) => {
  if (prerender && typeof window !== 'undefined') {
    window.arcAdsPrerenderer = adDetails => new Promise((resolve) => {
      prerender.adDetails();
      resolve(adDetails);
    });
  }

  const instance = ArcAdLib.getInstance();
  if (instance) {
    instance.registerAd(
      {
        id,
        slotName,
        dimensions,
        display,
        targeting,
        sizemap: {
          breakpoints,
          refresh,
        },
        bidding,
        prerender: typeof window !== 'undefined' ? window.arcAdsPrerenderer : null,
      },
      dfpId,
      // {
      //   prebid: {
      //     enabled: true,
      //     sizeConfig: [
      //       {
      //         'mediaQuery': '(min-width: 1024px)',
      //         'sizesSupported': [
      //           [970, 250],
      //           [970, 90],
      //           [728, 90],
      //           [300, 250],
      //           [300, 600]
      //         ],
      //         'labels': ['desktop']
      //       },
      //       {
      //         'mediaQuery': '(min-width: 768px) and (max-width: 1023px)',
      //         'sizesSupported': [
      //           [728, 90],
      //           [728, 315],
      //           [300, 250],
      //           [300, 600]
      //         ],
      //         'labels': ['tablet']
      //       },
      //       {
      //         'mediaQuery': '(min-width: 0px)',
      //         'sizesSupported': [
      //           [320, 100],
      //           [320, 50]
      //         ],
      //         'labels': ['phone']
      //       }
      //     ]
      //   }
      // },
    );
  }

  return (
    <div className={className}>
      <div id={id} className={`${slotName} arcad b-margin-bottom-d40-m20`} />
    </div>
  );
};

AdSetup.propTypes = {
  id: PropTypes.string, // unique ID for this ad
  children: PropTypes.node, // any values you want to go inside the ad container
  className: PropTypes.string, // class styles for the ad container
  slotName: PropTypes.string.isRequired, // slot name for this ad
  dimensions: PropTypes.array, // the reponsive ad sizes for the different breakpoints
  display: PropTypes.string, // type of device ad should display on
  breakpoints: PropTypes.array, // the different screen sizes to use as breakpoints
  refresh: PropTypes.bool, // whether or not to refresh the ad for mobile breakpoint changes
  targeting: PropTypes.object, // key/value pairs attached to the ad request
  prerender: PropTypes.func, // a function to fire before the ad loads
  bidding: PropTypes.object, // bidding information. see https://github.com/washingtonpost/ArcAds#header-bidding
  dfpId: PropTypes.string,
};

AdSetup.defaultProps = {
  dimensions: [1, 1],
};

export default AdSetup;
