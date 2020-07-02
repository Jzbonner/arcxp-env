import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import { fbPagesId, connext } from 'fusion:environment';
import SiteMeta from '../_helper_components/global/siteMeta/default';
import SiteMetrics from '../_helper_components/global/siteMetrics/default';
import ConnextInit from '../_helper_components/global/connext/default.jsx';
import TaboolaFooter from '../_helper_components/global/taboola/taboolaFooter.jsx';
import TaboolaHeader from '../_helper_components/global/taboola/taboolaHeader.jsx';
import NativoScripts from '../_helper_components/article/nativo/nativoScripts';
import checkTags from '../layouts/_helper_functions/checkTags';
import checkSponsor from '../layouts/_helper_functions/checkSponsor';
import AmpRelLink from '../_helper_components/amp/AmpRelLink';
import GoogleStructuredData from '../_helper_components/article/googleData/default';

const DefaultOutputType = (props) => {
  const {
    arcSite: arcSiteFromProps = getProperties().sites[0],
    children,
    contextPath,
    CssLinks,
    deployment,
    Fusion,
    globalContent,
    Libs,
    MetaTags,
  } = props;
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentSite = arcSite || arcSiteFromProps;
  const {
    hyperlocalTags,
    metrics,
    adsA9Enabled,
    adsPrebidEnabled,
    devconActive,
    devconKey,
    favicon,
  } = getProperties(currentSite) || {};

  const { isEnabled: connextIsEnabled = false, clientCode, environment: connextEnv } = connext;
  const {
    type, taxonomy, canonical_url: articleURL, _id: uuid,
  } = globalContent || { type: null };
  const { tags = [], sections } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');
  const noAmp = checkTags(tags, 'no-amp');
  const isHyperlocalContent = checkTags(tags, hyperlocalTags);
  const { sponsorSectionID: isSponsoredContent } = checkSponsor(sections);
  const includeGtm = metrics && metrics.gtmContainerKey;

  return (
    <html>
      <head>
        <MetaTags />
        <SiteMeta />
        <GoogleStructuredData />
        <AmpRelLink type={type} url={articleURL} noAmp={noAmp} />
        <CssLinks />
        {includeGtm && (
          <>
            <SiteMetrics />
            {/* Google Tag Manager */}
            <script type='text/javascript' dangerouslySetInnerHTML={{
              /* eslint-disable-next-line max-len */
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${metrics.gtmContainerKey}');`,
            }}></script>
            {/* End Google Tag Manager */}
          </>
        )}
        {!noAds && <script async src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'></script>}
        {!noAds && adsA9Enabled && <script src='https://c.amazon-adsystem.com/aax2/apstag.js'></script>}
        {!noAds && adsPrebidEnabled && <script src={deployment(`${contextPath}/resources/scripts/prebid3.23.0.js`)}></script>}
        <Libs />
        {!noAds && !isHyperlocalContent && !isSponsoredContent && <NativoScripts tags={tags} uuid={uuid} />}
        {!isHyperlocalContent && <TaboolaHeader/>}
        {currentSite && <link rel="stylesheet" href={deployment(`${contextPath}/resources/dist/${currentSite}/css/style.css`)} />}
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}${favicon}`)} />
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
        {!isHyperlocalContent && <TaboolaFooter/>}
        {connextIsEnabled && (
          <>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script type="text/javascript" src={`https://loader-cdn.azureedge.net/${connextEnv}/${clientCode}/loader.min.js`}></script>
            <ConnextInit />
          </>
        )}
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>
        <script type="text/javascript" src={deployment(`${contextPath}/resources/scripts/weather.js`)} />
        {devconActive && <script id='ns_script_dc'
          data-key={devconKey || '2a1556f7-d788-4b8b-943a-dd77f5f0d472'}
          data-e='5'
          src='//includemodal.global.ssl.fastly.net/sp.js'
          type='text/javascript'></script>}
      </body>
    </html>
  );
};

DefaultOutputType.propTypes = {
  arcSite: PropTypes.string,
  children: PropTypes.node,
  contextPath: PropTypes.string,
  CssLinks: PropTypes.object,
  deployment: PropTypes.func,
  Fusion: PropTypes.func,
  globalContent: PropTypes.object,
  hyperlocalTags: PropTypes.object,
  metrics: PropTypes.object,
  Libs: PropTypes.array,
  MetaTags: PropTypes.object,
};

export default DefaultOutputType;
