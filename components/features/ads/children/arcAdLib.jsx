import { ArcAds } from "arcads"; // eslint-disable-line

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
   */
  registerAd(params, dfpID) {
    // if we don't have an instance yet create one
    if (!this.adInstance) {
      this.adInstance = new ArcAds({
        dfp: { id: dfpID },
      });
    }

    // register the ad with the ArcAds library
    this.adInstance.registerAd(params);
  }
}
