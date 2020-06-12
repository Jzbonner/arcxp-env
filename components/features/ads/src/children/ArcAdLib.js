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
        if (!event.isEmpty) {
          const slotId = event.slot.getSlotElementId();
          const slotDiv = document ? document.querySelector(`#${slotId}`) : null;
          if (slotDiv) {
            slotDiv.style.display = 'block';
          }
          if (slotId.indexOf('PG01') > -1 && window) {
            window.pg01 = event.slot;
          }
        }
      });
    }

    if (params && params.slotName === 'PG01' && window && window.pg01) {
      window.googletag.destroySlots([window.pg01]);
    }
    // register the ad with the ArcAds library
    this.adInstance.registerAd(params);
  }
}
