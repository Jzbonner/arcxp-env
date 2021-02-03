import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';

const ConnextFreeMessaging = ({
  sponsorID, sponsorMessage, sponsorName, isAmp = false, siteFullname,
}) => {
  if (!isAmp && (!sponsorID || sponsorMessage === 'true' || sponsorName === '')) {
    return <div className="free-story-messaging connext-free-messaging b-margin-bottom-d30-m20"></div>;
  }

  if (isAmp && (!sponsorID || sponsorMessage === 'true' || sponsorName === '')) {
    return (
      <div amp-access="Error != true" className="connext-free-messaging">
        <div className="c-freeMessaging">
          <div className="free-messaging-border">
            <span className="free-messaging-text">The {siteFullname}’s journalists follow the facts, because you deserve to know what’s really going on. </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

ConnextFreeMessaging.propTypes = {
  isAmp: PropTypes.bool,
  sponsorID: PropTypes.string,
  sponsorMessage: PropTypes.string,
  sponsorName: PropTypes.string,
  siteFullname: PropTypes.string,
};

export default ConnextFreeMessaging;
