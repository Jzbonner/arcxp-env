import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import ArcAdLib from './children/ArcAdLib';

const AdSetup = ({
  id, slotName, dimensions, display, breakpoints, refresh, targeting, className, prerender, dfpId,
}) => {
  const appContext = useAppContext();
  const { isAdmin } = appContext;
  if (prerender) {
    window.arcAdsPrerenderer = adDetails => new Promise((resolve) => {
      prerender.adDetails();
      resolve(adDetails);
    });
  }

  // console.log('INNER COMPONENT', dfpId);

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
        prerender: window.arcAdsPrerenderer || null,
      },
      dfpId,
    );
  }

  if (isAdmin && dimensions[0][0] !== 1) {
    return <div style={{
      background: '#efefef',
      fontSize: '30px',
      color: '#000',
      border: '1px solid #000',
      padding: '20px',
      width: 'auto',
    }}>{slotName} placeholder</div>;
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
  dfpId: PropTypes.string,
};

AdSetup.defaultProps = {
  dimensions: [1, 1],
};

export default AdSetup;
