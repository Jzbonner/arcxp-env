import React from 'react';
import PropTypes from 'prop-types';
import './default.scss';
import isOhioSite from '../connext/isOhioSite';

const ConnextFreeMessaging = ({
  sponsorID, sponsorMessage, sponsorName, isAmp = false, siteFullname,
}) => {
  if (!isAmp && (!sponsorID || sponsorMessage === 'true' || sponsorName === '')) {
    return <div className="free-story-messaging connext-free-messaging b-margin-bottom-d30-m20"></div>;
  }

  if (isAmp && (!sponsorID || sponsorMessage === 'true' || sponsorName === '') && siteFullname) {
    let freeText = `The ${siteFullname}’s journalists follow the facts, because you deserve to know what’s really going on.`;
    if (isOhioSite(siteFullname)) {
      freeText = `The ${siteFullname} is providing this story free to all readers. Please support in-depth local journalism by subscribing today.`;
    }
    return (
      <div amp-access="Error != true" className="connext-free-messaging">
        <div className="c-freeMessaging">
          <div className="free-messaging-border">
            <span className="free-messaging-text">{freeText}</span>
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
