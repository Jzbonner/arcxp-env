import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import getContentMeta from '../../../global/siteMeta/_helper_functions/getContentMeta';
import getDomainEndpoint from '../helper_functions/getDomainEndpoint';


const BlockDetectionScript = (uuid = '', pageUrl = '') => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const contentMeta = getContentMeta();

  const { metrics } = getProperties(arcSite) || {};

  const {
    pageContentType, site,
  } = contentMeta;

  const domainEndpoint = getDomainEndpoint(arcSite);

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

        const generateEventString = ({ adBlocker, privacyBlocker, paywallBlocker}) => {
          let evtString = '';

          if (adBlocker) {
            evtString += 'AdBlocker';
          }

          if (privacyBlocker) {
            evtString += evtString.length > 0 ? '_PrivacyBlocker' : 'PrivacyBlocker'';
          }

          if (paywallBlocker) {
            evtString += evtString.length > 0 ? '_PaywallBlocker' : 'PaywallBlocker'';
          }

          return evtString;
        };

        const buildHeaderData = (blockerStates) => {
          const postHeaders = new Headers();
          postHeaders.append('Content-Type', 'application/json');
          postHeaders.append('event', generateEventString(blockerStates));
          postHeaders.append('page', ${pageUrl});
          postHeaders.append('referer', docu.referrer || '');
          postHeaders.append('contenttype', ${pageContentType});
          postHeaders.append('contentid', ${uuid});
          postHeaders.append('clientid', '');
          postHeaders.append('visitorid', '');
          postHeaders.append('siteversion', 'responsive');
          postHeaders.append('siteid', ${metrics && metrics.siteID ? metrics.siteID : site} );
          postHeaders.append('useragent', navigator.userAgent);

          return postHeaders;

        }

        window.addEventListener('connextConversationDetermined', () => {
          console.log('running event');
            const baitElementDisplay = window.getComputedStyle(document.getElementById('ADS_2'), null).display;

            const hasAdBlocker = baitElementDisplay === 'none' ? true : false;
            const hasPrivacyBlocker = typeof window.google_tag_manager === 'undefined' ? true : false;
            const hasPaywallBlocker = getUserPaywallBlockerState();

            console.log('hasAdBlocker', hasAdBlocker, 'hasPrivacyBlocker', hasPrivacyBlocker, 'hasPaywallBlocker', hasPaywallBlocker);

          fetch(${domainEndpoint}, {
            method: 'post',
            headers: buildHeaderData({ hasAdBlocker, hasPrivacyBlocker, hasPaywallBlocker }),
          });
        });`,
  }}></script>;
};

BlockDetectionScript.propTypes = {
  pageUrl: PropTypes.string,
  uuid: PropTypes.string,
};

export default BlockDetectionScript;
