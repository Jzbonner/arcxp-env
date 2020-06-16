const isHome = 'home-basic';
const isArticle = 'article-basic';
const isSection = 'section';

const taboolaHeaderScript = (layout = '', cdnLink) => {
  let taboolaCatType;
  if (layout === isArticle) {
    taboolaCatType = 'article';
  } else if (layout.includes(isSection)) {
    taboolaCatType = 'category';
  } else if (layout === isHome) {
    taboolaCatType = 'home';
  }
  return `window._taboola = window._taboola || [];
    _taboola.push({${taboolaCatType}:'auto'});
    !function (e, f, u, i) {
      if (!document.getElementById(i)) {
        e.async = 1;
        e.src = u;
        e.id = i;
        f.parentNode.insertBefore(e, f);
      }
    }(document.createElement('script'),
    document.getElementsByTagName('script')[0],
    '${cdnLink}',
    'tb_loader_script');
    if (window.performance && typeof window.performance.mark == 'function') {
      window.performance.mark('tbl_ic');
    }`;
};

const taboolaFooterScript = (layout = '', moapPTD, boapPTD, siteName) => {
  if (layout === isHome && siteName.toLowerCase() === 'ajc') {
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

const taboolaModuleScript = (layout, container, placement) => {
  let containerName;
  let placementName;
  if (layout === isArticle) {
    containerName = container;
    placementName = placement;
  } else if (layout.includes(isSection)) {
    containerName = `${container}---section-fronts`;
    placementName = `${placement} - Section Fronts`;
  } else if (layout === isHome) {
    containerName = `${container}---home-page`;
    placementName = `${placement} - Home Page`;
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
