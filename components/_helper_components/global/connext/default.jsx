import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../utils/environment';
import ArcAdLib from '../../../features/ads/src/children/ArcAdLib';
import GetConnextLocalStorageData from './connextLocalStorage';

export const ConnextAuthTrigger = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext } = getProperties(arcSite);
  const {
    isEnabled = false,
    environment,
    siteCode,
    configCode,
  } = connext[currentEnv] || {};

  if (typeof window !== 'undefined' && !window.connextAuthTriggerEnabled) {
    const loadDeferredItems = () => {
      const deferredItems = window.deferUntilKnownAuthState || [];

      if (deferredItems.length) {
        const adInstance = ArcAdLib.getInstance();
        deferredItems.forEach((item) => {
          Object.keys(item).forEach((key) => {
            if (key === 'ad') {
              // it's an ad, let's register/initialize it with ArcAds
              const adSlotConfig = item[key];
              adInstance.registerAd(adSlotConfig[0], adSlotConfig[1], adSlotConfig[2]);
            } else if (key === 'script') {
              // it's a script file, append it (e.g. taboola)
              document.body.appendChild(item[key]);
            } else if (key === 'video') {
              // it's a video player, trigger it to play
              const videoPlayer = item[key];
              const videoBlocker = window.document.querySelector('.video-blocker');
              videoPlayer.play();
              videoPlayer.showControls();
              if (videoBlocker) {
                videoBlocker.style.display = 'none';
              }
            } else {
              // eslint-disable-next-line no-console
              console.error(`unsupported object (${key}) defined in window.deferUntilKnownAuthState:`, item[key]);
            }
          });
        });
      }
    };

    const localStorageAuthChecks = () => {
      const conversationsDataFromLocalStorage = GetConnextLocalStorageData(
        siteCode, configCode, environment, 'Connext_CurrentConversations',
      ) || {};
      const { Metered: meteredConversationData = {} } = conversationsDataFromLocalStorage;
      const {
        Id: meteredConversationId = '',
        Properties: meteredConversationLSProperties = {},
      } = meteredConversationData;
      const {
        ArticleLeft: articlesRemainingFromLocalStorage,
        PaywallLimit: articleLimitFromLocalStorage,
      } = meteredConversationLSProperties;
      const viewedArticlesFromLocalStorage = GetConnextLocalStorageData(
        siteCode, configCode, environment, 'Connext_ViewedArticles',
      ) || {};
      const viewedArticlesArray = viewedArticlesFromLocalStorage[meteredConversationId] || [];

      if (
        (articlesRemainingFromLocalStorage && articlesRemainingFromLocalStorage > 0)
        || (
          articlesRemainingFromLocalStorage !== 0
          && viewedArticlesArray.length < articleLimitFromLocalStorage - 1
        )
      ) {
        // console.error(
        //   `connext debugging >> (articlesRemainingFromLocalStorage && articlesRemainingFromLocalStorage > 0)
        //  || (articlesRemainingFromLocalStorage !== 0 && viewedArticlesArray.length < articleLimitFromLocalStorage - 1)`,
        //   (articlesRemainingFromLocalStorage && articlesRemainingFromLocalStorage > 0),
        //   'or',
        //   (articlesRemainingFromLocalStorage !== 0 && viewedArticlesArray.length < articleLimitFromLocalStorage - 1),
        //   'articlesRemainingFromLocalStorage',
        //   articlesRemainingFromLocalStorage,
        //   'viewedArticlesArray.length',
        //   viewedArticlesArray.length,
        //   'articleLimitFromLocalStorage - 1',
        //   articleLimitFromLocalStorage - 1,
        //   'viewedArticlesFromLocalStorage',
        //   viewedArticlesFromLocalStorage,
        //   'conversationsDataFromLocalStorage',
        //   conversationsDataFromLocalStorage,
        // );
        // there are > 0 articles remaining before hitting the limit
        loadDeferredItems();
      } else {
        const numberOfArticlesViewed = window.Connext.Storage.GetViewedArticles();
        const numberOfArticlesLeft = () => {
          try {
            return window.Connext.Storage.GetArticlesLeft();
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error('error calling `window.Connext.Storage.GetArticlesLeft()`', err);
            return null;
          }
        };
        const currentConversation = window.Connext.Storage.GetCurrentConversation();
        const { Properties: currentConversationProperties = {} } = currentConversation;
        const {
          ArticleLeft: articlesRemainingFromConversation,
          PaywallLimit: paywallArticleLimit,
        } = currentConversationProperties;
        if (
          (articlesRemainingFromConversation && articlesRemainingFromConversation > 0)
          || (
            articlesRemainingFromConversation !== 0
            && (numberOfArticlesViewed.length < paywallArticleLimit - 1 || numberOfArticlesLeft > 0)
          )
        ) {
          // console.error(
          //   'connext debugging >> (articlesRemainingFromConversation && articlesRemainingFromConversation > 0) || (articlesRemainingFromConversation !== 0 && (numberOfArticlesViewed.length < paywallArticleLimit - 1 || numberOfArticlesLeft > 0))',
          //   '(articlesRemainingFromConversation',
          //   articlesRemainingFromConversation,
          //   'and',
          //   articlesRemainingFromConversation > 0,
          //   ') or',
          //   articlesRemainingFromConversation !== 0,
          //   'and (',
          //   numberOfArticlesViewed.length < paywallArticleLimit - 1,
          //   'or',
          //   numberOfArticlesLeft > 0,
          //   ') currentConversation',
          //   currentConversation,
          //   'articlesRemainingFromConversation',
          //   articlesRemainingFromConversation,
          //   'numberOfArticlesViewed',
          //   numberOfArticlesViewed,
          //   'numberOfArticlesViewed.length',
          //   numberOfArticlesViewed.length,
          //   'paywallArticleLimit - 1',
          //   paywallArticleLimit - 1,
          //   'numberOfArticlesLeft',
          //   numberOfArticlesLeft,
          // );
          loadDeferredItems();
        }
      }
    };

    window.addEventListener('connextMeterLevelSet', () => {
      const connextLocalStorageData = GetConnextLocalStorageData(siteCode, configCode, environment) || {};
      const { UserState } = connextLocalStorageData;
      if (isEnabled && !(UserState && UserState.toLowerCase() === 'subscriber')) {
        try {
          const currentMeterLevel = window.Connext.Storage.GetCurrentMeterLevel();
          if (currentMeterLevel === 1) {
            // it's "free" content (per connext), so load everything
            loadDeferredItems();
          } else {
            localStorageAuthChecks();
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('`window.Connext.Storage.GetCurrentMeterLevel()` error response:', err);

          localStorageAuthChecks();
        }
      } else {
        // either connext is disabled or the user is a subscriber per localstorage.  Either way, proceed with loading
        loadDeferredItems();
      }
    });
    // connext is enabled & the user is not authorized, wait for the connext auth callback
    window.addEventListener('connextIsSubscriber', loadDeferredItems);
    window.connextAuthTriggerEnabled = true;
  }
};

export const ConnextInit = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext } = getProperties(arcSite);
  const {
    isEnabled = false,
    clientCode,
    environment,
    siteCode,
    configCode,
    debug,
    tagManager,
    containerId,
  } = connext[currentEnv] || {};

  if (!isEnabled) return null;

  const userIsLoggedInClass = 'is-loggedIn';
  const userIsLoggedOutClass = 'is-loggedOut';
  const userIsAuthenticatedClass = 'is-authenticated';
  const connextLSLookup = `connext_user_data_${siteCode}_${configCode}_${environment.toUpperCase()}`;

  return <script type='text/javascript' dangerouslySetInnerHTML={{
    __html: `
      const doc = window.document;
      const docBody = doc.querySelector('body');
      const toggleUserState = (action) => {
        let dataLayer = window.dataLayer || [];
        if (action === 'logged-in') {
          docBody.className = docBody.className.replace(/${userIsLoggedOutClass}/g, '');
          docBody.className += docBody.className.indexOf('${userIsLoggedInClass}') === -1 ? ' ${userIsLoggedInClass}' : '';
          if (typeof(window.localStorage) !== 'undefined') {
            const connextLS = window.localStorage.getItem('${connextLSLookup}');
            if (connextLS) {
              const loginEventName = 'loginEvent_complete';
              const loginEventToTrigger = !window[loginEventName] ? 'loginEvent_return-user' : null;
              const { CustomerRegistrationId } = JSON.parse(connextLS);
              const userDataObj = {
                'userData': {
                  'userActive': 'logged in',
                  'userProfileID': CustomerRegistrationId
                },
                'event': loginEventToTrigger
              };
              dataLayer.push(userDataObj);
            }
          }
        } else if (action === 'logged-out') {
          docBody.className = docBody.className.replace(/${userIsLoggedInClass}/g, '').replace(/${userIsAuthenticatedClass}/g, '');
          docBody.className += docBody.className.indexOf('${userIsLoggedOutClass}') === -1 ? ' ${userIsLoggedOutClass}' : '';
          const userDataObj = {
            'userData': {
              'userActive': 'not logged in',
              'userProfileID': null
            }
          };
          dataLayer.push(userDataObj);
        } else if (action === 'authenticated' && docBody.className.indexOf('${userIsAuthenticatedClass}') === -1) {
          docBody.className += ' ${userIsAuthenticatedClass}';
        }
      };
      const connextLogger = (message) => {
        if (${debug} || window.location.search.indexOf('connextDebug') > -1) {
          console.log(message);
        }
      };
      window.addEventListener('connextLoggedIn', () => {
        toggleUserState('logged-in');
      });
      window.addEventListener('connextLoggedOut', () => {
        toggleUserState('logged-out');
      });
      window.addEventListener('connextIsSubscriber', () => {
        toggleUserState('authenticated');
      });
      window.addEventListener('connextMeterLevelSet', () => {
        /*
          workaround for APD-960, since binding to the logout button click isn't working (connext fires too quickly)
          and connext actually double-fires the "onNotAuthorized" event.  So we set this property when connext first loads
          and then we delete it - if it hasn't been already - once the meter level is set (one of the later processes for connext)
        */
        if (typeof window.connextInitialLoadComplete !== 'undefined') {
          delete window.connextInitialLoadComplete;
        } else {
          const userState = Connext.Storage.GetUserState() || '';
          if (userState.toLowerCase() === 'logged out') {
            dataLayer.push({'event': 'loginEvent_logout'});
          }
        }
      });
      doc.addEventListener('DOMContentLoaded', () => {
        const connextLoaded = new Event('connextLoaded');
        const connextMeterLevelSet = new Event('connextMeterLevelSet');
        const connextLoggedIn = new Event('connextLoggedIn');
        const connextLoggedOut = new Event('connextLoggedOut');
        const connextIsSubscriber = new Event('connextIsSubscriber');
        Promise.resolve(window.MG2Loader.init({
          plugins: [
            {
              name: 'FP',
              initOptions: {
                version: '${clientCode}' || '1.0',
                environment: '${environment}',
              },
            },
            {
              name: 'DL',
              initOptions: {
                environment: '${environment}',
                version: '${clientCode}',
                collectors: ['connext'],
                tagManager: '${tagManager}',
                containerId: '${containerId}',
              },
            },
            {
              name: 'NXT',
              initOptions: {
                clientCode: '${clientCode}',
                environment: '${environment}',
                siteCode: '${siteCode}',
                configCode: '${configCode}',
                debug: ${debug},
                silentmode: false,
                publicEventHandlers: {
                  onActionClosed: (e) => { connextLogger('>> onActionClosed', e); },
                  onActionShown: (e) => { connextLogger('>> onActionShown', e); },
                  onButtonClick: (e) => { connextLogger('>> onButtonClick', e); },
                  onCampaignFound: (e) => { connextLogger('>> onCampaignFound', e); },
                  onConversationDetermined: (e) => { connextLogger('>> onConversationDetermined', e); },
                  onCriticalError: (e) => { connextLogger('>> onCriticalError', e); },
                  onDebugNote: (e) => { connextLogger('>> onDebugNote', e); },
                  onInit: (e) => {
                    connextLogger('>> onInit', e);
                    window.connextInitialLoadComplete = true;
                    window.dispatchEvent(connextLoaded);
                  },
                  onLoggedIn: (e) => {
                    connextLogger('>> onLoggedIn', e);
                    window.dispatchEvent(connextLoggedIn);
                  },
                  onNotAuthorized: (e) => {
                    // this event fires on every Engage loading if user is logged out
                    connextLogger('>> onNotAuthorized', e);
                    window.dispatchEvent(connextLoggedOut);
                  },
                  onMeterLevelSet: (e) => {
                    connextLogger('>> onMeterLevelSet', e);
                    window.dispatchEvent(connextMeterLevelSet);
                  },
                  onAuthorized: (e) => {
                    // this event fires on every Engage loading if user is logged in but doesn't have access to this product
                    connextLogger('>> onAuthorized', e);
                  },
                  onHasNoActiveSubscription: (e) => {
                    // this event fires on every Engage loading if user is logged in but subscription is stopped or inactive
                    connextLogger('>> onHasNoActiveSubscription', e);
                  },
                  onHasAccessNotEntitled: (e) => {
                    // this event fires on every Engage loading if user is logged in
                    // and doesn't have access to this product but has access to another one
                    connextLogger('>> onHasAccessNotEntitled', e);
                  },
                  onHasAccess: (e) => {
                    // this event fires on every Engage loading if user is subscriber
                    connextLogger('>> onHasAccess', e);
                    window.dispatchEvent(connextIsSubscriber);
                  },
                },
              },
            },
          ],
        }));
      });`,
  }}></script>;
};
