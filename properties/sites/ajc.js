import adstxt from './adstxt/ajc.com.json';
import appadstxt from './appadstxt/ajc.com.json';

export default {
  defaultSiteTitle: 'AJC',
  siteTag: 'ajc',
  cdnOrg: 'ajc',
  cdnSite: 'ajc',
  dfpId: '21849707860',
  siteDomainURL: 'https://www.ajc.com',
  twitterURL: 'https://twitter.com/intent/tweet?url=',
  facebookURL: 'https://www.facebook.com/share.php?u=',
  instagramURL: '//instagram.com/ajcnews',
  metrics: {
    siteID: 'ajc',
    siteMetro: 'ga: atlanta',
    siteFormat: 'news',
    gtmContainerKey: 'GTM-WT4CBT7',
    ampGtmID: 'GTM-WQBXD72',
  },
  featuredVideoPlayerRules: {
    startPlaying: true,
    muteON: true,
    autoplayNext: true,
  },
  inlineVideoPlayerRules: {
    startPlaying: false,
    muteON: true,
    autoplayNext: true,
  },
  weatherPageURL: '/atlanta-weather/',
  adsPath: 'atlanta_np/ajc_web_default',
  adsTxt: adstxt,
  appAdsTxt: appadstxt,
  adsA9Enabled: true,
  adsA9Id: '3970',
  adsPrebidEnabled: true,
  adsPrebidTimeout: 1500,
  devconActive: true,
  devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
};
