import React from 'react';
import './amp.scss';

const NonSubPremiumMessage = () => <div amp-access="Error != true AND UserState = 'LoggedOut' OR UserState = 'NoActiveSubscriptions'" amp-access-hide>
    <div className="inline-script-embed-container subscription-promo">
        <div className="subscription-promo__option-2">
            <div className="text">
                <span className="subscription-headline">Support Our Journalists
                </span>
                <span className="thank-you-subscriber">The Atlanta Journal-Constitution’s journalists report what’s really going on in your community.
                </span>
            </div>
        </div>
    </div>
</div>;

export default NonSubPremiumMessage;
