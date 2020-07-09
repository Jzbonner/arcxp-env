import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import ArcAdLib from './children/ArcAdLib';

const AdSetup = ({
  id, slotName, adSlotNameForArcAds, dimensions, display, breakpoints, refresh, targeting, bidding, className, prerender, dfpId,
}) => {
  const { adsA9Enabled, adsA9Id, adsPrebidEnabled } = getProperties();
  if (prerender && typeof window !== 'undefined') {
    window.arcAdsPrerenderer = adDetails => new Promise((resolve) => {
      prerender.adDetails();
      resolve(adDetails);
    });
  }
  const name = slotName;

  useEffect(() => {
    const instance = ArcAdLib.getInstance();
    const windowWidth = window.outerWidth;
    if (instance) {
      let adIsGood = null;
      let hasDimensionsMatch = false;
      let bpTarget;
      if (windowWidth >= 1024) {
        bpTarget = 1024;
      } else if (windowWidth >= 768) {
        bpTarget = 768;
      } else {
        bpTarget = 0;
      }
      breakpoints.forEach((breakpoint, i) => {
        const bpSizes = dimensions[i];
        const bpWidth = breakpoint[0];
        if (windowWidth >= bpWidth) {
          // do not consolidate the following test cases... they must be checked in order, to respect breakpoint sizemappings
          if (bpWidth === bpTarget && bpSizes && bpSizes.length > 0) {
            // the ad is specified and has sizes for this breakpoint, so ensure it gets rendered
            adIsGood = true;
            hasDimensionsMatch = true;
          } else if (bpWidth === bpTarget && (!bpSizes || bpSizes.length === 0)) {
            // the ad is specifically excluded at this breakpoint, so ensure it does not render
            adIsGood = false;
            hasDimensionsMatch = true;
          } else if (!adIsGood && !hasDimensionsMatch && bpSizes && bpSizes.length > 0) {
            // the ad is specified and has sizes at a non-matching breakpoint (e.g. 768+ for 1024 bp) so render it
            adIsGood = true;
            hasDimensionsMatch = true;
          } else if (!adIsGood && !hasDimensionsMatch && (!bpSizes || bpSizes.length === 0)) {
            // the ad is excluded at a non-matching breakpoint, so do not render it (e.g. 768+ override for MP0x ads)
            adIsGood = false;
            hasDimensionsMatch = true;
          }
        } else {
          // window is smaller than the breakpoint, so just ignore it
        }
      });
      if (adIsGood) {
        /*
          we store the slot config in an array so that we don't have to duplicate it...
          since we reference the same output twice: for the `HS02SlotConfig` object, and in teh registerAd call
        */
        const adSlotConfig = [
          {
            id,
            slotName: adSlotNameForArcAds,
            name,
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
          {
            amazon: {
              enabled: adsA9Enabled,
              id: adsA9Id,
            },
            prebid: {
              enabled: adsPrebidEnabled,
              sizeConfig: [
                {
                  mediaQuery: '(min-width: 972px)',
                  sizesSupported: [
                    [300, 250],
                    [300, 600],
                  ],
                  labels: ['desktop'],
                },
                {
                  mediaQuery: '(min-width: 972px)',
                  sizesSupported: [
                    [970, 250],
                    [728, 90],
                  ],
                  labels: ['desktop1'],
                },
                {
                  mediaQuery: '(min-width: 972px)',
                  sizesSupported: [
                    [728, 90],
                  ],
                  labels: ['desktop2'],
                },
                {
                  mediaQuery: '(min-width: 768px) and (max-width: 971px)',
                  sizesSupported: [
                    [300, 250],
                    [300, 600],
                  ],
                  labels: ['tablet'],
                },
                {
                  mediaQuery: '(min-width: 768px) and (max-width: 971px)',
                  sizesSupported: [
                    [728, 90],
                  ],
                  labels: ['tablet1'],
                },
                {
                  mediaQuery: '(min-width: 0px) and (max-width: 767px)',
                  sizesSupported: [
                    [320, 250],
                  ],
                  labels: ['phone'],
                },
                {
                  mediaQuery: '(min-width: 0px) and (max-width: 767px)',
                  sizesSupported: [
                    [320, 50],
                  ],
                  labels: ['phone1'],
                },
              ],
            },
          },
        ];
        // there are matching sizes for this bp, so proceed (ads that do NOT have bp-relevant dimensions are ignored)
        if (slotName === 'HS02') {
          // we exclude HS02 from being registered because it is dependent upon the rendering of HS01 (see ./children/ArcAdLib.js)
          window.HS02SlotConfig = adSlotConfig;
        } else {
          instance.registerAd(adSlotConfig[0], adSlotConfig[1], adSlotConfig[2]);
        }
      }
    }
  }, []);

  return (
    <div className={className}>
      <div id={id} className={`${slotName} arcad b-margin-bottom-d40-m20`} />
      {slotName === 'HP02' ? <div className='hp-interscroller__placeholder full-width'></div> : ''}
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
  adSlotNameForArcAds: PropTypes.string.isRequired, // slot name for this ad, to be passed to arc ads (i.e. `topSection` value)
};

AdSetup.defaultProps = {
  dimensions: [1, 1],
};

export default AdSetup;
