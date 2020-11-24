window.addEventListener('DOMContentLoaded', () => {
  const nativoScript = document.createElement('script');
  const meterMeta = document.querySelector('meta[name="story.meter"]');
  let nativoIsDeferred = false;
  nativoScript.src = 'https://s.ntv.io/serve/load.js';
  nativoScript.id = 'nativoScript';
  if (meterMeta && window.Fusion.arcSite !== 'dayton') {
    // it's a story page (thus `meterMeta` exists) and NOT Dayton (because Dayton doesn't yet have Taboola)
    nativoScript.setAttribute('data-ntv-set-no-auto-start', true);
    if (meterMeta.getAttribute('content') === 'premium') {
      // we add the nativo script to the deferred list for premium stories so that it isn't loaded until we know the paywall/auth state
      window.deferUntilKnownAuthState = window.deferUntilKnownAuthState || [];
      window.deferUntilKnownAuthState.push({ script: nativoScript });
      nativoIsDeferred = true;
    }
  }
  if (!nativoIsDeferred) {
    // logic for APD-1062.  moved here from Components/features/List/
    if (!meterMeta && window.Fusion.arcSite !== 'ajc') {
      // it's a non-story page on a non-AJC site, so run the check after load
      nativoScript.addEventListener('load', () => {
        console.error('dave, nativo script loaded');
        document.querySelectorAll('.c-homeListContainer').forEach((list) => {
          console.error('dave, list', list);
          if (list.querySelector('.c-homeList.ntv').length) {
            list.classList.add('hasNativoAd');
          }
        });
      });
    }

    document.querySelector('head').appendChild(nativoScript);
  }
});
