import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import fetchEnv from '../../global/utils/environment';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName';

const EngageAmpScript = ({ arcSite }) => {
  const currentEnv = fetchEnv();
  const envUrl = currentEnv === 'prod' ? '' : 'stage-';
  const { connext, cdnSite } = getProperties(arcSite);
  const {
    configCode, siteCode, activateAmpPaywallUrl, activateAmpInlineUrl, activateUrl,
  } = connext[currentEnv] || {};
  const domain = handleSiteName(cdnSite);
  return (
  <script id="amp-access" type="application/json" dangerouslySetInnerHTML={{
    __html: `{
      "type": "iframe",
      "iframeSrc": "https://${envUrl}mg2access.${domain}.com/accessIframe",
      "iframeVars": [
        "READER_ID",
        "CANONICAL_URL",
        "AMPDOC_URL",
        "SOURCE_URL",
        "DOCUMENT_REFERRER"
      ],
      "login":{
        "loginEmbedded": "https://${envUrl}mg2access.${domain}.com?siteCode=${siteCode}&configCode=${configCode}&flow=login&returnUrl=RETURN_URL&readerId=READER_ID&accessLevel=AUTHDATA(AccessLevel)",
        "activateEmbedded": "https://${envUrl}mg2access.${domain}.com?embedded=true&configCode=${configCode}&siteCode=${siteCode}&flow=activate&accessLevel=AUTHDATA(AccessLevel)&returnUrl=RETURN_URL&readerId=READER_ID&debug=true&allowSso=true",
        "SubscribeFromPaywall": "https://${envUrl}mg2access.${domain}.com?embedded=false&activatePageUrl=${activateAmpPaywallUrl || activateUrl}&configCode=${configCode}&siteCode=${siteCode}&flow=activate&accessLevel=AUTHDATA(AccessLevel)&returnUrl=RETURN_URL&readerId=READER_ID&debug=true&allowSso=true",
        "SubscribeFromInline": "https://${envUrl}mg2access.${domain}.com?embedded=false&activatePageUrl=${activateAmpInlineUrl || activateUrl}&configCode=${configCode}&siteCode=${siteCode}&flow=activate&accessLevel=AUTHDATA(AccessLevel)&returnUrl=RETURN_URL&readerId=READER_ID&debug=true&allowSso=true"
      },
      "siteCode": "${siteCode}",
      "configCode": "${configCode}",
      "defaultResponse": {
        "Error": false,
        "AccessLevel": ""
      },
      "authorizationFallbackResponse": {
        "Error": false,
        "AccessLevel": "Fallback_EmptyReaderId"
      }
    }`,
  }}>
  </script>
  );
};

EngageAmpScript.propTypes = {
  arcSite: PropTypes.string,
};

export default EngageAmpScript;
