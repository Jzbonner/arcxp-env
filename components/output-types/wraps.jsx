import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import SiteMeta from '../_helper_components/global/siteMeta/default';
import SiteMetrics from '../_helper_components/global/siteMetrics/default';
import ConnextInit from '../_helper_components/global/connext/default.jsx';
import NativoScripts from '../_helper_components/article/nativo/nativoScripts';
import checkTags from '../layouts/_helper_functions/checkTags';
import checkSponsor from '../layouts/_helper_functions/checkSponsor';
import handleSiteName from '../layouts/_helper_functions/handleSiteName';
import AmpRelLink from '../_helper_components/amp/AmpRelLink';
import GoogleStructuredData from '../_helper_components/article/googleData/default';
import fetchEnv from '../_helper_components/global/utils/environment';
import getDomain from '../layouts/_helper_functions/getDomain';
import gtmScript from './helper_functions/gtmScript';

const WrapOutputType = (props) => {
  const {
    arcSite: arcSiteFromProps = getProperties().sites[0],
    children,
    contextPath,
    deployment,
    Fusion,
    globalContent,
    Libs,
    MetaTags,
    layout,
    Resource,
  } = props;

  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentSite = arcSite || arcSiteFromProps;
  const currentEnv = fetchEnv();
  const {
    metrics,
    adsA9Enabled,
    adsPrebidEnabled,
    devconActive,
    devconKey,
    connext,
    cdnSite,
    cdnOrg,
    fbPagesId,
  } = getProperties(currentSite) || {};

  const { isEnabled: connextIsEnabled = false, environment: connextEnv } = connext[currentEnv] || {};
  const {
    type, taxonomy, canonical_url: articleURL, _id: uuid, promo_items: promoItems,
  } = globalContent || { type: null };
  const { tags = [], sections } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');
  const noAmp = checkTags(tags, 'no-amp');
  const { sponsorSectionID: isSponsoredContent } = checkSponsor(sections);
  const includeGtm = metrics && metrics.gtmContainerKey;
  const fullPathDomain = layout.indexOf('wrap-') !== -1 ? `https://www.${handleSiteName(cdnSite) || handleSiteName(currentSite)}.com` : '';
  let hasLeadGallery = false;
  if (type === 'story') {
    hasLeadGallery = promoItems?.basic?.type === 'gallery';
  }
  /* eslint-disable-next-line max-len */

  const parseCss = ({ data }) => {
    if (!data) return null;
    const css = data.replace(/url\(([^\s<>{}|\\^~)'"`]+)\)/g, (_, uri) => {
      // any url that starts with a `..`
      const trimmedUri = uri ? uri.replace(/\.\.\//g, '') : uri;
      const parsedUrl = `${getDomain(layout, cdnSite, cdnOrg, arcSite)}${trimmedUri}`;
      return `url(${deployment(parsedUrl)})`;
    });
    return <style dangerouslySetInnerHTML={{ __html: css }}></style>;
  };
  const mainCssData = <Resource path={'resources/dist/ajc/css/style.css'} encoding='utf8'>
  {({ data }) => parseCss(data)}
  </Resource>;
  const pbCssData = <Resource path={'resources/dist/ajc-pb/css/style.css'} encoding='utf8'>
  {({ data }) => parseCss(data)}
  </Resource>;

  return (
    /* eslint-disable */
    <html lang='en'>
      <head>
        <MetaTags />
        <SiteMeta />
        <GoogleStructuredData />
        {!hasLeadGallery && <AmpRelLink type={type} url={articleURL} noAmp={noAmp} />}
        {includeGtm && (
          <>
            <SiteMetrics />
            {/* Google Tag Manager */}
            <script dangerouslySetInnerHTML={{
              /* eslint-disable-next-line max-len */
              __html: gtmScript(arcSite),
            }}></script>
            {/* End Google Tag Manager */}
          </>
        )}
        {!noAds && <script async src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'></script>}
        {!noAds && adsA9Enabled && <script src='https://c.amazon-adsystem.com/aax2/apstag.js'></script>}
        {!noAds && adsPrebidEnabled
          && <script src={`${fullPathDomain}${deployment(`${contextPath}/resources/scripts/prebid3.23.0.js`)}`}></script>}
        <Libs />
        {!noAds && !isSponsoredContent
          && <NativoScripts tags={tags} uuid={uuid} layout={layout} currentSite={currentSite} />
        }
        {mainCssData}
        {pbCssData}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:pages" content={fbPagesId} />
      </head>
      <body>
        {includeGtm && (
          /* Google Tag Manager (noscript) */
          <noscript dangerouslySetInnerHTML={{
            /* eslint-disable-next-line max-len */
            __html: `<iframe src='https://www.googletagmanager.com/ns.html?id=${metrics.gtmContainerKey}' height='0' width='0' style='display:none;visibility:hidden'></iframe>`,
          }}></noscript>
          /* End Google Tag Manager (noscript) */
        )}
        <div id="fusion-app">{children}</div>
        <Fusion />
        {connextIsEnabled && (
          <>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script src={`https://loader-cdn.azureedge.net/${connextEnv}/ajc/loader.min.js`}></script>
            <ConnextInit />
          </>
        )}
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>
        {devconActive && <script id='ns_script_dc'
          data-key={devconKey || '2a1556f7-d788-4b8b-943a-dd77f5f0d472'}
          data-e='5'
          src='//includemodal.global.ssl.fastly.net/sp.js'>
          </script>}
      </body>
    </html>
  );
  /* eslint-enable */
};

WrapOutputType.propTypes = {
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
  Libs: PropTypes.array,
  MetaTags: PropTypes.object,
  Resource: PropTypes.func,
  Styles: PropTypes.object,
};

export default WrapOutputType;
