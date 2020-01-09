import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArcAdLib from './children/arcAdLib';

const AdSetup = ({
  id, slotName, dimensions, display, breakpoints, adType, refresh, targeting, dfpId, bidding, className, prerender,
}) => {
  window.arcAdsPrerenderer = adDetails => new Promise((resolve) => {
    if (prerender) {
      prerender.adDetails();
    }
    resolve(adDetails);
  });

  const instance = ArcAdLib.getInstance();
  if (instance) {
    instance.registerAd(
      {
        id,
        slotName,
        dimensions,
        adType,
        display,
        targeting,
        sizemap: {
          breakpoints,
          refresh,
        },
        bidding,
        prerender: window.arcAdsPrerenderer,
      },
      dfpId,
      bidding,
    );
  }

  return (
    <div className={className}>
      <div id={id} className={`${slotName} arcad`} />
    </div>
  );
};

AdSetup.propTypes = {
  id: PropTypes.string, // unique ID for this ad
  dfpId: PropTypes.number, // publishing DFP id number
  children: PropTypes.node, // any values you want to go inside the ad container
  childrenPosition: PropTypes.oneOf(['top', 'bottom']), // position of any children that go inside the ad container
  className: PropTypes.string, // class styles for the ad container
  slotName: PropTypes.string.isRequired, // slot name for this ad
  dimensions: PropTypes.array, // the reponsive ad sizes for the different breakpoints
  display: PropTypes.oneOf(['mobile', 'desktop', 'all']), // the type of ad this is for
  breakpoints: PropTypes.array, // the different screen sizes to use as breakpoints
  refresh: PropTypes.bool, // whether or not to refresh the ad for mobile breakpoint changes
  adType: PropTypes.string, // the type of ad
  targeting: PropTypes.object, // key/value pairs attached to the ad request
  bidding: PropTypes.object, // info about the bidding vendors
  prerender: PropTypes.func, // a function to fire before the ad loads
  isAmp: PropTypes.bool,
};

AdSetup.defaultProps = {
  dimensions: [0, 0],
};

export default AdSetup;
