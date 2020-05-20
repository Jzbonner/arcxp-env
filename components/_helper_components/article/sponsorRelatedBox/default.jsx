import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
// import getProperties from 'fusion:properties';
import mapTagStrings from './_helper_functions/mapTagStrings';
import getSponsorContent from './_helper_functions/getSponserContent';
// import './default.scss';

const SponsorRelatedBox = ({ taxonomy }) => {
  const { sections: articleSections, tags } = taxonomy || {};
  let sponsorSection;
  let sponsorTags = null;

  if (articleSections) {
    sponsorSection = articleSections.filter(section => section && section.path && section.path.includes('/sponsor/'));
    console.log('articleSections', sponsorSection);
  }
  if (!sponsorSection) {
    console.log('not a sponsor article');
    return null;
  }

  sponsorTags = tags && tags.length >= 1 ? mapTagStrings([...tags]) : null;

  console.log('sponsorTags', sponsorTags);
  console.log('sponsor section', sponsorSection);

  const feed = useContent({
    source: 'query-feed',
    query: { includeTags: `${sponsorTags}` },
  });

  const siteData = useContent({
    source: 'site-api',
    query: { section: sponsorSection[0].path || null },
  });

  console.log('site', siteData);

  console.log('tags return from useContent', feed);

  const boxContent = getSponsorContent(5, feed, siteData.Sponsor);
  console.log('mapped sponsor content', boxContent);

  if (boxContent) {
    return (
      <div className={'c-sponsor-box'}>
        <div className={'sponsor-header'}>

        </div>
        <div className={'sponsor-content'}>

        </div>
      </div>
    );
  }
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
