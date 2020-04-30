import React from 'react';
import { connext } from 'fusion:environment';

const ConnextInit = () => {
  const {
    isEnabled = false,
    clientCode,
    environment,
    siteCode,
    configCode,
    debug,
    tagManager,
    containerId,
  } = connext;

  if (!isEnabled) return null;

  return <script type='text/javascript' dangerouslySetInnerHTML={{
    __html: `
      const doc = window.document;
      const docBody = doc.querySelector('body');
      const userIsLoggedInClass = ' is-loggedIn';
      const userIsLoggedOutClass = ' is-loggedOut';
      const userIsAuthenticatedClass = ' is-authenticated';
      const toggleUserState = (action) => {
        if (action === 'logged-in') {
          docBody.className.replace(userIsLoggedOutClass, '');
          docBody.className += userIsLoggedInClass;
        } else if (action === 'logged-out') {
          docBody.className.replace(userIsLoggedInClass, '');
          docBody.className += userIsLoggedOutClass;
        } else if (action === 'authenticated') {
          docBody.className += userIsAuthenticatedClass;
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
          doc.cookie = name + '=;path=/;domain=' + host + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
          doc.cookie = name + '=;path=/;domain=.' + host + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
          doc.cookie = name + '=;path=/;domain=' + rootdomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
          doc.cookie = name + '=;path=/;domain=.' + rootdomain + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
        };
        deleteCookie('igmAuth');
        deleteCookie('igmContent');
        deleteCookie('igmRegID');
        window.Connext.Logout();
      };
      doc.addEventListener('connextLoaded', () => {
        connextLogger('connextLoaded from init');
      });
      doc.addEventListener('connextLoggedIn', () => {
        toggleUserState('logged-in');
      });
      doc.addEventListener('connextLoggedOut', () => {
        toggleUserState('logged-out');
      });
      doc.addEventListener('connextIsSubscriber', () => {
        toggleUserState('authenticated');
      });
      doc.addEventListener('DOMContentLoaded', () => {
        const connextLoaded = new Event('connextLoaded');
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
                    doc.dispatchEvent(connextLoaded);
                  },
                  onLoggedIn: (e) => {
                    connextLogger('>> onLoggedIn', e);
                    doc.dispatchEvent(connextLoggedIn);
                  },
                  onNotAuthorized: (e) => {
                    // this event fires on every Engage loading if user is logged out
                    connextLogger('>> onNotAuthorized', e);
                    doc.dispatchEvent(connextLoggedOut);
                  },
                  onMeterLevelSet: (e) => {
                    connextLogger('>> onMeterLevelSet', e);
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
                    doc.dispatchEvent(connextIsSubscriber);
                  },
                },
              },
            },
          ],
        }));
      });`,
  }}></script>;
};

export default ConnextInit;
