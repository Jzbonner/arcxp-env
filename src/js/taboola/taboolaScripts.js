const taboolaHeaderScript = (type) => {
  let taboolaCatType;
  if (type === 'story' || type === 'blog') {
    taboolaCatType = 'article';
  } else if (type === 'section') {
    taboolaCatType = 'category';
  } else if (type === 'home') {
    taboolaCatType = 'home';
  }
  return `window._taboola = window._taboola || [];
    _taboola.push({
      ${taboolaCatType}: 'auto'
    });
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
    if (window.performance && typeof window.performance.mark == 'function') {
      window.performance.mark('tbl_ic');
    }`;
};

const taboolaFooterScript = (type, moapPTD, boapPTD) => {
  if (type === 'story' || type === 'blog') {
    return ` window._taboola = window._taboola || [];
      _taboola.push({flush: true});
      let renderedBoap = false;
      let renderedMoap = false;
      _taboola.push({
        listenTo: 'visible',
        handler: function (e) {
          if (typeof PostRelease !== 'undefined' && !renderedBoap) {
            PostRelease.Start({
              ptd: ${boapPTD}
            });
            renderedBoap = true;
          }
        }
      },
      {
        listenTo: 'render',
        handler: function (e) {
          if (typeof PostRelease !== 'undefined' && !renderedMoap) {
            PostRelease.Start({
              ptd: ${moapPTD}
            });
            renderedMoap = true;
          }
        }
      });`;
  }
  return 'window._taboola = window._taboola || []; _taboola.push({flush: true});';
};

const taboolaModuleScript = (type) => {
  let containerName;
  let placementName;
  if (type === 'story' || type === 'blog') {
    containerName = 'taboola-ajc-custom-feed';
    placementName = 'AJC Custom Feed';
    // next two cases are a work in progress will be dependent on architecture
  } else if (type === 'section') {
    containerName = 'taboola-ajc-custom-feed--sction-fronts';
    placementName = 'AJC Custom Feed - Section Fronts';
  } else if (type === 'homepage') {
    containerName = 'taboola-ajc-custom-feed--home-page';
    placementName = 'AJC Custom Feed - Home Page';
  }
  return `window._taboola = window._taboola || [];
    _taboola.push({
      mode: 'thumbnails-feed-4x1',
      container: '${containerName}',
      placement: '${placementName}',
      target_type: 'mix'
    });`;
};

export { taboolaHeaderScript, taboolaFooterScript, taboolaModuleScript };
