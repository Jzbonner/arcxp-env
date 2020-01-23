import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { connext } from 'fusion:environment';
import ConnextInit from '../_helper_components/global/connext/default.jsx';
import TaboolaFooter from '../features/taboolaFeed/taboolaFooter.jsx';
import TaboolaHeader from '../features/taboolaFeed/taboolaHeader.jsx';


const DefaultOutputType = (props) => {
  const {
    arcSite = getProperties().sites[0],
    children,
    contextPath,
    deployment,
    CssLinks,
    Fusion,
    Libs,
    MetaTags,
    globalContent,
  } = props;
  const { isEnabled = false } = connext;
  const {
    type,
  } = globalContent;

  return (
    <html>
      <head>
        <title>Fusion Article</title>
        <MetaTags />
        <Libs />
        <CssLinks />
        <TaboolaHeader type={type}/>
        <link rel="stylesheet" href={deployment(`${contextPath}/resources/dist/${arcSite}/css/style.css`)} />
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <Fusion />
        <TaboolaFooter type ={type}/>
        {isEnabled && <>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
            <script type="text/javascript" src="https://loader-cdn.azureedge.net/stage/ajc/loader.min.js"></script>
            <ConnextInit />
          </>
        }
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
