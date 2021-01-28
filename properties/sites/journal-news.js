import adsBidding from './adsBidding/journal-news.com.json';
import adsTxt from './adstxt/journal-news.com.json';
import appAdsTxt from './appadstxt/journal-news.com.json';

export default {
  dfp_id: 21849707860,
  fbPagesId: '210895530407',
  fbAppId: '1747383545520530',
  siteName: 'journal-news',
  cdnOrg: 'coxohio',
  cdnSite: 'journal-news',
  siteDomainURL: 'https://www.journal-news.com',
  websiteURL: 'https://www.journal-news.com',
  websiteLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/DK42MHKQZRA7PFSGW7YUX4A4DQ.png',
  googleLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/DK42MHKQZRA7PFSGW7YUX4A4DQ.png',
  orgName: 'Journal News',
  domainTwitterURL: 'https://twitter.com/journalnews',
  twitterURL: 'https://twitter.com/intent/tweet?url=',
  domainFacebookURL: 'https://www.facebook.com/journalnews',
  facebookURL: 'https://www.facebook.com/share.php?u=',
  domainPinterestURL: '',
  pinterestURL: 'https://www.pinterest.com/pin/create/button/?url=',
  pinterestShareLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.coxohio/NDGCHKDQUNDTLL5XSWQJMKNZIA.png',
  domainRedditURL: '',
  redditURL: 'https://www.reddit.com/submit?url=',
  footerLogo: '/resources/logos/JournalNews/logo-full.svg',
  logo: '/resources/logos/JournalNews/logo-full.svg',
  logoShort: '/resources/logos/JournalNews/logo-short.svg',
  logoHamburger: '/resources/logos/JournalNews/logo-mobile-hamburger.svg',
  logoPlaceholder: '/resources/logos/JournalNews/placeholder.svg',
  logoOgImage: '/resources/logos/JournalNews/logo-ogimage.png',
  mail: 'mailto:?Subject=',
  sites: ['journal-news'],
  breakingNewsID: 'FIQH7IEKK5H5LHRAII5AY7VDCU',
  breakingLiveVideoID: '52EEYZZB6BDYZDOFFNPJBO2ZJA',
  breakingNewsID_sandbox: 'BYPUKOTQLRAMLDYR5C3XLJOVZQ',
  breakingLiveVideoID_sandbox: 'A4KCYNGXMBGHRF6JABDFEHFFCE',
  domainBlockerTracking: 'https://rtwa.journal-news.com',
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
  weatherLocationId: 330109,
  taboola: {
    dataPublisher: 'cox-journal-news',
    taboolaStoryID: 'taboola-journal-news-custom-feed',
    taboolaSectionID: 'taboola-journal-news-custom-feed---section-fronts',
    cdnLink: '//cdn.taboola.com/libtrc/cox-journal-news/loader.js',
    containerName: 'taboola-journal-news-custom-feed',
    placementName: 'Journal News Custom Feed',
    sandbox: {
      boapPTD: '1118366',
      moapPTD: '1118367',
    },
    prod: {
      boapPTD: '1058553',
      moapPTD: '1087801',
    },
  },
  nativo: {
    sandbox: {
      lazyLoad: true,
    },
    prod: {
      lazyLoad: false,
    },
  },
  metrics: {
    siteID: 'journalnews',
    siteMetro: 'oh: dayton',
    siteFormat: 'news',
    gtmContainerKey: 'GTM-NNFL6V6',
    ampGtmID: 'GTM-T46L3LB',
  },
  adsPath: 'dayton_np/jnws_web_default',
  favicon: '/resources/icons/favicons/Ohio/journal-news-favicon.ico',
  appleIcon: '/resources/icons/appleTouch/ohio/JN-AppleTouch-152x152-2.png',
  adsTxt,
  appAdsTxt,
  nativoMoapTag: 'https://amp.journal-news.com/amp/ntv',
  ads: {
    sandbox: {
      adsBidding,
      adsA9Enabled: true,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      devconActive: false,
      devconKey: '',
    },
    prod: {
      adsBidding,
      adsA9Enabled: false,
      adsA9Id: '3970',
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
      siteCode: 'JN',
      configCode: 'JN_STAGE_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      pubParam: 'JN',
    },
    prod: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'prod',
      siteCode: 'JN',
      configCode: 'JN_PROD_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      pubParam: 'JN',
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
