import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
// import getProperties from 'fusion:properties';
import mapTagStrings from './_helper_functions/mapTagStrings';
import getSponsorContent from './_helper_functions/getSponserContent';
import './default.scss';

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


  const siteData = useContent({
    source: 'site-api',
    query: { section: (sponsorSection && sponsorSection[0] && sponsorSection[0].path) || null },
  });

  const { Sponsor = {} } = siteData;

  const {
    sponsor_related_box_exclude_tags: excludeTags,
    sponsor_related_box_include_tags: includeTags,
    sponsor_related_box_must_include_all_tags: includeAllTags,
    sponsor_related_box_title: boxTitle,
  } = Sponsor;

  console.log('tags', excludeTags, includeTags, includeAllTags);


  const feed = useContent({
    source: 'query-feed',
    query: {
      includeTags: `${sponsorTags}`,
      // mustIncludeAllTags: '',
      excludeTags: `${excludeTags || ''}`,
    },
  });

  console.log('site', siteData);

  console.log('tags return from useContent', feed);

  const boxContent = getSponsorContent(5, feed, siteData && siteData.Sponsor);
  console.log('mapped sponsor content', boxContent);

  if (boxContent) {
    return (
      <div className={'c-sponsor-box'}>
        {boxTitle && <div className={'sponsor-header'}>
            {boxTitle}
        </div>}
        <ul className={'sponsor-content'}>
          {boxContent.map((el) => {
            if (el && el.url && el.headline) {
              return (
                <li className="sponsor-item">
                  <a href={el.url}>
                    <h3>{el.headline}</h3>
                  </a>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </div>
    );
  }

  return null;
};

SponsorRelatedBox.propTypes = {
  taxonomy: PropTypes.object,
};

export default SponsorRelatedBox;
