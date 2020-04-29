import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import './default.scss';

const SponsorBanner = ({ taxonomy }) => {
  const { sections: articleSections } = taxonomy || {};
  const { minTabletViewWidth } = getProperties();
  const [currentWidth, setWidth] = useState();
  let sponsorSection;
  let sponsorSectionName = null;

  useEffect(() => {
    const width = window.innerWidth;
    setWidth(width);
  });

  if (articleSections) {
    sponsorSection = articleSections.filter(section => section.path.includes('/sponsor/'));
    sponsorSectionName = sponsorSection ? sponsorSection[0].path : null;
  }
  if (!sponsorSectionName) {
    return null;
  }

  const data = useContent({
    source: 'site-api',
    query: { section: `${sponsorSectionName}` },
  });

  if (data) {
    const { sponsor_desktop_banner: desktopBanner, sponsor_mobile_banner: mobileBanner, sponsor_url: bannerURL } = data && data.Sponsor;
    const checkForMobileBanner = mobileBanner || desktopBanner;
    return (
      <div className="c-sponsorBanner b-margin-bottom-d40-m20 b-margin-top-d40-m20">
        <a href={bannerURL} className="c-sponsorUrl" rel="noopener noreferrer" target="_blank"></a>
        <img
          src={currentWidth < minTabletViewWidth ? checkForMobileBanner : desktopBanner}
          className="c-sponsorImg"
        />
      </div>
    );
  }
  return null;
};

SponsorBanner.propTypes = {
  taxonomy: PropTypes.object,
};

export default SponsorBanner;
