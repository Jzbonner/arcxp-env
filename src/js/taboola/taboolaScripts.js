const taboolaHeaderScript = `let taboolaCatObj = {
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
    {window.performance.mark('tbl_ic');}`;

const taboolaFooterScript = (type) => {
  if (type === 'story' || type === 'blog') {
    return ` window._taboola = window._taboola || [];
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
                         ]
                     });
                     renderedMoap = true;
                 }
              }
          });`;
  }
  return `window._taboola = window._taboola || [];
_taboola.push({flush: true});`;
};

export { taboolaHeaderScript, taboolaFooterScript };
