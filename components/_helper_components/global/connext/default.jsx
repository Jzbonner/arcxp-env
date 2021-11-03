import React, { useState } from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../utils/environment';
import ArcAdLib from '../../../features/ads/src/children/ArcAdLib';
import GetConnextLocalStorageData from './connextLocalStorage';

const logOutput = (msg, debug = false) => {
  if (debug || (typeof window !== 'undefined' && window?.location?.search?.indexOf('connextDebug') > -1)) {
    console.log(msg);
  }
};

export const ConnextAuthTrigger = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext } = getProperties(arcSite);
  const [loadedDeferredItems, _setLoadedDeferredItems] = useState(false);
  const loadedDeferredItemsRef = React.useRef(loadedDeferredItems);
  const [localStorageAuthCheckComplete, _setLocalStorageAuthCheckComplete] = useState(false);
  const localStorageAuthCheckCompleteRef = React.useRef(localStorageAuthCheckComplete);
  const setLoadedDeferredItems = (data) => {
    loadedDeferredItemsRef.current = data;
    _setLoadedDeferredItems(data);
  };
  const setLocalStorageAuthCheckComplete = (data) => {
    localStorageAuthCheckCompleteRef.current = data;
    _setLocalStorageAuthCheckComplete(data);
  };
  const {
    isEnabled = false,
    environment,
    siteCode,
    configCode,
  } = connext[currentEnv] || {};

  if (typeof window !== 'undefined' && !window.connextAuthTriggerEnabled) {
    const loadDeferredItems = () => {
      const deferredItems = window.deferUntilKnownAuthState || [];
      if (deferredItems.length && !loadedDeferredItemsRef.current) {
        const adInstance = ArcAdLib.getInstance();
        const articleBodyContainer = document.querySelector('.c-articleBodyContainer');
        if (articleBodyContainer && articleBodyContainer.getAttribute('class').indexOf('mark-text') > -1) {
          // we override/remove the inline styles that are being added by Naviga/connext when the paywall renders
          // specifically for APD-1223 (`overflow: hidden` was cropping the interscroller ad) but also because their inline styles suck
          articleBodyContainer.setAttribute('style', '');
        }
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
              // it's a video player
              const videoPlayer = item[key][0];
              const videoIsLead = item[key][1];
              const videoBlocker = window.document.querySelector('.video-blocker');
              if (videoIsLead) {
                // it's a lead video (and thus already instantiated) so just trigger it to play
                videoPlayer.play();
                videoPlayer.showControls();
                if (videoBlocker) {
                  videoBlocker.style.display = 'none';
                }
              } else {
                // it's an inline video, so change the className to `powa`...
                const videoPlaceholder = document.querySelector('.powa-lazyLoad') || {};
                videoPlaceholder.className = 'powa';
                // ... and then instantiate the player (per https://arcpublishing.atlassian.net/wiki/spaces/POWA/overview)
                window.powaBoot();
              }
            } else {
              // eslint-disable-next-line no-console
              console.error(`unsupported object (${key}) defined in window.deferUntilKnownAuthState:`, item[key]);
            }
          });
        });

        // image fix for APD-983
        const inlineImages = document.querySelectorAll('.lazyload-wrapper img');
        if (inlineImages.length) {
          inlineImages.forEach((img) => {
            const isPlaceholder = img.getAttribute('data-placeholder');
            const dataSrc = img.getAttribute('data-src');
            if (isPlaceholder && dataSrc) {
              img.setAttribute('src', dataSrc);
            }
          });
        }

        // lead video fix for APD-1333
        const storyHasLeadVideo = !!window.document.getElementsByClassName('article-headline-component with-video');

        if (storyHasLeadVideo) {
          const videoBlocker = window.document.querySelector('.video-blocker');

          if (videoBlocker) videoBlocker.style.display = 'none';
        }

        // set state to `true` to ensure we only call `loadDeferredItems` once
        setLoadedDeferredItems(true);
      }
    };

    const localStorageAuthChecks = () => {
      if (!localStorageAuthCheckCompleteRef.current) {
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

        logOutput('connext logging >> localStorageAuthChecks - articlesRemainingFromLocalStorage', articlesRemainingFromLocalStorage, 'viewedArticlesArray.length', viewedArticlesArray.length, 'articleLimitFromLocalStorage - 1', articleLimitFromLocalStorage - 1, 'window.Connext.Storage.GetViewedArticles()', window.Connext.Storage.GetViewedArticles(), 'window.Connext.Storage.GetCurrentConversation()', window.Connext.Storage.GetCurrentConversation());

        if (
          (articlesRemainingFromLocalStorage && articlesRemainingFromLocalStorage > 0)
          || (
            articlesRemainingFromLocalStorage !== 0
            && viewedArticlesArray.length < articleLimitFromLocalStorage - 1
          )
        ) {
          logOutput(
            `connext debugging >> (articlesRemainingFromLocalStorage && articlesRemainingFromLocalStorage > 0)
           || (articlesRemainingFromLocalStorage !== 0 && viewedArticlesArray.length < articleLimitFromLocalStorage - 1)`,
            (articlesRemainingFromLocalStorage && articlesRemainingFromLocalStorage > 0),
            'or',
            (articlesRemainingFromLocalStorage !== 0 && viewedArticlesArray.length < articleLimitFromLocalStorage - 1),
            'articlesRemainingFromLocalStorage',
            articlesRemainingFromLocalStorage,
            'viewedArticlesArray.length',
            viewedArticlesArray.length,
            'articleLimitFromLocalStorage - 1',
            articleLimitFromLocalStorage - 1,
            'viewedArticlesFromLocalStorage',
            viewedArticlesFromLocalStorage,
            'conversationsDataFromLocalStorage',
            conversationsDataFromLocalStorage,
          );
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
              && (numberOfArticlesViewed.length < paywallArticleLimit - 1 || numberOfArticlesLeft() > 0)
            )
          ) {
            logOutput(
              'connext debugging >> (articlesRemainingFromConversation && articlesRemainingFromConversation > 0) || (articlesRemainingFromConversation !== 0 && (numberOfArticlesViewed.length < paywallArticleLimit - 1 || numberOfArticlesLeft > 0))',
              '(articlesRemainingFromConversation',
              articlesRemainingFromConversation,
              'and',
              articlesRemainingFromConversation > 0,
              ') or',
              articlesRemainingFromConversation !== 0,
              'and (',
              numberOfArticlesViewed.length < paywallArticleLimit - 1,
              'or',
              numberOfArticlesLeft() > 0,
              ') currentConversation',
              currentConversation,
              'articlesRemainingFromConversation',
              articlesRemainingFromConversation,
              'numberOfArticlesViewed',
              numberOfArticlesViewed,
              'numberOfArticlesViewed.length',
              numberOfArticlesViewed.length,
              'paywallArticleLimit - 1',
              paywallArticleLimit - 1,
              'numberOfArticlesLeft',
              numberOfArticlesLeft(),
            );
            loadDeferredItems();
          } else if (window?.sophi) {
            // the free limit has been exceeded and/or they are unauthorized; it's a paywall interaction, so trigger a Sophi event
            window.sophi.sendEvent(
              {
                type: 'wall_hit',
                data: {
                  type: 'paywall-metered',
                  name: 'regular',
                },
              },
            );
          }
        }

        // set state to `true` to ensure we only call `localStorageAuthChecks` once
        setLocalStorageAuthCheckComplete(true);
      }
    };

    window.addEventListener('connextConversationDetermined', () => {
      const connextLocalStorageData = GetConnextLocalStorageData(siteCode, configCode, environment) || {};
      const { UserState } = connextLocalStorageData;
      if (isEnabled && !(UserState && ['subscriber', 'subscribed'].indexOf(UserState.toLowerCase()) > -1)) {
        logOutput('connext logging >> isEnabled && !(UserState && ["subscriber", "subscribed"].indexOf(UserState.toLowerCase()) > -1))', 'isenabled', isEnabled, 'userState', UserState, 'is subscriber', ['subscriber', 'subscribed'].indexOf(UserState.toLowerCase()) > -1);
        try {
          const currentMeterLevel = window.Connext.Storage.GetCurrentMeterLevel();
          logOutput('connext logging >> currentMeterLevel', currentMeterLevel);
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

const ConnextInit = ({ triggerLoginModal = false }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const currentEnv = fetchEnv();
  const { connext, siteDomainURL } = getProperties(arcSite);
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

  // Generate GUID for session id. Used for troubleshooting
  const generatePart = () => Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
  const sessionId = () => generatePart() + generatePart() + generatePart() + generatePart() + generatePart() + generatePart() + generatePart() + generatePart();

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
              const { CustomerRegistrationId, UserState } = JSON.parse(connextLS);
              const userTypeState = UserState === 'Subscribed' ? 'premium' : 'standard';
              const userDataObj = {
                'userData': {
                  'userActive': 'logged in',
                  'userProfileID': CustomerRegistrationId,
                  'userStatus': 'registered',
                  'userType': userTypeState
                },
                'event': loginEventToTrigger
              };
              dataLayer.push(userDataObj);
              if (window?.sophi?.data) {
                const sophiUserState = UserState === 'Subscribed' ? 'Subscribed' : 'Registered'
                window.sophi.data.visitor = {
                  type: sophiUserState,
                  isLoggedIn: true,
                  uid: CustomerRegistrationId
                };
              }
            }
          }
        } else if (action === 'logged-out') {
          docBody.className = docBody.className.replace(/${userIsLoggedInClass}/g, '').replace(/${userIsAuthenticatedClass}/g, '');
          docBody.className += docBody.className.indexOf('${userIsLoggedOutClass}') === -1 ? ' ${userIsLoggedOutClass}' : '';
          const userDataObj = {
            'userData': {
              'userActive': 'not logged in',
              'userProfileID': null,
              'userStatus': 'not registered',
              'userType': 'anonymous'
            }
          };
          dataLayer.push(userDataObj);
          if (window?.sophi?.data) {
            window.sophi.data.visitor = {
              type: 'Anonymous',
              isLoggedIn: false,
              uid: null
            };
          }
          // trigger login modal to appear if "triggerLoginModal" is passed-in (i.e. from "login" outputType)
          if (${triggerLoginModal}) {
            doc.querySelector('[data-mg2-action="login"]').click();
          }
        } else if (action === 'authenticated' && docBody.className.indexOf('${userIsAuthenticatedClass}') === -1) {
          docBody.className += ' ${userIsAuthenticatedClass}';
        }
      };
      const connextLogger = (msg) => {
        if (${debug} || window.location.search.indexOf('connextDebug') > -1) {
          console.log(msg);
        }
      };
      let bindConnextLoaded = false;
      let bindConnextLoggedIn = false;
      let bindConnextNotAuthorized = false;
      let bindConnextIsSubscriber = false;
      let bindConnextMeterLevelSet = false;
      let bindConnextConversationDetermined = false;
      let triggerActualLoginEvent = false;
      let triggerActualLogoutEvent = false;
      window.addEventListener('connextLoggedIn', () => {
        toggleUserState('logged-in');

        if (triggerActualLoginEvent) {
          // it's the result of user-instantiated login, so trigger sophi
          // sophi account interaction - login event
          window.sophi.sendEvent({
            type: 'account_interaction',
            data: { type: 'login', action: 'sign in' },
            config: { overrideStoredContext: true },
          });
        }
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
        const userState = Connext.Storage.GetUserState() || '';
        if (userState.toLowerCase() === 'logged out') {
          dataLayer.push({'event': 'loginEvent_logout'});

          if (triggerActualLogoutEvent) {
            // sophi account interaction - logout event
            window?.sophi?.sendEvent({
              type: 'account_interaction',
              data: { type: 'login', action: 'sign out' },
              config: { overrideStoredContext: true },
            });
          }

          // let's bind to the login button(s) since the onLoggedIn event isn't entirely reliable
          try {
            document.querySelector('[data-mg2-action="login"]').addEventListener('click', () => {
              // (re)set the sophi event trigger for login
              triggerActualLoginEvent = true;
            });
            // reset the connextLoggedIn binding (since another event may occur after page load)
            bindConnextLoggedIn = false;
          } catch (e) {
            console.warn('could not bind to login button:', e);
          }
        } else if (userState.toLowerCase() === 'logged in') {
          // (re)set the sophi event trigger for logout
          triggerActualLogoutEvent = true;
          // reset the connextNotAuthorized binding (since another event may occur after page load)
          bindConnextNotAuthorized = false;
        }
      });
      doc.addEventListener('DOMContentLoaded', () => {
        const connextMeterLevelSet = new Event('connextMeterLevelSet');
        const connextConversationDetermined = new Event('connextConversationDetermined');
        const connextLoggedIn = new Event('connextLoggedIn');
        const connextLoggedOut = new Event('connextLoggedOut');
        const connextIsSubscriber = new Event('connextIsSubscriber');

        //Function wrapping plugin initalization. Accepts plugin name(string) and initialization settings object. Returns promise
        const initializePlugin = function (pluginName, initSettings) {
          try {
            const plugin = window[pluginName];
            if(!plugin) {
              throw new Error(pluginName + " object not found");
            }
            const initResult = plugin.init(initSettings);
            return initResult && initResult.then ? initResult : Promise.resolve(true);
          } catch(e) {
            return Promise.reject(e.message);
          }
        };

        //Initialization of the plugins in the right order. Init settings from original init script splitted between plugins
        initializePlugin("Fingerprint", {
          version: "${clientCode}",
          siteCode: "${siteCode}",
          environment: "${environment}",
          resourceUrl: "${environment === 'prod' ? siteDomainURL : siteDomainURL.replace('www', 'sandbox')}",
          sessionId: "${sessionId()}"
        })
        .then(function() {
          return initializePlugin("G2Insights", {
            environment: "${environment}",
            version: "${clientCode}",
            collectors: ["connext"],
            tagManager: "${tagManager}",
            containerId: "${containerId}",
            layoutCode: "${siteCode}",
            siteCode: "${siteCode}",
            resourceUrl: "${environment === 'prod' ? siteDomainURL : siteDomainURL.replace('www', 'sandbox')}",
            sessionId: "${sessionId()}"
          });
        })
        .then(function() {
          return initializePlugin("Connext", {
            clientCode: "${clientCode}",
            environment: "${environment}",
            siteCode: "${siteCode}",
            configCode: "${configCode}",
            debug: ${debug},
            silentmode: false,
            resourceUrl: "${environment === 'prod' ? siteDomainURL : siteDomainURL.replace('www', 'sandbox')}",
            sessionId: "${sessionId()}",
            publicEventHandlers: {
              onConversationDetermined: (e) => {
                if (!bindConnextConversationDetermined) {
                  connextLogger('>> onConversationDetermined', e);
                  window.dispatchEvent(connextConversationDetermined);
                  bindConnextConversationDetermined = true;
                  bindConnextMeterLevelSet = false;
                }
              },
              onInit: (e) => {
                if (!bindConnextLoaded) {
                  connextLogger('>> onInit', e);
                  window.connextInitialLoadComplete = true;
                  bindConnextLoaded = true;
                }
              },
              onLoggedIn: (e) => {
                if (!bindConnextLoggedIn) {
                  connextLogger('>> onLoggedIn', e);
                  window.dispatchEvent(connextLoggedIn);
                  bindConnextLoggedIn = true;
                }
              },
              onNotAuthorized: (e) => {
                // this event fires on every Engage loading if user is logged out
                if (!bindConnextNotAuthorized) {
                  connextLogger('>> onNotAuthorized', e);
                  window.dispatchEvent(connextLoggedOut);
                  bindConnextNotAuthorized = true;
                }
              },
              onMeterLevelSet: (e) => {
                if (!bindConnextMeterLevelSet) {
                  connextLogger('>> onMeterLevelSet', e);
                  window.dispatchEvent(connextMeterLevelSet);
                  bindConnextMeterLevelSet = true;
                }
              },
              onHasAccess: (e) => {
                if (!bindConnextIsSubscriber) {
                  // this event fires on every Engage loading if user is subscriber
                  connextLogger('>> onHasAccess', e);
                  window.dispatchEvent(connextIsSubscriber);
                  bindConnextIsSubscriber = true;
                }
              }
              /*
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
              onActionClosed: (e) => { connextLogger('>> onActionClosed', e); },
              onActionShown: (e) => { connextLogger('>> onActionShown', e); },
              onCampaignFound: (e) => { connextLogger('>> onCampaignFound', e); },
              onCriticalError: (e) => { connextLogger('>> onCriticalError', e); },
              onDebugNote: (e) => { connextLogger('>> onDebugNote', e); }
              */
            }
          });
        })
        .catch(function(err) {
            console.error(err);
        });
      });`,
  }}></script>;
};

ConnextInit.propTypes = {
  triggerLoginModal: PropTypes.boolean,
};

export default ConnextInit;
