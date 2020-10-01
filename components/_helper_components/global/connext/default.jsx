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

  if (typeof window !== 'undefined') {
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
    window.addEventListener('connextMeterLevelSet', () => {
      const connextLocalStorageData = GetConnextLocalStorageData(siteCode, configCode, environment) || {};
      const { UserState } = connextLocalStorageData;
      if (isEnabled && !(UserState && UserState.toLowerCase() === 'subscriber')) {
        if (window.Connext.Storage.GetCurrentMeterLevel() === 1) {
          // it's "free" content (per connext), so load everything
          loadDeferredItems();
        } else {
          const conversationsDataFromLocalStorage = GetConnextLocalStorageData(
            siteCode, configCode, environment, 'Connext_CurrentConversations',
          ) || { };
          const { Metered: meteredConversationData } = conversationsDataFromLocalStorage || {};
          const { Id: meteredConversationId, Properties: meteredConversationProperties } = meteredConversationData || {};
          const viewedArticlesFromLocalStorage = GetConnextLocalStorageData(
            siteCode, configCode, environment, 'Connext_ViewedArticles',
          ) || {};
          const viewedArticlesArray = viewedArticlesFromLocalStorage[meteredConversationId] || [];
          const {
            ArticleLeft: articlesRemainingFromLocalStorage,
            PaywallLimit: articleLimitFromLocalStorage,
          } = meteredConversationProperties;

          if (
            (articlesRemainingFromLocalStorage && articlesRemainingFromLocalStorage > 0)
            || (viewedArticlesArray.length < articleLimitFromLocalStorage - 1)
          ) {
            loadDeferredItems();
          } else {
            try {
              const articlesRemainingFromConnext = window.Connext.Storage.GetArticlesLeft() || [];
              if (typeof articlesRemainingFromConnext === 'string' || articlesRemainingFromConnext > 0) {
                loadDeferredItems();
              }
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error('`checkConnextStorageState` error response:', err);

              // GetArticlesLeft method threw an error, so try an alternate method
              const numberOfArticlesViewed = window.Connext.Storage.GetViewedArticles();
              const currentConversations = window.Connext.Storage.GetCurrentConversations() || { };
              const { Metered: meteredConversationDetails } = currentConversations || { Properties: {} };
              const {
                ArticleLeft: articlesRemainingFromConversation,
                PaywallLimit: paywallArticleLimit = 4,
              } = meteredConversationDetails.Properties;
              if (
                (articlesRemainingFromConversation && articlesRemainingFromConversation > 0)
                || (numberOfArticlesViewed.length < paywallArticleLimit - 1)
              ) {
                // more than 0 article views remaining before reaching the paywall
                loadDeferredItems();
              }
            }
          }
        }
      } else {
        // either connext is disabled or the user is a subscriber per localstorage.  Either way, proceed with loading
        loadDeferredItems();
      }
    });
    // connext is enabled & the user is not authorized, wait for the connext auth callback
    window.addEventListener('connextIsSubscriber', loadDeferredItems);
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
      const mg2Logout = () => {
        const deleteCookie = (name) => {
          const arr = location.host.split('.');
          const rootdomain = arr[arr.length - 2] + '.' + arr[arr.length - 1];
          doc.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT';
          doc.cookie = name + '=;path=/;domain=' + rootdomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
          doc.cookie = name + '=;path=/;domain=.' + rootdomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
          doc.cookie = name + '=;path=/;domain=' + rootdomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
          doc.cookie = name + '=;path=/;domain=.' + rootdomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
        };
        deleteCookie('igmAuth');
        deleteCookie('igmContent');
        deleteCookie('igmRegID');
        window.Connext.Logout();
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
                    doc.querySelectorAll('.nav-profileLogout').forEach((el) => {
                      el.addEventListener('click', mg2Logout);
                    });
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
