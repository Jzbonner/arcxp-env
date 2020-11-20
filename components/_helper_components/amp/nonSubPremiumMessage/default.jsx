import React from 'react';
import './amp.scss';

const NonSubPremiumMessage = () => <div className="c-section" amp-access="Error != true AND UserState = 'LoggedOut' OR UserState = 'NoActiveSubscriptions'" amp-access-hide>
    <div className="c-contentElements">
        <div className="c-nonSubPremium">
            <div className="nonSubPromo">
                <div className="text">
                    <span className="subscription-headline">Support Our Journalists
                    </span>
                    <span className="thank-you-subscriber">The Atlanta Journal-Constitution’s journalists report what’s really going on in your community.
                    </span>
                    <div className="action-wrapper">
                      <a on="tap:amp-access.login-subscribeInMarket">Subscribe
                      </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>;

export default NonSubPremiumMessage;
