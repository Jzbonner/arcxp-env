import React from 'react';
import PropTypes from 'prop-types';
import getSponsorData from '../../../layouts/_helper_functions/getSponsorData';

const Story = ({
  sponsor = {}, el, i, length,
}) => {
  const { sponsorName: sponsorContentLabel, disableSponsorRelatedBox } = getSponsorData(el.sections, true) || {};
  const { sponsor_url: sponsorUrl, sponsor_url_title: sponsorHeadline, disable_advertiser_content_label: disableAd } = sponsor;

  // For up to first 4 items
  if (i <= 3 && i < length - 1) {
    return (
      <li key={`sp-item-${i}`} className={`sponsor-item
          ${sponsorContentLabel && !disableSponsorRelatedBox ? 'enabled' : ''}`}>
        <a href={el.url}>
          <h2>{el.headline}</h2>
        </a>
      </li>
    );
  }

  // For 5th or last item.
  if (sponsorHeadline) {
    return (
      <li key={`sp-item-${i}`} className={`sponsor-item
      ${disableAd === 'false' ? 'enabled' : ''}`}>
        <a href={sponsorUrl}>
          <h2>{sponsorHeadline}</h2>
        </a>
      </li>
    );
  }

  return null;
};

Story.propTypes = {
  length: PropTypes.number,
  sponsor: PropTypes.object,
  el: PropTypes.object,
  i: PropTypes.number,
};

export default Story;
