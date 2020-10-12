const isHome = 'homepage';
const isArticle = 'article-basic';
const isSection = 'section';

const taboolaHeaderScript = (layout = '', cdnLink) => {
  let taboolaCatType;
  if (layout) {
    if (layout === isArticle) {
      taboolaCatType = 'article';
    } else if (layout.includes(isSection)) {
      taboolaCatType = 'category';
    } else if (layout.includes(isHome)) {
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
  }
  return null;
};

const taboolaFooterScript = (layout) => {
  if (layout) {
    return 'window._taboola = window._taboola || []; _taboola.push({flush: true});';
  }
  return null;
};

const taboolaModuleScript = (layout, container, placement, moapPTD, boapPTD, siteName, lazyLoadNativo) => {
  let containerName;
  let placementName;
  if (layout) {
    if (layout === isArticle) {
      containerName = container;
      placementName = placement;
      return `window._taboola = window._taboola || [];
      _taboola.push({flush: true});
      _taboola.push({
        mode: 'thumbnails-feed-4x1',
        container: '${containerName}',
        placement: '${placementName}',
        target_type: 'mix'
      });

      if (${lazyLoadNativo && moapPTD && boapPTD}) {
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
        });
      }`;
    }
    if (layout.includes(isSection)) {
      containerName = `${container}---section-fronts`;
      placementName = `${placement} - Section Fronts`;
    } else if (layout.includes(isHome)) {
      containerName = `${container}---home-page`;
      placementName = `${placement} - Home Page`;
    }
    return `window._taboola = window._taboola || [];
      _taboola.push({flush: true});
      _taboola.push({
        mode: 'thumbnails-feed-4x1',
        container: '${containerName}',
        placement: '${placementName}',
        target_type: 'mix'
      });`;
  }
  return null;
};

export {
  taboolaHeaderScript,
  taboolaFooterScript,
  taboolaModuleScript,
};
