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
import CustomMetricsScript from '../../_helper_components/global/abBlockDetection/helper_components/CustomMetricsScript';

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
    type = null, taxonomy, canonical_url: articleURL, canonical_website: website, _id: uuid, promo_items: promoItems,
  } = globalContent || {};
  let hasLeadGallery = false;
  if (type === 'story') {
    hasLeadGallery = promoItems?.basic?.type === 'gallery';
  }
  const pageType = checkPageType(type, layout);
  const { isNonContentPage } = pageType || {};

  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');
  const noAmp = checkTags(tags, 'no-amp');
  const includeGtm = metrics && metrics.gtmContainerKey;
  let fullPathDomain = layout.indexOf('wrap-') !== -1 ? `https://www.${cdnSite || currentSite}.com` : '';
  /* eslint-disable-next-line max-len */
  fullPathDomain = ['dayton-daily-news', 'springfield-news-sun'].indexOf(cdnSite) > -1 ? fullPathDomain.replace(/-/g, '') : fullPathDomain;

  return (
    <html>
      <head>
        <MetaTags />
        <SiteMeta />
        <GoogleStructuredData {...props} />
        {!hasLeadGallery && <AmpRelLink type={type} noAmp={noAmp} site={website} url={articleURL} />}
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
              type="text/javascript"
              dangerouslySetInnerHTML={{
                /* eslint-disable-next-line max-len */
                __html: gtmScript(arcSite, metrics.gtmContainerKey),
              }}
            ></script>
            {/* End Google Tag Manager */}
          </>
        )}
        {!noAds && <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>}
        {!noAds && adsA9Enabled && <script src="https://c.amazon-adsystem.com/aax2/apstag.js"></script>}
        {!noAds && adsPrebidEnabled && <script src={`${fullPathDomain}${deployment(`${contextPath}/resources/scripts/${prebidJs}`)}`}></script>}
        <Libs />
        {!noAds && <NativoScripts tags={tags} uuid={uuid} layout={layout} currentSite={currentSite} />}
        {!noAds && <script type="text/javascript" src={`${fullPathDomain}${deployment(`${contextPath}/resources/scripts/nativo.js`)}`}></script>}
        <script type="text/javascript" src={`${fullPathDomain}${deployment(`${contextPath}/resources/scripts/NavigaAdBlockSlider.js`)}`}></script>
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
        <div id="fusion-app">{children}</div>
        <Fusion />
        {connextIsEnabled && (
          <>
            {/* eslint-disable-next-line max-len */}
            <script type="text/javascript" crossOrigin="true" src="https://polyfill.io/v3/polyfill.min.js?flags=gated&amp;features=es5%2CCustomEvent%2CArray.from%2CArray.isArray%2CArray.prototype.filter%2CArray.prototype.find%2CArray.prototype.findIndex%2CArray.prototype.forEach%2CArray.prototype.indexOf%2CArray.prototype.keys%2CArray.prototype.lastIndexOf%2CArray.prototype.map%2CArray.prototype.reduce%2CDate.prototype.toISOString%2CDocumentFragment%2CDocumentFragment.prototype.append%2CDocumentFragment.prototype.prepend%2CElement%2CElement.prototype.after%2CElement.prototype.append%2CElement.prototype.before%2CElement.prototype.classList%2CElement.prototype.cloneNode%2CElement.prototype.closest%2CElement.prototype.dataset%2CElement.prototype.matches%2CElement.prototype.placeholder%2CElement.prototype.prepend%2CElement.prototype.remove%2CElement.prototype.replaceWith%2CElement.prototype.toggleAttribute%2CEvent%2CJSON%2CMap%2CNumber.parseInt%2CNumber.parseFloat%2CObject.assign%2CObject.create%2CObject.defineProperties%2CObject.defineProperty%2CObject.entries%2CObject.getOwnPropertyDescriptor%2CObject.getOwnPropertyNames%2CObject.is%2CObject.keys%2CObject.values%2CPromise%2CPromise.prototype.finally%2CSet%2CString.prototype.trim%2CXMLHttpRequest%2Cdocument.getElementsByClassName%2Cdocument.currentScript%2Cdocument.querySelector%2Cfetch%2CgetComputedStyle%2ClocalStorage%2CArray.prototype.some%2CDate.now%2CEvent.focusin%2CEventSource%2CFunction.prototype.bind%2CFunction.prototype.name%2CHTMLDocument%2CNodeList.prototype.forEach%2CNodeList.prototype.%40%40iterator%2CNode.prototype.contains%2CObject.getPrototypeOf%2CObject.setPrototypeOf%2CRegExp.prototype.flags%2CString.prototype.%40%40iterator%2CString.prototype.startsWith%2CString.prototype.endsWith%2Cconsole%2Cconsole.debug%2Cconsole.error%2Cconsole.info%2Cconsole.log%2Cdocument%2Cdocument.head%2Cdocument.visibilityState%2Clocation.origin%2CrequestIdleCallback%2Cscreen.orientation%2CmatchMedia%2CURL"></script>
            <script type="text/javascript" src={`${fullPathDomain}${deployment(`${contextPath}/src/js/naviga/${connextEnv}/Connext.min.js`)}`}></script>
            <link rel="stylesheet" href={`${fullPathDomain}${deployment(`${contextPath}/src/js/naviga/${connextEnv}/Connext.min.css`)}`} />
            <script type="text/javascript" src={`${fullPathDomain}${deployment(`${contextPath}/src/js/naviga/${connextEnv}/fp.min.js`)}`}></script>
            <script type="text/javascript" src={`${fullPathDomain}${deployment(`${contextPath}/src/js/naviga/${connextEnv}/g2i.min.js`)}`}></script>
            <ConnextInit triggerLoginModal={outputType && outputType === 'login'} />
          </>
        )}
        {outputType !== 'amp' && (
          <>
            <CustomMetricsScript />
          </>
        )}
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>
        {devconActive && <script id="ns_script_dc" data-key={devconKey || '2a1556f7-d788-4b8b-943a-dd77f5f0d472'} data-e="5" src="//includemodal.global.ssl.fastly.net/sp.js" type="text/javascript"></script>}
      </body>
    </html>
  );
  /* eslint-enable */
};

RenderOutputType.propTypes = {
  arcSite: PropTypes.string,
  children: PropTypes.node,
  contextPath: PropTypes.string,
  CssLinks: PropTypes.object,
  deployment: PropTypes.func,
  Fusion: PropTypes.func,
  globalContent: PropTypes.object,
  hyperlocalTags: PropTypes.object,
  metrics: PropTypes.object,
  layout: PropTypes.string,
  outputType: PropTypes.string,
  Libs: PropTypes.array,
  MetaTags: PropTypes.object,
};

export default RenderOutputType;
