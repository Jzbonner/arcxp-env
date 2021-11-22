import React, { useEffect } from 'react';
import PropTypes from 'fusion:prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import fetchEnv from '../../../_helper_components/global/utils/environment';
import deferThis from '../../../_helper_components/global/utils/deferLoading';
import ArcAdLib from './children/ArcAdLib';
import '../default.scss';

const AdSetup = ({
  id, slotName, adSlotNameForArcAds, dimensions, display, breakpoints, refresh, targeting, bidding, className, prerender, dfpId, lazyLoad,
}) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { ads: adsProps } = getProperties(arcSite);
  const {
    adsA9Enabled,
    adsA9Id,
    adsPrebidEnabled,
    adsBidding,
    adsBreakpoints: adsBPs = [1280, 1024, 768, 0],
  } = adsProps[currentEnv] || {};
  const { adsPrebidSizeConfig } = adsBidding || {};
  if (prerender && typeof window !== 'undefined') {
    window.arcAdsPrerenderer = adDetails => new Promise((resolve) => {
      prerender.adDetails();
      resolve(adDetails);
    });
  }
  const name = slotName;
  const fullWidthAd = ['HP01', 'HP02', 'HS02', 'MP01', 'MP02', 'MP03', 'MP04', 'RP01', 'RP09', 'RP03'];

  const isStaffPage = typeof window !== 'undefined' ? window.location.href.search('/staff/') !== -1 : false;
  const borderTop = fullWidthAd.includes(name) && !isStaffPage ? <div className={`c-sectionHome border-top ${name}`}></div> : null;

  useEffect(() => {
    const instance = ArcAdLib.getInstance();
    const windowWidth = window.innerWidth;
    if (instance) {
      let adIsGood = null;
      let hasDimensionsMatch = false;
      let bpTarget;
      for (let i = 0; i < adsBPs.length; i += 1) {
        if (windowWidth >= adsBPs[i]) {
          bpTarget = adsBPs[i];
          break;
        }
      }
      let filteredDimensions = dimensions;
      let filteredBPs = breakpoints;
      breakpoints.forEach((breakpoint, i) => {
        const bpSizes = dimensions[i];
        const bpWidth = breakpoint[0];
        if (windowWidth >= bpWidth) {
          // do not consolidate the following test cases... they must be checked in order, to respect breakpoint sizemappings
          if (bpWidth === bpTarget && bpSizes && bpSizes.length > 0) {
            // the ad is specified and has sizes for this breakpoint, so ensure it gets rendered
            adIsGood = true;
            hasDimensionsMatch = true;
            /*
              Since the ad has a breakpoint-specific size array, we re-set the dimensions & bp arrays to _only_ the breakpoint-matching sizes and breakpoint.  This is specifically to correct the issue affecting HP02 (which spans all breakpoints) since ArcAds passes the full `dimensions` array to bidders, which results in bids (and ads) for sizes that don't match the current breakpoint.  See APD-344 for more details.
              They are added as nested arrays to match the nesting of the original arrays (which ArcAds expects).
            */
            filteredDimensions = [bpSizes];
            filteredBPs = [breakpoint];
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
          since we reference the same output twice: for the `HS02SlotConfig` object, and in the registerAd call
        */

        const adSlotConfig = [
          {
            id,
            slotName: adSlotNameForArcAds,
            name,
            dimensions: filteredDimensions,
            display,
            targeting,
            sizemap: {
              breakpoints: filteredBPs,
              refresh,
            },
            bidding,
            prerender: typeof window !== 'undefined' ? window.arcAdsPrerenderer : null,
          },
          dfpId,
          {
            amazon: {
              enabled: adsA9Enabled || false,
              id: adsA9Id || '',
            },
            prebid: {
              enabled: adsPrebidEnabled || false,
              config: { // baseline config, per prebid docs & arcads repo
                userSync: {
                  filterSettings: {
                    iframe: {
                      bidders: '*', // '*' means all bidders
                      filter: 'include',
                    },
                  },
                },
                sizeConfig: adsPrebidSizeConfig || [],
              },
            },
          },
        ];
        // there are matching sizes for this bp, so proceed (ads that do NOT have bp-relevant dimensions are ignored)
        if (slotName === 'HS02') {
          // we exclude HS02 from being registered because it is dependent upon the rendering of HS01 (see ./children/ArcAdLib.js)
          window.HS02SlotConfig = adSlotConfig;
        } else if (lazyLoad) {
          // this ad should not be loaded yet (most likely because we're waitig on connext or some other callback)
          deferThis({ ad: adSlotConfig });
        } else {
          instance.registerAd(adSlotConfig[0], adSlotConfig[1], adSlotConfig[2]);
        }
      }
    }
  }, []);

  return (
    <>
      <div className={className}>
        {borderTop}
        <div id={id} className={`${slotName} arcad b-margin-bottom-d40-m20`} />
        {slotName === 'HP02' ? <div className='hp-interscroller__placeholder full-width'></div> : ''}
      </div>
    </>
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
  lazyLoad: PropTypes.bool, // flag for lazyloading ads (e.g. connext/paywall)
};

AdSetup.defaultProps = {
  dimensions: [1, 1],
};

export default AdSetup;
