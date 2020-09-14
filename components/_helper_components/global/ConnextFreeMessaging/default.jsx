import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const ConnextFreeMessaging = ({
  sponsorID, sponsorMessage, sponsorName, paywallStatus,
}) => {
  if (paywallStatus === 'free') {
    if (!sponsorID || sponsorMessage === 'true' || sponsorName === '') {
      return <div className="free-story-messaging connext-free-messaging b-margin-bottom-d30-m20"></div>;
    }
    return null;
  }
  return null;
};

ConnextFreeMessaging.defaultProps = {
  componentName: 'ConnextInlinePromoSubscription',
};

ConnextFreeMessaging.propTypes = {
  sponsorID: PropTypes.string,
  sponsorMessage: PropTypes.string,
  sponsorName: PropTypes.string,
  paywallStatus: PropTypes.string,
};

export default ConnextFreeMessaging;
