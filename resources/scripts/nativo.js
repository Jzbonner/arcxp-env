window.addEventListener('DOMContentLoaded', () => {
  const nativoScript = document.createElement('script');
  nativoScript.src = 'https://s.ntv.io/serve/load.js';
  nativoScript.id = 'nativoScript';
  if (window.Fusion.globalContent.type === 'story' && window.Fusion.arcSite !== 'dayton') {
    nativoScript.setAttribute('data-ntv-set-no-auto-start', true);
  }
  document.querySelector('head').appendChild(nativoScript);
});
