import React from 'react';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import fetchEnv from '../../global/utils/environment';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName';

const EngageAmpScript = ({ arcSite }) => {
  const currentEnv = fetchEnv();
  const { connext, cdnSite, cdnOrg } = getProperties(arcSite);
  const {
    configCode, siteCode,
  } = connext[currentEnv] || {};
  const domain = handleSiteName(cdnSite);
  return (
  <script id="amp-access" type="application/json" dangerouslySetInnerHTML={{
    __html: `{
      "type": "iframe",
      "iframeSrc": "https://${currentEnv === 'prod' ? currentEnv : 'stage'}-${cdnOrg}-amp-account-proxy-connext.azurewebsites.net/accessIframe",
      "iframeVars": [
        "READER_ID",
        "CANONICAL_URL",
        "AMPDOC_URL",
        "SOURCE_URL",
        "DOCUMENT_REFERRER"
      ],
      "login":{
        "loginEmbedded": "https://mg2access.${domain}.com?siteCode=${siteCode}&configCode=${configCode}&flow=login&returnUrl=RETURN_URL&readerId=READER_ID&accessLevel=AUTHDATA(AccessLevel)",
        "activateEmbedded": "https://mg2access.${domain}.com?embedded=true&configCode=${configCode}&siteCode=${siteCode}&flow=activate&accessLevel=AUTHDATA(AccessLevel)&returnUrl=RETURN_URL&readerId=READER_ID&debug=true&allowSso=true",
        "SubscribeInMarket": "https://mg2access.${domain}.com?embedded=false&activatePageUrl={{activatePageUrl}}&configCode=${configCode}&siteCode=${siteCode}&flow=activate&accessLevel=AUTHDATA(AccessLevel)&returnUrl=RETURN_URL&readerId=READER_ID&debug=true&allowSso=true",
        "SubscribeOutOfMarket": "https://mg2access.${domain}.com?embedded=false&activatePageUrl={{activatePageUrl}}&configCode=${configCode}&siteCode=${siteCode}&flow=activate&accessLevel=AUTHDATA(AccessLevel)&returnUrl=RETURN_URL&readerId=READER_ID&debug=true&allowSso=true"
      },
      "siteCode": "${siteCode.toLowerCase()}",
      "configCode": "prod",
      "defaultResponse": {"Error":true},
      "authorizationFallbackResponse": {"Error":true}
    }`,
  }}>
  </script>
  );
};

EngageAmpScript.propTypes = {
  arcSite: PropTypes.string,
};

export default EngageAmpScript;
