import React from 'react';
import PropTypes from 'prop-types';
import './amp.scss';
import isOhioSite from '../connext/isOhioSite';

const ConnextThankYouMessage = ({ isAmp = false, siteFullname }) => {
  if (isAmp) {
    let thankYouMessage = `Thank you for subscribing to<br />The ${siteFullname}.`;
    if (isOhioSite(siteFullname)) {
      thankYouMessage = 'We can do this important work because of you. Thank you.';
    }
    return (
      <div amp-access="Error != true AND UserState = 'Subscribed'">
        <div className="subscription-promo">
          <div className="subscription-promo__option-2">
            <div className="text">
              <span className="subscription-headline">Our journalists are committed to pursuing the facts.</span>
              <span className="thank-you-subscriber" dangerouslySetInnerHTML={{ __html: thankYouMessage }}></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

ConnextThankYouMessage.defaultProps = {
  componentName: 'ConnextThankYouMessage',
};

ConnextThankYouMessage.propTypes = {
  isAmp: PropTypes.bool,
  siteFullname: PropTypes.string,
};

export default ConnextThankYouMessage;
