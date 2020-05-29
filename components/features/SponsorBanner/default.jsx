import React from 'react';
import PropTypes from 'prop-types';
import SponsorBanner from '../../_helper_components/article/sponsorBanner/default';

const SponsorBannerFeature = (props) => {
  const { customFields: { sectionID } } = props;
  return (
    <SponsorBanner sectionFeatureID={sectionID}/>
  );
};

SponsorBannerFeature.propTypes = {
  customFields: PropTypes.shape({
    sectionID: PropTypes.string.tag({
      name: 'Section ID',
      defaultValue: '/path',
    }),
  }),
};

export default SponsorBannerFeature;
