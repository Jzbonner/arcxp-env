import React from 'react';
import PropTypes from 'prop-types';
import './amp.scss';

const ConnextThankYouMessage = (isAmp = false) => {
  if (isAmp) {
    return (
      <div amp-access="Error != true AND UserState = 'Subscribed'">
        <div className="subscription-promo">
          <div className="subscription-promo__option-2">
            <div className="text">
              <span className="subscription-headline">Our journalists are committed to pursuing the facts.</span>
              <span className="thank-you-subscriber">Thank you for subscribing to<br />The Atlanta Journal-Constitution.</span>
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
};

export default ConnextThankYouMessage;
