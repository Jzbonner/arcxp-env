const taboolaHeaderScript = (type) => {
  let taboolaCatObj = {};
  let taboolaScript;
  const partialScript = `window._taboola = window._taboola || [];
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
  if (type === 'story' || type === 'blog') {
    taboolaCatObj = `taboolaCatObj = {
       article: 'auto' 
    };`;
    taboolaScript = `
    let ${taboolaCatObj}
    ${partialScript}`;
  } else if (type === 'section') {
    taboolaCatObj = `taboolaCatObj = { 
      category: 'auto' 
    };`;
    taboolaScript = `
    let ${taboolaCatObj}
    ${partialScript}`;
  } else if (type === 'home') {
    taboolaCatObj = `taboolaCatObj = { 
      home: 'auto' 
    };`;
    taboolaScript = `
    let ${taboolaCatObj}
    ${partialScript}`;
  }
  return taboolaScript;
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
                     console.error('taboola visible called');
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
                   console.error('taboola render called');
                     PostRelease.Start({
                       ptd: ${moapPTD}
                     });
                     renderedMoap = true;
                 }
              }
          });`;
  }
  return `window._taboola = window._taboola || [];
_taboola.push({flush: true});`;
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
  return `window._taboola = window._taboola || []; _taboola.push(
    { mode: 'thumbnails-feed-4x1', container: '${containerName}',placement: '${placementName}',target_type: 'mix'});`;
};

export { taboolaHeaderScript, taboolaFooterScript, taboolaModuleScript };