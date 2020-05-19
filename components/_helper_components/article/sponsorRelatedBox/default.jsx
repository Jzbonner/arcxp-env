// import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
// import getProperties from 'fusion:properties';
import mapTagStrings from './_helper_functions/mapTagStrings';
// import './default.scss';

const SponsorRelatedBox = ({ taxonomy }) => {
  const { sections: articleSections, tags } = taxonomy || {};
  let isSponsor;
  let sponsorTags = null;

  if (articleSections) {
    isSponsor = articleSections.filter(section => section && section.path && section.path.includes('/sponsor/'));
    // sponsorTags = isSponsor && isSponsor[0] && isSponsor[0].tags ? isSponsor[0].path : null;
  }
  if (!isSponsor) {
    console.log('not a sponsor article');
    return null;
  }

  sponsorTags = tags && tags.length >= 1 ? mapTagStrings([...tags]) : null;

  console.log('sponsorTags', sponsorTags);

  const data = useContent({
    source: 'query-feed',
    query: { includeTags: `${sponsorTags}` },
  });

  console.log('tags return from useContent', data);
  /*
    if (data && data.Sponsor) {
      const { sponsor_desktop_banner: desktopBanner, sponsor_mobile_banner: mobileBanner, sponsor_url: bannerURL } = data && data.Sponsor;

      if (desktopBanner) {
        return (
          <div></div>
        );
      }
    } */
  return null;
};

SponsorRelatedBox.propTypes = {
  taxonomy: PropTypes.object,
};

export default SponsorRelatedBox;
