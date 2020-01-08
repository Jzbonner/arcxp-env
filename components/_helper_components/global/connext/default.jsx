import React from 'react';
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
  return null;
    // return (
    //   <script type="text/javascript">
    //       let mg2Logout = function(e)  {
    //         console.error('called logout');
    //       	function delete_cookie(name) {
    //       	  document.cookie = name + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT";
    //       	  document.cookie = name + "=;path=/;domain="+location.host+";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    //       	  document.cookie = name + "=;path=/;domain=."+location.host+";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    //       	  let arr = location.host.split(".");
    //       	  let rootdomain = arr[arr.length-2]+ "." + arr[arr.length-1];
    //       	  document.cookie = name + "=;path=/;domain="+rootdomain+";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    //       	  document.cookie = name + "=;path=/;domain=."+rootdomain+";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    //       	}
    //       	delete_cookie("igmAuth");
    //       	delete_cookie("igmContent");
    //       	delete_cookie("igmRegID");
    //       	//Engage.Run();
    //       	window.Connext.Logout();
    //       };
    //
    //       (function() {
    //       	let loggedOutState = document.querySelectorAll(".nav-auth__anon-user"),
    //       	    loggedInState = document.querySelectorAll(".nav-auth__authed-user"),
    //       	    activationLinks = document.querySelectorAll(".MG2activation"),
    //       	    myAccountLinks = document.querySelectorAll(".MG2MyAccount"),
    //       	    showThisEl = function(el) {
    //       		    el.style.display = 'block';
    //                   el.className = el.className.replace('hidden', ' ');
    //         		},
    //         		hideThisEl = function(el) {
    //         			el.style.display = 'none';
    //                     if (el.className.indexOf('hidden') === -1) {
    //                       el.className += ' hidden';
    //                     }
    //         		},
    //         		toggleActivateLink = function(showOrHide) {
    //         			if (showOrHide === 'show') {
    //                         activationLinks.forEach(function(child) {
    //         	    		    showThisEl(child);
    //         	    		});
    //         			} else {
    //         				activationLinks.forEach(function(child) {
    //                             hideThisEl(child);
    //                         });
    //         			}
    //       	    },
    //       	    toggleLoggedInState = function(showOrHide) {
    //       	    	if (showOrHide === 'show') {
    //       	    		loggedInState.forEach(function(child) {
    //       	    			showThisEl(child);
    //       	            });
    //       	    	} else {
    //       	    		loggedInState.forEach(function(child) {
    //                           hideThisEl(child);
    //                       });
    //       	    	}
    //       	    },
    //       	    toggleLoggedOutState = function(showOrHide) {
    //       	    	if (showOrHide === 'show') {
    //       	    		loggedOutState.forEach(function(child) {
    //       	    			showThisEl(child);
    //       	            });
    //       	    	} else {
    //       	    		loggedOutState.forEach(function(child) {
    //       	    			hideThisEl(child);
    //                       });
    //       	    	}
    //       	    };
    //
    //       	var connextLoaded = new Event('connextLoaded'),
    //       	   connextLoggedIn = new Event('connextLoggedIn'),
    //       	   connextLoggedOut = new Event('connextLoggedOut'),
    //       	   connextIsSubscriber = new Event('connextIsSubscriber');
    //
    //       	document.addEventListener('conextLoaded', function() {
    //       		console.error('dave - connextLoaded in init');
    //       	});
    //       	document.addEventListener('DOMContentLoaded', function() {
    //       	// console.error('>> domcontentloaded');
    //
    //       	let loadConnext = Promise.resolve(MG2Loader.init({
    //       	  plugins: [
    //       	    {
    //       	      name: 'FP',
    //       	      initOptions: {
    //       	        version: clientCode || '1.0',
    //       	        environment: environment,
    //       	      },
    //       	    }, {
    //       	      name: 'DL',
    //       	      initOptions: {
    //       	        environment: environment,
    //       	        version: clientCode,
    //       	        collectors: ['connext'],
    //       	        tagManager: tabManager,
    //       	        containerId: containerId,
    //       	      },
    //       	    },{
    //       	        name: 'NXT',
    //       	        initOptions: {
    //       	          clientCode: clientCode,
    //       	          environment: environment,
    //       	          siteCode: siteCode,
    //       	          configCode: configCode,
    //       	          debug: debug,
    //       	          silentmode: false,
    //       	          publicEventHandlers: {
    //       	            onActionClosed: function(e) { console.error('>> onActionClosed', e); },
    //       	            onActionShown: function(e) { console.error('>> onActionShown', e); },
    //       	            onButtonClick: function(e) { console.error('>> onButtonClick', e); },
    //       	            onCampaignFound: function(e) { console.error('>> onCampaignFound', e); },
    //       	            onConversationDetermined: function(e) { console.error('>> onConversationDetermined', e); },
    //       	            onCriticalError: function(e) { console.error('>> onCriticalError', e); },
    //       	            onDebugNote: function(e) { console.error('>> onDebugNote', e); },
    //       	            onInit: function(e) {
    //       	          	    console.error('>> onInit', e);
    //       	          	    document.querySelectorAll('.js-auth-logout').forEach(function(el) {
    //       	          	    	el.addEventListener('click', mg2Logout);
    //       	          	    });
    //       	          	    document.dispatchEvent(connextLoaded);
    //       	            },
    //       	            onLoggedIn: function(e) {
    //                           toggleLoggedInState('show');
    //                           toggleLoggedOutState('hide');
    //                           console.error('>> onLoggedIn', e);
    //                           document.dispatchEvent(connextLoggedIn);
    //       	            },
    //       	            onNotAuthorized: function(e) {
    //       	                //this event fires on every Engage loading if user is logged out
    //       	                console.error('>> onNotAuthorized', e);
    //
    //       	                toggleLoggedInState('hide');
    //       	                toggleLoggedOutState('show');
    //                           document.dispatchEvent(connextLoggedOut);
    //       	            },
    //       	            onMeterLevelSet: function(e) {
    //       	            	console.error('>> onMeterLevelSet', e);
    //       	            },
    //       	            onAuthorized: function(e) {
    //       	            	//this event fires on every Engage loading if user is logged in but doesn't have access to this product
    //       	                console.error('>> onAuthorized', e);
    //       	                toggleActivateLink('show');
    //                           document.dispatchEvent(connextLoggedIn);
    //       	            },
    //       	            onHasNoActiveSubscription: function(e) {
    //       	              //this event fires on every Engage loading if user is logged in but his subscription is stopped or inactive
    //       	              console.error('>> onHasNoActiveSubscription', e);
    //       	              toggleActivateLink('show');
    //
    //       	            },
    //       	            onHasAccessNotEntitled: function(e) {
    //       	              //this event fires on every Engage loading if user is logged in but doesn't have access to this product and has access to another one
    //       	            	console.error('>> onHasAccessNotEntitled', e);
    //       	            },
    //       	            onHasAccess: function(eventData) {
    //       	              //this event fires on every Engage loading if user is subscriber
    //       	            	console.error('>> onHasAccess', eventData);
    //       	            	toggleActivateLink('hide');
    //                           document.dispatchEvent(connextIsSubscriber);
    //       	            }
    //       	          },
    //       	        },
    //       	      }
    //       	    ]
    //       	  })
    //       	);
    //       	});
    //       })();
    //     </script>
    // );
};

export default ConnextInit;
