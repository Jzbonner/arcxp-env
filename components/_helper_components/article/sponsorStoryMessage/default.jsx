import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import './default.scss';

const SponsorStoryMessage = ({ sponsorID }) => {
  if (!sponsorID) {
    return null;
  }

  const data = useContent({
    source: 'site-api',
    query: { section: `${sponsorID}` },
  });

  if (data && data.Sponsor) {
    const { disable_access_brought_to_you_by_message: sponsorMessage } = data && data.Sponsor ? data.Sponsor : {};
    const { advertiser_name: sponsorName } = data && data.Sponsor ? data.Sponsor : {};
    if (sponsorMessage === 'false' && sponsorName) {
      return (
        <div className="c-freeSponsoredMsg b-margin-bottom-d30-m20">
          <h2 className="headline">{`Access to this AJC content is brought to you by our sponsor, ${sponsorName}`}</h2>
        </div>
      );
    } return null;
  } return null;
};

SponsorStoryMessage.propTypes = {
  sponsorID: PropTypes.string,
};

export default SponsorStoryMessage;
