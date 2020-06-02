import React from 'react';
import PropTypes from 'prop-types';
import SponsorBanner from '../../_helper_components/article/sponsorBanner/default';

const SponsorBannerFeature = (props) => {
  const { customFields: { sponsorID } } = props;
  return (
    <SponsorBanner sponsorID={sponsorID}/>
  );
};

SponsorBannerFeature.propTypes = {
  customFields: PropTypes.shape({
    sponsorID: PropTypes.string.tag({
      name: 'Sponsor ID',
      defaultValue: '',
    }),
  }),
};

export default SponsorBannerFeature;
