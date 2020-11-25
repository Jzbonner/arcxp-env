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
    // logic for APD-1062.  moved here from Components/features/List/ so as not to run once for _every_ list on the page
    if (!meterMeta && window.Fusion.arcSite !== 'ajc') {
      // it's a non-story page on a non-AJC site, so run the check after the script loads
      const maxAttempts = 4;
      let timeout = 750;
      let attempt = 0;
      const runNativoDetect = () => {
        // gather all the lists on the page (that aren't already tagged as having a nativo ad)
        const allLists = document.querySelectorAll('.c-homeListContainer:not(.hasNativoAd)');
        allLists.forEach((list) => {
          if (list.querySelector('.c-homeList[class*=ntv]')) {
            // the list has a nativo ad inserted, so apply the class to it, hiding the last item
            list.classList.add('hasNativoAd');
          }
        });
        if (attempt < maxAttempts) {
          // we have to go inelegant because Nativo doesn't have an event that we can bind to, after inserting their ad(s)
          setTimeout(runNativoDetect, timeout);
        }
        timeout *= 1.5;
        attempt += 1;
      };
      nativoScript.addEventListener('load', runNativoDetect());
    }

    document.querySelector('head').appendChild(nativoScript);
  }
});
