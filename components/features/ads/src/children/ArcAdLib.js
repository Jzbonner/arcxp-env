import { ArcAds } from 'arcads';

/**
 * Create an instance of the arc ads library to keep track of all the
 * ads that are being registered for DFP
 * https://github.com/washingtonpost/ArcAds
 * */
export default class ArcAdLib {
  static instance;

  /**
   * Return the single instance of ArcAds library
   *
   * @return {ArcAdLib} the static instance of ArcAds library
   * */
  static getInstance() {
    if (ArcAdLib.instance == null) {
      ArcAdLib.instance = new ArcAdLib();
    }
    return ArcAdLib.instance;
  }

  /**
   * Trying to put this intance of the ad on the page
   *
   * @param {Object} params the ad parameters
   * @param {Number} dfpID the google ads DFP ID
   * @param {Object} bidding and prebid information
   */
  registerAd(params, dfpID, bidding) {
    if (!this.adInstance) {
      this.adInstance = new ArcAds({
        dfp: { id: dfpID, collapseEmptyDivs: true },
        bidding,
      }, (event) => {
        if (event.slot.getSlotElementId().indexOf('HS01') > -1 && event.isEmpty && window && window.HS02SlotConfig) {
          // HS01 is empty, so we register HS02 (which was prevented from registering in components/features/ads/src/index.js)
          // see https://ajc.atlassian.net/browse/APD-123 for more details/info
          const hs02Config = window.HS02SlotConfig;
          this.adInstance.registerAd(hs02Config[0], hs02Config[1], hs02Config[2]);
        }
        if (!event.isEmpty) {
          const slotId = event.slot.getSlotElementId();
          const slotDiv = document ? document.querySelector(`#${slotId}`) : null;
          if (slotDiv) {
            slotDiv.style.display = 'block';
          }
          if (slotId.indexOf('PG01') > -1 && window) {
            window.pg01 = event.slot;
          }
          if (slotId.indexOf('WCC01') > -1) {
            const evt = new Event('WCC01_Flighted');
            document.dispatchEvent(evt);
          }
        }
      });
      window.arcBiddingReady = true;
    }

    if (params && params.name === 'PG01' && window && window.pg01) {
      window.googletag.destroySlots([window.pg01]);
    }
    // register the ad with the ArcAds library
    this.adInstance.registerAd(params);
  }
}
