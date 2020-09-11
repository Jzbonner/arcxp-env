import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import './default.scss';

const ConnextFreeMessaging = ({ sponsorID }) => {
  const data = useContent({
    source: 'site-api',
    query: { section: `${sponsorID}` },
  });
  const { disable_access_brought_to_you_by_message: sponsorMessage } = data && data.Sponsor ? data.Sponsor : {};
  const { advertiser_name: sponsorName } = data && data.Sponsor ? data.Sponsor : {};

  if (!sponsorID || sponsorMessage === 'true' || sponsorName === '') {
    return <div className="free-story-messaging connext-free-messaging b-margin-bottom-d30-m20"></div>;
  } return null;
};

ConnextFreeMessaging.defaultProps = {
  componentName: 'ConnextInlinePromoSubscription',
};

ConnextFreeMessaging.propTypes = {
  sponsorID: PropTypes.string,
};

export default ConnextFreeMessaging;
