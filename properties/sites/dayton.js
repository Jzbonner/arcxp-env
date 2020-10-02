import adsBidding from './adsBidding/dayton.com.json';
import adsTxt from './adstxt/dayton.com.json';
import appAdsTxt from './appadstxt/dayton.com.json';

export default {
  dfp_id: 21849707860,
  fbPagesId: '1431445090472096',
  siteName: 'dayton',
  cdnOrg: 'coxohio',
  cdnSite: 'dayton',
  siteDomainURL: 'https://www.dayton.com',
  websiteURL: 'https://www.dayton.com',
  websiteLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/YRHUB5MLSRHN3GFTFUEH36LH4M.png',
  googleLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/YRHUB5MLSRHN3GFTFUEH36LH4M.png',
  orgName: 'Dayton',
  domainTwitterURL: 'https://www.twitter.com/daytondotcom',
  twitterURL: 'https://twitter.com/intent/tweet?url=',
  domainFacebookURL: 'https://www.facebook.com/daytondotcom',
  facebookURL: 'https://www.facebook.com/share.php?u=',
  domainPinterestURL: 'https://www.pinterest.com/daytondotcom/',
  pinterestURL: 'https://www.pinterest.com/pin/create/button/?url=',
  pinterestShareLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.coxohio/2L4CESVBVRBE7M2XATT7PR3IZ4.png',
  domainRedditURL: 'https://www.reddit.com/domain/dayton.com/',
  redditURL: 'https://www.reddit.com/submit?url=',
  footerLogo: '/resources/logos/Dayton/logo-full.svg',
  logo: '/resources/logos/Dayton/logo-full.svg',
  logoShort: '/resources/logos/Dayton/logo-short.svg',
  logoHamburger: '/resources/logos/Dayton/logo-mobile-hamburger.svg',
  logoPlaceholder: '/resources/logos/Dayton/placeholder.svg',
  logoOgImage: '/resources/logos/Dayton/logo-ogimage.png',
  mail: 'mailto:?Subject=',
  sites: ['dayton'],
  breakingNewsID: '3FTP2S6SRVFG7M3T2VUKR7B2CY',
  breakingLiveVideoID: 'NSVDX4ZQ7BEGHDFVFT26WQSOEE',
  breakingNewsID_sandbox: '63KAPZZLQRABDAB7I7PZ4KNYVA',
  breakingLiveVideoID_sandbox: 'VYXS5V6CBFEKFG6YEQ7YHU7BEE',
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
  weatherLocationId: 330120,
  taboola: {
    dataPublisher: 'cox-dayton',
    taboolaStoryID: 'taboola-dayton-custom-feed',
    taboolaSectionID: 'taboola-dayton-custom-feed---section-fronts',
    cdnLink: '//cdn.taboola.com/libtrc/cox-dayton/loader.js',
    containerName: 'taboola-dayton-custom-feed',
    placementName: 'Dayton Custom Feed',
    sandbox: {
      boapPTD: '1118362',
      moapPTD: '1118363',
    },
    prod: {
      boapPTD: '1058554',
      moapPTD: '1087800',
    },
  },
  metrics: {
    siteID: 'daytondotcom',
    siteMetro: 'oh: dayton',
    siteFormat: 'entertainment',
    gtmContainerKey: 'GTM-P72HT8T',
    ampGtmID: 'GTM-T46L3LB',
  },
  adsPath: 'dayton_np/daytoncom_web_default',
  favicon: '/resources/icons/favicons/Ohio/dayton-favicon.ico',
  adsTxt,
  appAdsTxt,
  nativoMoapTag: 'https://amp.dayton.com/amp/ntv',
  ads: {
    sandbox: {
      adsBidding,
      adsA9Enabled: false,
      adsA9Id: '',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '',
    },
    prod: {
      adsBidding,
      adsA9Enabled: false,
      adsA9Id: '',
      adsPrebidEnabled: false,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '',
    },
  },
  connext: {
    sandbox: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'stage',
      siteCode: 'DN',
      configCode: 'DAYTON_STAGE_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
    },
    prod: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'prod',
      siteCode: 'DN',
      configCode: 'DAYTON_PROD_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
    },
  },
  video: {
    sandbox: {
      cmsId: 2536851,
    },
    prod: {
      cmsId: 2536851,
    },
  },
};
