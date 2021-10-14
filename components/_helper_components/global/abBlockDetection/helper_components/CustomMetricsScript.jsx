import React from 'react';
import getProperties from 'fusion:properties';
import { useFusionContext } from 'fusion:context';
import fetchEnv from '../../utils/environment';
import getContentMeta from '../../../global/siteMeta/_helper_functions/getContentMeta';

const CustomMetricsScript = () => {
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
        const generateEventType = (type) => {
          if (type === 'homepage') {
            return type;
          }
          if (type === 'section front') {
            return 'sectionpage';
          }
          return '';
        };
        const buildHeaderData = () => {
          let visitorId = '';
          let clientId = '';
          const connextLS = window.localStorage.getItem('${connextLSLookup}');
          if (window._gat) {
            visitorId = window._gat._getTrackerByName && window._gat._visitCode ? window._gat._getTrackerByName()._visitCode() : '';
          }
          if (connextLS) {
            const { CustomerRegistrationId } = JSON.parse(connextLS);
            clientId = CustomerRegistrationId;
          }
          const headers = {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin':'*',
            'mode': 'cors',
            'event' : generateEventType('${pageContentType}'),
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
          if (typeof window.google_tag_manager === 'undefined' || typeof window.GoogleAnalyticsObject === 'undefined') {
            return false;
          }
          return true;
        };
        const areAdsOn = () => {
          if (typeof window.googletag === 'undefined' || typeof window.pbjs === 'undefined' ) {
            return false;
          }
          return true;
        };
        window.addEventListener('connextConversationDetermined', () => {
            if ('${pageContentType}' === 'homepage' || '${pageContentType}' === 'section front' ) {
              fetch('${domainBlockerTracking}', {
                method: 'post',
                headers: buildHeaderData(),
              });
            }
        });`,
  }}></script>;
};

export default CustomMetricsScript;
