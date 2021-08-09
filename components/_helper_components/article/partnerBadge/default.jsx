import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import ImageSimple from '../../global/imageSimple/default';
import './default.scss';

const PartnerBadge = ({ sections, ampPage }) => {
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { partnerBadgeLogo, websiteURL } = getProperties(arcSite);

  return sections.map((section) => {
    const { path } = section || {};
    const isPartner = path === '/partner';
    if (isPartner) {
      return (
        <a href={`${websiteURL}/partner`} key={path} className="c-story-partnerBadge">
          <ImageSimple src={partnerBadgeLogo} ampPage={ampPage} alt="Partner Badge Logo" ampMobileHeight="57px" ampMobileMinWidth="228px" />
        </a>
      );
    }
    return null;
  });
};

PartnerBadge.static = true;

PartnerBadge.propTypes = {
  sections: PropTypes.array,
  ampPage: PropTypes.bool,
};

export default PartnerBadge;
