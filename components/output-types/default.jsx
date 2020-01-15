import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';

const DefaultOutputType = (props) => {
  const {
    arcSite = getProperties().sites[0], children, contextPath, deployment, CssLinks, Fusion, Libs, MetaTags,
  } = props;
  return (
    <html>
      <head>
        <title>Fusion Article</title>
        <MetaTags />
        <Libs />
        <CssLinks />
        <script type='text/javascript' dangerouslySetInnerHTML={{
          __html: `let taboolaCatObj = {
            article:'auto'
          };
          if (location.pathname === '/' && 'article' !== 'home') {
            taboolaCatObj = {home:'auto'};
          }
          window._taboola = window._taboola || [];
          _taboola.push(taboolaCatObj);
          !function (e, f, u, i) {
            if (!document.getElementById(i)){
              e.async = 1;
              e.src = u;
              e.id = i;
              f.parentNode.insertBefore(e, f);
            }
          }(document.createElement('script'),
          document.getElementsByTagName('script')[0],
          '//cdn.taboola.com/libtrc/cox-network/loader.js',
          'tb_loader_script');
          if(window.performance && typeof window.performance.mark == 'function')
            {window.performance.mark('tbl_ic');}`,
        }}>
        </script>
        <link rel="stylesheet" href={deployment(`${contextPath}/resources/dist/${arcSite}/css/style.css`)} />
        <link rel="icon" type="image/x-icon" href={deployment(`${contextPath}/resources/favicon.ico`)} />
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </head>
      <body>
        <div id="fusion-app">{children}</div>
        <Fusion />
        <script type='text/javascript' dangerouslySetInnerHTML={{
          __html: `
          window._taboola = window._taboola || [];
          _taboola.push({flush: true});
                    let renderedBoap = false;
                    let renderedMoap = false;
                    _taboola.push({
                      listenTo: 'visible',
                      handler: function (e) {
                         if (typeof PostRelease !== 'undefined' && !renderedBoap) {
                               console.error('taboola visible called');
                             PostRelease.Start({
                               ptd: [
                                     1110597,1099013,//ajc qa/prod
                                     1058525,//ddn prod
                                     1058553,//jn prod
                                     1099904,1053969,//sns qa/prod
                                     1058554// dayton prod
                                 ]
                             });
                             renderedBoap = true;
                         }
                      }
                    },
                    {
                        listenTo: 'render',
                        handler: function (e) {
                           if (typeof PostRelease !== 'undefined' && !renderedMoap) {
                             console.error('taboola render called');
                               PostRelease.Start({
                                 ptd: [
                                       1110596,1099909,//ajc qa/prod
                                       1087799,//ddn prod
                                       1087801,//jn prod
                                       1099905,1100010,//sns qa/prod
                                       1087800// dayton prod
                                   ]
                               });
                               renderedMoap = true;
                           }
                        }
                    });
                `,
        }}>
        </script>
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
