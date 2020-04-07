import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { fbPagesId, connext } from 'fusion:environment';
import SiteMeta from '../_helper_components/global/siteMeta/default';
import ConnextInit from '../_helper_components/global/connext/default.jsx';
import TaboolaFooter from '../features/taboolaFeed/taboolaFooter.jsx';
import TaboolaHeader from '../features/taboolaFeed/taboolaHeader.jsx';
import NativoScripts from '../_helper_components/article/nativo/nativoScripts';
import checkTags from '../layouts/_helper_functions/checkTags';

const DefaultOutputType = (props) => {
  const {
    arcSite = getProperties().sites[0],
    children,
    contextPath,
    CssLinks,
    deployment,
    Fusion,
    globalContent,
    hyperlocalTags = getProperties().hyperlocalTags,
    Libs,
    MetaTags,
  } = props;
  const { isEnabled = false, clientCode, environment } = connext;
  const { type, taxonomy } = globalContent || { type: null };
  const { tags = [] } = taxonomy || {};
  const noAds = checkTags(tags, 'no-ads');
  const isHyperlocalContent = checkTags(tags, hyperlocalTags);

  return (
    <html>
      <head>
        <MetaTags />
        <SiteMeta />
        <Libs />
        <CssLinks />
        {!noAds && !isHyperlocalContent && <NativoScripts />}
        {!isHyperlocalContent && type && <TaboolaHeader type={type} />}
        <link rel="stylesheet" href={deployment(`${contextPath}/resources/dist/${arcSite}/css/style.css`)} />
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:pages" content={fbPagesId} />
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <Fusion />
        {!isHyperlocalContent && type && <TaboolaFooter type={type} />}
        {isEnabled && (
          <>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script type="text/javascript" src={`https://loader-cdn.azureedge.net/${environment}/${clientCode}/loader.min.js`}></script>
            <ConnextInit />
          </>
        )}
         <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v6.0"></script>
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
  Libs: PropTypes.array,
  MetaTags: PropTypes.object,
};

export default DefaultOutputType;
