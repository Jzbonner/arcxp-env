import React from 'react';
import './amp.scss';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import fetchEnv from '../../global/utils/environment';
import handleSiteName from '../../../layouts/_helper_functions/handleSiteName';

const NonSubPremiumMessage = ({ arcSite }) => {
  const currentEnv = fetchEnv();
  const envUrl = currentEnv === 'prod' ? '' : 'stage-';
  const { connext, cdnSite } = getProperties(arcSite);
  const {
    configCode, siteCode, activateUrl,
  } = connext[currentEnv] || {};
  const domain = handleSiteName(cdnSite);
  return (<div className="c-section" amp-access="Error != true AND UserState = 'LoggedOut' OR UserState = 'NoActiveSubscriptions'" amp-access-hide>
      <div className="c-contentElements">
          <div className="inline-script-embed-container subscription-promo">
              <div className="subscription-promo__option-2">
                  <div className="text">
                      <span className="subscription-headline">Support Our Journalists
                      </span>
                      <span className="thank-you-subscriber">The Atlanta Journal-Constitution’s journalists report what’s really going on in your community.
                      </span>
                          <div className="action-wrapper">
                              <a
                              target="_self"
                              href={`https://${envUrl}mg2access.${domain}.com?embedded=false&activatePageUrl=${activateUrl}&configCode=${configCode}&siteCode=${siteCode}&flow=activate&accessLevel=AUTHDATA(AccessLevel)&returnUrl=RETURN_URL&readerId=READER_ID&debug=true&allowSso=true`}>Subscribe</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  );
};

NonSubPremiumMessage.propTypes = {
  arcSite: PropTypes.string,
};

export default NonSubPremiumMessage;
