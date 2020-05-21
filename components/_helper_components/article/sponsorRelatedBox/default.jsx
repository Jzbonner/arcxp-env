import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
// import getProperties from 'fusion:properties';
import mapTagStrings from './_helper_functions/mapTagStrings';
import getSponsorContent from './_helper_functions/getSponserContent';
import ArcAd from '../../../features/ads/default';
import './default.scss';

const SP01 = () => <ArcAd staticSlot={'SP01'} key={'SP01'} />;

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
    disable_advertiser_content_label: disableAd,
  } = Sponsor;

  console.log('tags', excludeTags, includeTags, includeAllTags);


  const feed = useContent({
    source: 'query-feed',
    query: {
      includeTags: `${sponsorTags}`,
      mustIncludeAllTags: `${includeAllTags}`,
      excludeTags: `${excludeTags || ''}`,
    },
  });

  console.log('site', siteData);

  console.log('tags return from useContent', feed);

  const boxContent = getSponsorContent(5, feed, siteData && siteData.Sponsor);
  console.log('mapped sponsor content', boxContent);

  console.log('disable ad?', typeof disableAd);

  if (boxContent) {
    return (
      <div className={'c-sponsor-box'}>
        {boxTitle && <div className={'sponsor-header'}>
          <h1>{`More from ${boxTitle}`}</h1>
        </div>}
        {disableAd === 'false' ? <div className='sponsor-ad'>{SP01()}</div> : null}
        <ul className={'sponsor-content'}>
          {boxContent.map((el) => {
            if (el && el.url && el.headline) {
              return (
                <li className="sponsor-item">
                  <a href={el.url}>
                    <h2>{el.headline}</h2>
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

SponsorRelatedBox.defaultProps = {
  componentName: 'SponsorRelatedBox',
};

export default SponsorRelatedBox;
