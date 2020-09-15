import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const ConnextFreeMessaging = ({
  sponsorID, sponsorMessage, sponsorName,
}) => {
  if (!sponsorID || sponsorMessage === 'true' || sponsorName === '') {
    return <div className="free-story-messaging connext-free-messaging b-margin-bottom-d30-m20"></div>;
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
};

export default ConnextFreeMessaging;
