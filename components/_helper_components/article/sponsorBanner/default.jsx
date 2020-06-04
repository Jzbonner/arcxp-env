import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getProperties from 'fusion:properties';
import './default.scss';

const SponsorBanner = ({ sponsorID, ampPage }) => {
  const { minTabletViewWidth } = getProperties();
  const [currentWidth, setWidth] = useState();
  useEffect(() => {
    const width = window.innerWidth;
    setWidth(width);
  }, []);

  if (!sponsorID) {
    return null;
  }

  const data = useContent({
    source: 'site-api',
    query: { section: `${sponsorID}` },
  });

  if (data && data.Sponsor) {
    const { sponsor_desktop_banner: desktopBanner, sponsor_mobile_banner: mobileBanner, sponsor_url: bannerURL } = data && data.Sponsor;
    const checkForMobileBanner = mobileBanner || desktopBanner;
    if (ampPage && checkForMobileBanner) {
      return (
        <a href={bannerURL}><amp-img height='1' width='1.75' src={checkForMobileBanner} layout='responsive'/></a>);
    }
    if (desktopBanner) {
      return (
        <div className="c-sponsorBanner b-margin-bottom-d40-m20 b-margin-top-d40-m20">
          {bannerURL ? (
            <a href={bannerURL} className="c-sponsorUrl" rel="noopener noreferrer" target="_blank"></a>
          ) : null}
          <img
            src={currentWidth < minTabletViewWidth ? checkForMobileBanner : desktopBanner}
            className="c-sponsorImg"
          />
        </div>
      );
    }
  }
  return null;
};

SponsorBanner.propTypes = {
  sponsorID: PropTypes.string,
  ampPage: PropTypes.bool,
};

export default SponsorBanner;
