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

      const connextLogger = (message) => {
        if (${debug}) {
          console.error(message);
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

      doc.addEventListener('DOMContentLoaded', () => {
        const connextLoaded = new Event('connextLoaded');
        const connextLoggedIn = new Event('connextLoggedIn');
        const connextLoggedOut = new Event('connextLoggedOut');
        const connextIsSubscriber = new Event('connextIsSubscriber');

        const loggedOutState = doc.querySelectorAll('.nav-auth__anon-user');
        const loggedInState = doc.querySelectorAll('.nav-auth__authed-user');
        const activationLinks = doc.querySelectorAll('.MG2activation');
        const showThisEl = (el) => {
          const elToShow = el;
          elToShow.style.display = 'block';
          elToShow.className = elToShow.className.replace('hidden', ' ');
        };
        const hideThisEl = (el) => {
          const elToHide = el;
          elToHide.style.display = 'none';
          if (elToHide.className.indexOf('hidden') === -1) {
            elToHide.className += ' hidden';
          }
        };
        const toggleActivateLink = (showOrHide) => {
          if (showOrHide === 'show') {
            activationLinks.forEach((child) => {
              showThisEl(child);
            });
          } else {
            activationLinks.forEach((child) => {
              hideThisEl(child);
            });
          }
        };
        const toggleLoggedInState = (showOrHide) => {
          if (showOrHide === 'show') {
            loggedInState.forEach((child) => {
              showThisEl(child);
            });
          } else {
            loggedInState.forEach((child) => {
              hideThisEl(child);
            });
          }
        };
        const toggleLoggedOutState = (showOrHide) => {
          if (showOrHide === 'show') {
            loggedOutState.forEach((child) => {
              showThisEl(child);
            });
          } else {
            loggedOutState.forEach((child) => {
              hideThisEl(child);
            });
          }
        };

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
                    doc.querySelectorAll('.js-auth-logout').forEach((el) => {
                      el.addEventListener('click', mg2Logout);
                    });
                    doc.dispatchEvent(connextLoaded);
                  },
                  onLoggedIn: (e) => {
                    toggleLoggedInState('show');
                    toggleLoggedOutState('hide');
                    connextLogger('>> onLoggedIn', e);
                    doc.dispatchEvent(connextLoggedIn);
                  },
                  onNotAuthorized: (e) => {
                    // this event fires on every Engage loading if user is logged out
                    connextLogger('>> onNotAuthorized', e);

                    toggleLoggedInState('hide');
                    toggleLoggedOutState('show');
                    doc.dispatchEvent(connextLoggedOut);
                  },
                  onMeterLevelSet: (e) => {
                    connextLogger('>> onMeterLevelSet', e);
                  },
                  onAuthorized: (e) => {
                    // this event fires on every Engage loading if user is logged in but doesn't have access to this product
                    connextLogger('>> onAuthorized', e);
                    toggleActivateLink('show');
                    doc.dispatchEvent(connextLoggedIn);
                  },
                  onHasNoActiveSubscription: (e) => {
                    // this event fires on every Engage loading if user is logged in but subscription is stopped or inactive
                    connextLogger('>> onHasNoActiveSubscription', e);
                    toggleActivateLink('show');
                  },
                  onHasAccessNotEntitled: (e) => {
                    // this event fires on every Engage loading if user is logged in
                    // and doesn't have access to this product but has access to another one
                    connextLogger('>> onHasAccessNotEntitled', e);
                  },
                  onHasAccess: (e) => {
                    // this event fires on every Engage loading if user is subscriber
                    connextLogger('>> onHasAccess', e);
                    toggleActivateLink('hide');
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
