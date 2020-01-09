import React, { useState } from 'react';
import { connext } from 'fusion:environment';

const ConnextInit = () => {
  const {
    clientCode,
    environment,
    siteCode,
    configCode,
    debug,
    tagManager,
    containerId,
  } = connext;

  return {
    const doc = window.document;

    const mg2Logout = () => {
      console.error('called logout');
      const deleteCookie = (name) => {
        const { location: host } = window;
        const arr = host.split('.');
        const rootdomain = `${arr[arr.length - 2]}.${arr[arr.length - 1]}`;
        doc.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        doc.cookie = `${name}=;path=/;domain=${host};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        doc.cookie = `${name}=;path=/;domain=.${host};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        doc.cookie = `${name}=;path=/;domain=${rootdomain};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        doc.cookie = `${name}=;path=/;domain=.${rootdomain};expires=Thu, 01 Jan 1970 00:00:01 GMT`;
      };
      deleteCookie('igmAuth');
      deleteCookie('igmContent');
      deleteCookie('igmRegID');
      window.Connext.Logout();
    };

    doc.addEventListener('connextLoaded', () => {
      console.error('dave - connextLoaded in init');
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

      // console.error('>> domcontentloaded');
      Promise.resolve(window.MG2Loader.init({
        plugins: [
          {
            name: 'FP',
            initOptions: {
              version: clientCode || '1.0',
              environment,
            },
          },
          {
            name: 'DL',
            initOptions: {
              environment,
              version: clientCode,
              collectors: ['connext'],
              tagManager,
              containerId,
            },
          },
          {
            name: 'NXT',
            initOptions: {
              clientCode,
              environment,
              siteCode,
              configCode,
              debug,
              silentmode: false,
              publicEventHandlers: {
                onActionClosed: (e) => { console.error('>> onActionClosed', e); },
                onActionShown: (e) => { console.error('>> onActionShown', e); },
                onButtonClick: (e) => { console.error('>> onButtonClick', e); },
                onCampaignFound: (e) => { console.error('>> onCampaignFound', e); },
                onConversationDetermined: (e) => { console.error('>> onConversationDetermined', e); },
                onCriticalError: (e) => { console.error('>> onCriticalError', e); },
                onDebugNote: (e) => { console.error('>> onDebugNote', e); },
                onInit: (e) => {
                  console.error('>> onInit', e);
                  doc.querySelectorAll('.js-auth-logout').forEach((el) => {
                    el.addEventListener('click', mg2Logout);
                  });
                  doc.dispatchEvent(connextLoaded);
                },
                onLoggedIn: (e) => {
                  toggleLoggedInState('show');
                  toggleLoggedOutState('hide');
                  console.error('>> onLoggedIn', e);
                  doc.dispatchEvent(connextLoggedIn);
                },
                onNotAuthorized: (e) => {
                  // this event fires on every Engage loading if user is logged out
                  console.error('>> onNotAuthorized', e);

                  toggleLoggedInState('hide');
                  toggleLoggedOutState('show');
                  doc.dispatchEvent(connextLoggedOut);
                },
                onMeterLevelSet: (e) => {
                  console.error('>> onMeterLevelSet', e);
                },
                onAuthorized: (e) => {
                  // this event fires on every Engage loading if user is logged in but doesn't have access to this product
                  console.error('>> onAuthorized', e);
                  toggleActivateLink('show');
                  doc.dispatchEvent(connextLoggedIn);
                },
                onHasNoActiveSubscription: (e) => {
                  // this event fires on every Engage loading if user is logged in but subscription is stopped or inactive
                  console.error('>> onHasNoActiveSubscription', e);
                  toggleActivateLink('show');
                },
                onHasAccessNotEntitled: (e) => {
                  // this event fires on every Engage loading if user is logged in
                  // and doesn't have access to this product but has access to another one
                  console.error('>> onHasAccessNotEntitled', e);
                },
                onHasAccess: (e) => {
                  // this event fires on every Engage loading if user is subscriber
                  console.error('>> onHasAccess', e);
                  toggleActivateLink('hide');
                  doc.dispatchEvent(connextIsSubscriber);
                },
              },
            },
          },
        ],
      }));
    });
  };
  // return null;
  // return (
  // <script type='text/javascript'>

  //     </script>
  // );
};

export default ConnextInit;
