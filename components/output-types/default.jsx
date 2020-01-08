import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { ArcAds } from 'arcads';

const DefaultOutputType = (props) => {
  const {
    arcSite = getProperties().sites[0], children, contextPath, deployment, CssLinks, Fusion, Libs, MetaTags,
  } = props;

  const arcAds = new ArcAds({
    dfp: {
      id: '21849707860'
    }
  });

  return (
    <html>
      <head>
        <title>Fusion Article</title>
        <MetaTags />
        <Libs />
        <CssLinks />
        <link rel="stylesheet" href={deployment(`${contextPath}/resources/dist/${arcSite}/css/style.css`)} />
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <script type="text/javascript">{arcAds}</script>
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <Fusion />
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
};

export default DefaultOutputType;
