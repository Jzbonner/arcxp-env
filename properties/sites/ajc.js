import adsTxt from './adstxt/ajc.com.json';
import appAdsTxt from './appadstxt/ajc.com.json';

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
  ads: {
    sandbox: {
      adsA9Enabled: false,
      adsA9Id: '3970',
      adsPrebidEnabled: true,
      adsPrebidTimeout: 1500,
      adsPrebidSizeConfig: [
        {
          mediaQuery: '(min-width: 972px)',
          sizesSupported: [
            [300, 250],
            [300, 600],
          ],
          labels: ['desktop'],
        },
        {
          mediaQuery: '(min-width: 972px)',
          sizesSupported: [
            [970, 250],
            [728, 90],
          ],
          labels: ['desktop1'],
        },
        {
          mediaQuery: '(min-width: 972px)',
          sizesSupported: [
            [728, 90],
          ],
          labels: ['desktop2'],
        },
        {
          mediaQuery: '(min-width: 768px) and (max-width: 971px)',
          sizesSupported: [
            [300, 250],
            [300, 600],
          ],
          labels: ['tablet'],
        },
        {
          mediaQuery: '(min-width: 768px) and (max-width: 971px)',
          sizesSupported: [
            [728, 90],
          ],
          labels: ['tablet1'],
        },
        {
          mediaQuery: '(min-width: 0px) and (max-width: 767px)',
          sizesSupported: [
            [320, 250],
          ],
          labels: ['phone'],
        },
        {
          mediaQuery: '(min-width: 0px) and (max-width: 767px)',
          sizesSupported: [
            [320, 50],
          ],
          labels: ['phone1'],
        },
      ],
      devconActive: false,
      devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
    },
    prod: {
      adsA9Enabled: false,
      adsA9Id: '3970',
      adsPrebidEnabled: false,
      adsPrebidTimeout: 1500,
      adsPrebidSizeConfig: [
        {
          mediaQuery: '(min-width: 972px)',
          sizesSupported: [
            [300, 250],
            [300, 600],
          ],
          labels: ['desktop'],
        },
        {
          mediaQuery: '(min-width: 972px)',
          sizesSupported: [
            [970, 250],
            [728, 90],
          ],
          labels: ['desktop1'],
        },
        {
          mediaQuery: '(min-width: 972px)',
          sizesSupported: [
            [728, 90],
          ],
          labels: ['desktop2'],
        },
        {
          mediaQuery: '(min-width: 768px) and (max-width: 971px)',
          sizesSupported: [
            [300, 250],
            [300, 600],
          ],
          labels: ['tablet'],
        },
        {
          mediaQuery: '(min-width: 768px) and (max-width: 971px)',
          sizesSupported: [
            [728, 90],
          ],
          labels: ['tablet1'],
        },
        {
          mediaQuery: '(min-width: 0px) and (max-width: 767px)',
          sizesSupported: [
            [320, 250],
          ],
          labels: ['phone'],
        },
        {
          mediaQuery: '(min-width: 0px) and (max-width: 767px)',
          sizesSupported: [
            [320, 50],
          ],
          labels: ['phone1'],
        },
      ],
      devconActive: true,
      devconKey: '2a1556f7-d788-4b8b-943a-dd77f5f0d472',
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
