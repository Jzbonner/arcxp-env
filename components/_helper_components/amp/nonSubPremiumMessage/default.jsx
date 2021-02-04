import React from 'react';
import PropTypes from 'prop-types';
import './amp.scss';

const NonSubPremiumMessage = ({ siteFullname }) => (
  <div className="c-section" amp-access="Error!=true AND UserState='LoggedOut' OR UserState='NoActiveSubscriptions'" amp-access-hide>
    <div className="c-contentElements">
        <div className="c-nonSubPremium">
            <div className="nonSubPromo">
                <div className="text">
                    <span className="subscription-headline">Support Our Journalists
                    </span>
                    <span className="thank-you-subscriber">The {siteFullname}’s journalists report what’s really going on in your community.</span>
                    <div className="action-wrapper">
                      <a on="tap:amp-access.login-SubscribeFromInline">Subscribe
                      </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
);

NonSubPremiumMessage.propTypes = {
  siteFullname: PropTypes.string,
};

export default NonSubPremiumMessage;
