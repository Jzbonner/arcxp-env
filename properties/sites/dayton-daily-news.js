import adsBidding from './adsBidding/daytondailynews.com.json';
import adsTxt from './adstxt/daytondailynews.com.json';
import appAdsTxt from './appadstxt/daytondailynews.com.json';
import blacklist from './mostReadBlacklist/daytondailynews.com.json';

export default {
  dfp_id: 21849707860,
  fbPagesId: '168815400507',
  fbAppId: '1509059885983561',
  siteName: 'dayton-daily-news',
  siteFullname: 'Dayton Daily News',
  cdnOrg: 'coxohio',
  cdnSite: 'dayton-daily-news',
  siteDomainURL: 'https://www.daytondailynews.com',
  websiteURL: 'https://www.daytondailynews.com',
  websiteLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/V5MMRTL6OBFBFBNB3N4HBFITLQ.png',
  googleLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/coxohio/V5MMRTL6OBFBFBNB3N4HBFITLQ.png',
  orgName: 'Dayton Daily News',
  domainTwitterURL: 'https://twitter.com/DDNInvestigates',
  twitterURL: 'https://twitter.com/intent/tweet?url=',
  domainFacebookURL: 'https://www.facebook.com/daytondailynews',
  facebookURL: 'https://www.facebook.com/share.php?u=',
  domainPinterestURL: 'https://www.pinterest.com/daytondailynews/',
  pinterestURL: 'https://www.pinterest.com/pin/create/button/?url=',
  pinterestShareLogo: 'https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.coxohio/F3BEA52S7FDWBAOHYAHT6BV4PQ.png',
  domainRedditURL: 'https://www.reddit.com/domain/daytondailynews.com/',
  redditURL: 'https://www.reddit.com/submit?url=',
  footerLogo: '/resources/logos/DaytonDailyNews/logo-full.svg',
  logo: '/resources/logos/DaytonDailyNews/logo-full.svg',
  logoRedesign: '/resources/logos/DaytonDailyNews/logo-full.svg',
  logoShort: '/resources/logos/DaytonDailyNews/logo-short.svg',
  logoHamburger: '/resources/logos/DaytonDailyNews/logo-mobile-hamburger.svg',
  logoPlaceholder: '/resources/logos/DaytonDailyNews/placeholder.svg',
  logoOgImage: '/resources/logos/DaytonDailyNews/logo-ogimage.png',
  mail: 'mailto:?Subject=',
  sites: ['dayton-daily-news'],
  breakingNewsID: 'WTQBLH3PYBFTNC2KW3EVREG5OA',
  breakingLiveVideoID: 'ONIHRIDEANDIJD2AX2WWO3NUQA',
  breakingNewsID_sandbox: 'BDA3AIXKOBAMNPZ6GIWW7IXPD4',
  breakingLiveVideoID_sandbox: 'D5V3Q4JLGNFSJCNS3BN4V4XPGI',
  domainBlockerTracking: 'https://rtwa.daytondailynews.com',
  weatherLocationId: 330120,
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
  taboola: {
    dataPublisher: 'cox-daytondailynews',
    taboolaStoryID: 'taboola-dayton-daily-news-custom-feed',
    taboolaSectionID: 'taboola-dayton-daily-news-custom-feed---section-fronts',
    cdnLink: '//cdn.taboola.com/libtrc/cox-daytondailynews/loader.js',
    containerName: 'taboola-dayton-daily-news-custom-feed',
    placementName: 'Dayton Daily News Custom Feed',
    sandbox: {
      boapPTD: '1118358',
      moapPTD: '1118359',
    },
    prod: {
      boapPTD: '1058525',
      moapPTD: '1087799',
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
    siteID: 'daytondaily',
    siteMetro: 'oh: dayton',
    siteFormat: 'news',
    gtmContainerKey: 'GTM-KMZK96C',
    ampGtmID: 'GTM-T46L3LB',
  },
  adsPath: 'dayton_np/ddn_web_default',
  favicon: '/resources/icons/favicons/Ohio/dayton-daily-news-favicon.ico',
  appleIcon: '/resources/icons/appleTouch/ohio/DDN-AppleTouch-152x152-2.png',
  adsTxt,
  appAdsTxt,
  nativoMoapTag: 'https://amp.daytondailynews.com/amp/ntv',
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
      siteCode: 'DN',
      configCode: 'DN_STAGE_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      allowMeter: true,
      pubParam: 'DDN',
      activateUrl: 'https://test-subscribe.daytondailynews.com/',
      activateAmpPaywallUrl: 'https://test-subscribe.daytondailynews.com/startgwamp',
      activateAmpInlineUrl: 'https://test-subscribe.daytondailynews.com/startamp',
    },
    prod: {
      isEnabled: true,
      clientCode: 'ajc',
      environment: 'prod',
      siteCode: 'DN',
      configCode: 'DN_PROD_DEFAULT',
      debug: false,
      tagManager: 'GTM',
      containerId: 'GTM-W3VLHBK',
      pubParam: 'DDN',
      activateUrl: 'https://subscribe.daytondailynews.com/',
      activateAmpPaywallUrl: 'https://subscribe.daytondailynews.com/startgwamp',
      activateAmpInlineUrl: 'https://subscribe.daytondailynews.com/startamp',
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
  chartbeat: {
    blacklist,
    host: 'daytondailynews.com',
  },
};
