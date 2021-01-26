import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../../utils/environment';
import getContentMeta from '../../../global/siteMeta/_helper_functions/getContentMeta';
import getDomainEndpoint from '../helper_functions/getDomainEndpoint';


const BlockDetectionScript = (uuid = '', pageUrl = '') => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const contentMeta = getContentMeta();
  const currentEnv = fetchEnv();

  console.log('pageUrl', pageUrl);
  console.log('uuid', uuid);

  const { connext, metrics } = getProperties(arcSite) || {};

  const {
    environment,
    siteCode,
    configCode,
  } = connext[currentEnv] || {};

  const {
    pageContentType, site,
  } = contentMeta;

  const domainEndpoint = getDomainEndpoint(arcSite);
  const connextLSLookup = `connext_user_data_${siteCode}_${configCode}_${environment.toUpperCase()}`;
  console.log('connext lookup string', connextLSLookup);

  return <script type='text/javascript' dangerouslySetInnerHTML={{
    __html: `
        const docu = window.document;
        const docuBody = docu.querySelector('body');
        console.log('this is working');

        const getUserPaywallBlockerState = () => {
          const numberOfArticlesLeft = window.Connext.Storage.GetArticlesLeft();
          const paywallEl = doc.getElementById('paywallContainer');
          const paywallElDisplay = paywallEl ? window.getComputedStyle(paywallEl, null).display : null;

          if(numberOfArticlesLeft === 0 && (!paywallEl || paywallElDisplay === "none")){
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

          console.log('event string', evtString);
          return evtString;
        };

        const buildHeaderData = (blockerStates) => {
          let visitorId = null;
          let clientId = null;
          const connextLS = window.localStorage.getItem('${connextLSLookup}');

          console.log('connext ls', connextLS);
          if (connextLS) {
            const { CustomerRegistrationId } = JSON.parse(connextLS);
            clientId = CustomerRegistrationId;
            console.log('customr id', CustomerRegistrationId, 'clientId', clientId);
          }

          console.log('blocker state', blockerStates);
          const headers = {
            'Content-Type' : 'application/json',
            'event' : generateEventString(blockerStates),
            'page' : '${pageUrl}',
            'referer' : 'docu.referrer',
            'contenttype' : '${pageContentType}',
            'contentid' : '${uuid}',
            'clientid' :  clientId || '',
            'visitorid' : '',
            'siteversion' : 'responsive',
            'siteid' : '${metrics && metrics.siteID ? metrics.siteID : site}',
            'useragent' : navigator.userAgent
          }

          return headers;
        };

        window.addEventListener('connextConversationDetermined', () => {
          console.log('running event');
            const baitElementDisplay = window.getComputedStyle(document.getElementById('ADS_2'), null).display;

            const hasAdBlocker = baitElementDisplay === 'none' ? true : false;
            const hasPrivacyBlocker = typeof window.google_tag_manager === 'undefined' ? true : false;
            const hasPaywallBlocker = getUserPaywallBlockerState();

            window.ga(function(tracker) {
              const visitorId = tracker.get('clientId');
              console.log('visitor id', visitorId);
            });

            console.log('hasAdBlocker', hasAdBlocker, 'hasPrivacyBlocker', hasPrivacyBlocker, 'hasPaywallBlocker', hasPaywallBlocker);

            console.log('here are the headers', buildHeaderData({ hasAdBlocker, hasPrivacyBlocker, hasPaywallBlocker }));
            console.log('here is the domain', '${domainEndpoint}');
/*           fetch('${domainEndpoint}', {
            method: 'post',
            headers: buildHeaderData({ hasAdBlocker, hasPrivacyBlocker, hasPaywallBlocker }),
          }); */
        });`,
  }}></script>;
};

BlockDetectionScript.propTypes = {
  pageUrl: PropTypes.string,
  uuid: PropTypes.string,
};

export default BlockDetectionScript;
