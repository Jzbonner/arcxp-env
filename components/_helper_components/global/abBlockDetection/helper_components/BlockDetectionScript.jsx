import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../../utils/environment';
import getContentMeta from '../../../global/siteMeta/_helper_functions/getContentMeta';

const BlockDetectionScript = () => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const contentMeta = getContentMeta();
  const currentEnv = fetchEnv();
  const { connext, metrics, domainBlockerTracking } = getProperties(arcSite) || {};

  const {
    environment,
    siteCode,
    configCode,
  } = connext[currentEnv] || {};

  const {
    contentId, pageContentType, site, url,
  } = contentMeta;

  const connextLSLookup = `connext_user_data_${siteCode}_${configCode}_${environment.toUpperCase()}`;

  return <script type='text/javascript' dangerouslySetInnerHTML={{
    __html: `
        const docu = window.document;
        const docuBody = docu.querySelector('body');
        const getUserPaywallBlockerState = () => {
          const numberOfArticlesLeft = window.Connext.Storage.GetArticlesLeft();
          const paywallEl = doc.getElementById('paywallContainer');
          const paywallElDisplay = paywallEl ? window.getComputedStyle(paywallEl, null).display : null;
          if(numberOfArticlesLeft === 0 && paywallElDisplay === "none"){
            return true;
          } else {
            return false
          } 
        };
        const generateEventString = ({ hasAdBlocker, hasPrivacyBlocker, hasPaywallBlocker}) => {
          let evtString = '';
          console.log('abBlocker state', hasAdBlocker);
          if (hasAdBlocker) {
            evtString += 'AdBlocker';
          }
          if (hasPrivacyBlocker) {
            evtString += evtString.length > 0 ? '_PrivacyBlocker' : 'PrivacyBlocker';
          }
          if (hasPaywallBlocker) {
            evtString += evtString.length > 0 ? '_PaywallBlocker' : 'PaywallBlocker';
          }
          return evtString;
        };
        const buildHeaderData = (blockerStates) => {
          let visitorId = '';
          let clientId = '';
          const connextLS = window.localStorage.getItem('${connextLSLookup}');
          if (window._gat) {
            visitorId = _gat._getTrackerByName()._visitCode();
          }
          if (connextLS) {
            const { CustomerRegistrationId } = JSON.parse(connextLS);
            clientId = CustomerRegistrationId;
          }
          const headers = {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin':'*',
            'mode': 'cors',
            'event' : generateEventString(blockerStates),
            'page' : '${url}',
            'referer' : document.referrer,
            'contenttype' : '${pageContentType}',
            'contentid' : '${contentId}',
            'clientid' :  clientId,
            'visitorid' : visitorId,
            'siteversion' : 'responsive',
            'siteid' : '${metrics && metrics.siteID ? metrics.siteID : site}',
            'useragent' : navigator.userAgent
          };

          return headers;
        };
        const isTrackingOn = () => {
          console.log('tracking func is running');
          console.log('window.canAnalyze', window.canAnalyze);
          if (typeof window.canAnalyze === 'undefined') {
            return false;
          }
          return true;
        };
        const areAdsOn = () => {
          console.log('ad checking func is running');
          console.log('window.canRunAds', window.canRunAds);
          if (typeof window.canRunAds === 'undefined') {
            return false;
          }
          return true;
        };
        const getAdBlockerState = (baitElementDisplay) => {
          let adBlockerOn = false;

          if (baitElementDisplay === 'none' || !areAdsOn()) {
            adBlockerOn = true;
          } 
        
          return adBlockerOn;
        };
        const getPrivacyBlockerState = () => {
          let isTrackingBlocked = false;

          if (typeof window.google_tag_manager === 'undefined' || !isTrackingOn()) {
            isTrackingBlocked = true;
          }

          return isTrackingBlocked;
        };
        window.addEventListener('connextConversationDetermined', () => {
            const baitElementDisplay = window.getComputedStyle(document.getElementById('ADS_2'), null).display;
            const hasAdBlocker = getAdBlockerState(baitElementDisplay);
            const hasPrivacyBlocker = getPrivacyBlockerState();
            const hasPaywallBlocker = getUserPaywallBlockerState();
            if (hasAdBlocker || hasPrivacyBlocker || hasPaywallBlocker) {
              fetch('${domainBlockerTracking}', {
                method: 'post',
                headers: buildHeaderData({ hasAdBlocker, hasPrivacyBlocker, hasPaywallBlocker }),
              });
            }
        });`,
  }}></script>;
};

export default BlockDetectionScript;
