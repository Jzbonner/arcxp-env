import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import SiteMeta from '../../_helper_components/global/siteMeta/default';
import SiteMetrics from '../../_helper_components/global/siteMetrics/default';
import SophiTags from '../../_helper_components/global/sophi/default';
import ConnextInit from '../../_helper_components/global/connext/default.jsx';
import NativoScripts from '../../_helper_components/article/nativo/nativoScripts';
import checkTags from '../../layouts/_helper_functions/checkTags';
import checkPageType from '../../layouts/_helper_functions/getPageType.js';
import AmpRelLink from '../../_helper_components/amp/AmpRelLink';
import GoogleStructuredData from '../../_helper_components/article/googleData/default';
import fetchEnv from '../../_helper_components/global/utils/environment';
import gtmScript from '../helper_functions/gtmScript';
import getContentMeta from '../../_helper_components/global/siteMeta/_helper_functions/getContentMeta';
import handleSiteName from '../../layouts/_helper_functions/handleSiteName';

const RenderOutputType = (props) => {
  const {
    arcSite: arcSiteFromProps = getProperties().sites[0], children, contextPath, CssLinks, deployment, Fusion, globalContent, Libs, MetaTags, layout, outputType,
  } = props;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentSite = arcSite || arcSiteFromProps;
  const currentEnv = fetchEnv();
  const {
    metrics, ads, connext, cdnSite, fbPagesId,
  } = getProperties(currentSite) || {};

  const {
    adsA9Enabled, adsPrebidEnabled, devconActive, devconKey, prebidJs,
  } = ads[currentEnv] || {};
  const { isEnabled: connextIsEnabled = false, environment: connextEnv } = connext[currentEnv] || {};
  const {
    type = null, canonical_url: articleURL, canonical_website: website, promo_items: promoItems,
  } = globalContent || {};
  let hasLeadGallery = false;
  if (type === 'story') {
    hasLeadGallery = promoItems?.basic?.type === 'gallery';
  }
  const pageType = checkPageType(type, layout);
  const { isNonContentPage } = pageType || {};
  const contentMeta = getContentMeta() || {};
  const { topics = [], contentId = '', darkMode } = contentMeta;
  const noAds = checkTags(topics, 'no-ads') || (outputType && outputType === 'sq3perfbaseline');
  const noAmp = checkTags(topics, 'no-amp');
  const includeGtm = metrics && metrics.gtmContainerKey;
  const isZeus = outputType && outputType === 'zeus';
  let fullPathDomain = layout.indexOf('wrap-') !== -1 ? `https://www.${cdnSite || currentSite}.com` : '';
  /* eslint-disable-next-line max-len */
  fullPathDomain = ['dayton-daily-news', 'springfield-news-sun'].indexOf(cdnSite) > -1 ? fullPathDomain.replace(/-/g, '') : fullPathDomain;
  return (
    <html lang='en'>
      <head>
        {isZeus && <>
            <script dangerouslySetInnerHTML={{
              __html: 'window.zeusAdUnitPath = "/{{gamId}}/{{slotId}}/";',
            }}></script>
            <script src={`https://${handleSiteName(currentSite)}${currentEnv === 'sandbox' ? '-test' : ''}.zeustechnology.io/main.js`} async='true'></script>
        </>}
        <MetaTags />
        <SiteMeta />
        <GoogleStructuredData {...props} />
        {!hasLeadGallery && <AmpRelLink type={type} noAmp={noAmp} site={website || cdnSite || currentSite} url={articleURL || '/'} />}
        <link rel="preload" href={`${fullPathDomain}${deployment(`${contextPath}/resources/dist/fonts/gorditaregular-webfont.woff2`)}`} as="font" type="font/woff2" />
        <link rel="preload" href={`${fullPathDomain}${deployment(`${contextPath}/resources/dist/fonts/gorditabold-webfont.woff2`)}`} as="font" type="font/woff2" />
        <link rel="preload" href={`${fullPathDomain}${deployment(`${contextPath}/resources/dist/fonts/gorditamedium-webfont.woff2`)}`} as="font" type="font/woff2" />
        <link rel="preload" href={`${fullPathDomain}${deployment(`${contextPath}/resources/dist/fonts/Lora-Regular.ttf`)}`} as="font" type="font/ttf" />

        <CssLinks />
        {currentSite && <>
          <link rel="stylesheet" href={`${fullPathDomain}${deployment(`${contextPath}/resources/dist/${currentSite}/css/style.css`)}`} />
          <link rel="stylesheet" href={`${fullPathDomain}${deployment(`${contextPath}/resources/dist/${currentSite}-${isNonContentPage ? 'pb' : 'content'}/css/style.css`)}`} />
        </>}
        <SophiTags />
        {includeGtm && (
          <>
            <SiteMetrics />
            {/* Google Tag Manager */}
            <script
              dangerouslySetInnerHTML={{
                /* eslint-disable-next-line max-len */
                __html: gtmScript(arcSite, metrics.gtmContainerKey),
              }}
            ></script>
            {/* End Google Tag Manager */}
          </>
        )}
        {!noAds && !isZeus && <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>}
        {!noAds && !isZeus && adsA9Enabled && <script src="https://c.amazon-adsystem.com/aax2/apstag.js"></script>}
        {!noAds && !isZeus && adsPrebidEnabled && <script src={`${fullPathDomain}${deployment(`${contextPath}/resources/scripts/${prebidJs}`)}`}></script>}
        <Libs />
        {!noAds && <NativoScripts tags={topics} uuid={contentId} layout={layout} currentSite={currentSite} />}
        {!noAds && <script src={`${fullPathDomain}${deployment(`${contextPath}/resources/scripts/nativo.js`)}`}></script>}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:pages" content={fbPagesId} />
      </head>
      <body>
        {includeGtm && (
          /* Google Tag Manager (noscript) */
          <noscript
            dangerouslySetInnerHTML={{
              /* eslint-disable-next-line max-len */
              __html: `<iframe src='https://www.googletagmanager.com/ns.html?id=${metrics.gtmContainerKey}' height='0' width='0' style='display:none;visibility:hidden'></iframe>`,
            }}
          ></noscript>
          /* End Google Tag Manager (noscript) */
        )}
        <script dangerouslySetInnerHTML={{
          __html:
          `(function() { try { var mode = localStorage.getItem('${arcSite}_dark-mode'); var
          supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
          === true; if ((${darkMode} && mode === 'enabled' || ${darkMode} && !mode && supportDarkMode)) document.body.classList.add('dark-mode');
          if (!mode) return;
          } catch (e) {} })();`,
        }} />
        <div id="fusion-app">{children}</div>
        <Fusion />
        {connextIsEnabled && (
          <>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script src={`https://loader-cdn.azureedge.net/${connextEnv}/ajc/loader.min.js`}></script>
            <script src={`${fullPathDomain}${deployment(`${contextPath}/resources/scripts/customJSForNavigaAdBlocker.js`)}`}></script>
            <ConnextInit triggerLoginModal={outputType && outputType === 'login'} />
          </>
        )}
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>
        {devconActive && <script id="ns_script_dc" data-key={devconKey || '2a1556f7-d788-4b8b-943a-dd77f5f0d472'} data-e="5" src="//includemodal.global.ssl.fastly.net/sp.js"></script>}
      </body>
    </html>
  );
  /* eslint-enable */
};

RenderOutputType.propTypes = {
  arcSite: PropTypes.string,
  children: PropTypes.node,
  contextPath: PropTypes.string,
  CssLinks: PropTypes.func,
  deployment: PropTypes.func,
  Fusion: PropTypes.func,
  globalContent: PropTypes.object,
  hyperlocalTags: PropTypes.object,
  metrics: PropTypes.object,
  layout: PropTypes.string,
  outputType: PropTypes.string,
  Libs: PropTypes.func,
  MetaTags: PropTypes.func,
};

export default RenderOutputType;
