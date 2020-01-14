import React from 'react';
import PropTypes from 'fusion:prop-types';
import ArcAdLib from './children/arcAdLib';

const AdSetup = ({
  id, slotName, dimensions, breakpoints, refresh, targeting, className, prerender, dfpId,
}) => {
  window.arcAdsPrerenderer = adDetails => new Promise((resolve) => {
    if (prerender) {
      prerender.adDetails();
    }
    resolve(adDetails);
  });

  // console.log('INNER COMPONENT', dfpId);

  const instance = ArcAdLib.getInstance();
  if (instance) {
    instance.registerAd(
      {
        id,
        slotName,
        dimensions,
        targeting,
        sizemap: {
          breakpoints,
          refresh,
        },
        prerender: window.arcAdsPrerenderer,
      },
      dfpId,
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
  children: PropTypes.node, // any values you want to go inside the ad container
  className: PropTypes.string, // class styles for the ad container
  slotName: PropTypes.string.isRequired, // slot name for this ad
  dimensions: PropTypes.array, // the reponsive ad sizes for the different breakpoints
  breakpoints: PropTypes.array, // the different screen sizes to use as breakpoints
  refresh: PropTypes.bool, // whether or not to refresh the ad for mobile breakpoint changes
  targeting: PropTypes.object, // key/value pairs attached to the ad request
  prerender: PropTypes.func, // a function to fire before the ad loads
  dfpId: PropTypes.number,
};

AdSetup.defaultProps = {
  dimensions: [0, 0],
};

export default AdSetup;
