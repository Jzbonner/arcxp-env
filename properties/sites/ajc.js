import adsBidding from './adsBidding/ajc.com.json';
import adsTxt from './adstxt/ajc.com.json';
import appAdsTxt from './appadstxt/ajc.com.json';

export default {
  defaultSiteTitle: 'AJC',
  siteTag: 'ajc',
  cdnOrg: 'ajc',
  cdnSite: 'ajc',
  dfpId: '21849707860',
  siteDomainURL: 'https://www.ajc.com',
  siteNavHierarchy: 'TopNavRedesign',
  websiteURL: 'https://www.ajc.com',
  twitterURL: 'https://twitter.com/intent/tweet?url=',
  facebookURL: 'https://www.facebook.com/share.php?u=',
  instagramURL: '//instagram.com/ajcnews',
  breakingNewsID: 'USNZPBNLV5EULFTENZZP52ECZQ',
  breakingLiveVideoID: '2UPLSZACARBEVG2PQVZLQLO7D4',
  breakingNewsID_sandbox: 'FFQQGJZMN5A3RHYWFUIESE3RYI',
  breakingLiveVideoID_sandbox: 'PI5DD6OFEVFMHNDHZKI3XU7SSQ',
  domainTwitterURL: 'https://twitter.com/ajc',
  domainFacebookURL: 'https://facebook.com/ajc',
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
  adsTxt,
  appAdsTxt,
  nativoMoapTag: 'https://amp.ajc.com/amp/ntv',
  taboola: {
    sandbox: {
      moapPTD: '1114521',
      boapPTD: '1097469',
    },
    prod: {
      moapPTD: '1099909',
      boapPTD: '1099013',
    },
  },
  ads: {
    sandbox: {
      adsBidding,
      adsA9Enabled: false,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
      prebidJs: 'prebid3.23.0.js',
    },
    prod: {
      adsBidding,
      adsA9Enabled: false,
      adsA9Id: '3970',
      adsPrebidEnabled: false,
      adsPrebidTimeout: 1500,
      devconActive: true,
      devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
      prebidJs: 'prebid3.23.0.js',
    },
  },
  connext: {
    sandbox: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'stage',
      siteCode: 'AJC',
      configCode: 'AJC_STAGE_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      allowMeter: true,
    },
    prod: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'prod',
      configCode: 'AJC_PROD_DEFAULT',
      siteCode: 'AJC',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      allowMeter: false,
    },
  },
  video: {
    sandbox: {
      cmsId: 2531688,
    },
    prod: {
      cmsId: 2528054,
    },
  },
};
