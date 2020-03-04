import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { fbPagesId, connext } from 'fusion:environment';
import SiteMeta from '../_helper_components/global/siteMeta/default';
import ConnextInit from '../_helper_components/global/connext/default.jsx';
import TaboolaFooter from '../features/taboolaFeed/taboolaFooter.jsx';
import TaboolaHeader from '../features/taboolaFeed/taboolaHeader.jsx';
import NativoScripts from '../_helper_components/article/nativo/nativoScripts';

const DefaultOutputType = (props) => {
  const {
    arcSite = getProperties().sites[0], children, contextPath, deployment, CssLinks, Fusion, Libs, MetaTags, globalContent,
  } = props;
  const { isEnabled = false, clientCode, environment } = connext;
  const { type } = globalContent || { type: null };

  return (
    <html>
      <head>
        <title>{arcSite}</title>
        <MetaTags />
        <SiteMeta />
        <Libs />
        <CssLinks />
        <NativoScripts />
        {type && <TaboolaHeader type={type} />}
        <link rel="stylesheet" href={deployment(`${contextPath}/resources/dist/${arcSite}/css/style.css`)} />
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="fb:pages" content={fbPagesId} />
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <Fusion />
        {type && <TaboolaFooter type={type} />}
        {isEnabled && (
          <>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script type="text/javascript" src={`https://loader-cdn.azureedge.net/${environment}/${clientCode}/loader.min.js`}></script>
            <script async src="https://d328y0m0mtvzqc.cloudfront.net/sandbox/powaBoot.js?org=ajc"></script>
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
  deployment: PropTypes.func,
  CssLinks: PropTypes.object,
  Fusion: PropTypes.func,
  Libs: PropTypes.array,
  MetaTags: PropTypes.object,
  globalContent: PropTypes.object,
};

export default DefaultOutputType;
