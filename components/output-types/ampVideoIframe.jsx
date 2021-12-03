import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import SiteMeta from '../_helper_components/global/siteMeta/default';
import SiteMetrics from '../_helper_components/global/siteMetrics/default';
import checkTags from '../layouts/_helper_functions/checkTags';

const AmpVideoIframeOutputType = (props) => {
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
    metrics,
    devconActive,
    devconKey,
  } = getProperties(currentSite) || {};

  const { taxonomy } = globalContent || { type: null };
  const { tags = [] } = taxonomy || {};
  const includeGtm = metrics && metrics.gtmContainerKey;
  const noAds = checkTags(tags, 'no-ads');

  return (
    <html lang = 'en'>
      <head>
        <MetaTags />
        <SiteMeta />
        <CssLinks />
        <script async src="https://cdn.ampproject.org/video-iframe-integration-v0.js"></script>
        {includeGtm && (
          <>
            <SiteMetrics />
            {/* Google Tag Manager */}
            <script dangerouslySetInnerHTML={{
              /* eslint-disable-next-line max-len */
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${metrics.gtmContainerKey}');`,
            }}></script>
            {/* End Google Tag Manager */}
          </>
        )}
        {!noAds && <script async src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'></script>}
        <Libs />
        {currentSite && <link rel="stylesheet" href={deployment(`${contextPath}/resources/dist/${currentSite}/css/style.css`)} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
        {devconActive && <script id='ns_script_dc'
          data-key={devconKey || '2a1556f7-d788-4b8b-943a-dd77f5f0d472'}
          data-e='5'
          src='//includemodal.global.ssl.fastly.net/sp.js'>
          </script>}
      </body>
    </html>
  );
};

AmpVideoIframeOutputType.propTypes = {
  arcSite: PropTypes.string,
  children: PropTypes.node,
  contextPath: PropTypes.string,
  CssLinks: PropTypes.object,
  deployment: PropTypes.func,
  Fusion: PropTypes.func,
  globalContent: PropTypes.object,
  metrics: PropTypes.object,
  Libs: PropTypes.array,
  MetaTags: PropTypes.object,
};

export default AmpVideoIframeOutputType;
