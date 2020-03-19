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
    // if we don't have an instance yet create one
    // console.error('dave, check adInstance', this.adInstance, 'params', params);
    if (!this.adInstance) {
      this.adInstance = new ArcAds({
        dfp: { id: dfpID, collapseEmptyDivs: true },
        bidding,
      }, (event) => {
        // callback (after each ad load) which will hide slots with an empty dfp response
        if (!event.isEmpty) {
          const slotId = event.slot.getSlotElementId();
          document.querySelector(`#${slotId}`).style.display = 'block';
          if (slotId.indexOf('PG01') > -1) {
            window.pg01 = event.slot;
            // console.error('dave (pg01)', event.slot, window.pg01);
          }
        }
      });
    }

    if (params && params.slotName === 'PG01' && window.pg01) {
      // this is a subsequent call to the gallery ads, so destroy the slot before it's re-registered
      // not doing this results in NOTHING happening, since the slot already exists on the page
      window.googletag.destroySlots([window.pg01]);
      // console.error('dave, subsequent gallery call', window.pg01);
    }

    // register the ad with the ArcAds library
    this.adInstance.registerAd(params);
  }
}
