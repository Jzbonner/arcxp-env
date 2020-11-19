import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import ConnextFreeMessaging from '../../global/ConnextFreeMessaging/default';
import './default.scss';

const SponsorStoryMessage = ({ sponsorID, paywallStatus, isAmp = false }) => {
  if (paywallStatus !== 'free') return null;

  if (!sponsorID) return <ConnextFreeMessaging isAmp={isAmp}/>;

  const data = useContent({
    source: 'site-api',
    query: { section: `${sponsorID}` },
  });

  if (data && data.Sponsor) {
    const { disable_access_brought_to_you_by_message: sponsorMessage } = data.Sponsor || {};
    const { advertiser_name: sponsorName } = data.Sponsor || {};
    if (sponsorMessage === 'false' && sponsorName) {
      return (
        <div className="c-freeSponsoredMsg b-margin-bottom-d30-m20">
          <h2 className="headline">{`Access to this AJC content is brought to you by our sponsor, ${sponsorName}`}</h2>
        </div>
      );
    }
    return (
      <ConnextFreeMessaging sponsorMessage={sponsorMessage} sponsorName={sponsorName} sponsorID={sponsorID} isAmp={isAmp} />
    );
  }

  return <ConnextFreeMessaging isAmp={isAmp} />;
};

SponsorStoryMessage.propTypes = {
  sponsorID: PropTypes.string,
  paywallStatus: PropTypes.string,
  isAmp: PropTypes.bool,
};

export default SponsorStoryMessage;
