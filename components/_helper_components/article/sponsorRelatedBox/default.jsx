import React from 'react';
import PropTypes from 'prop-types';
import { useContent } from 'fusion:content';
import getSponsorContent from './_helper_functions/getSponserContent';
import ArcAd from '../../../features/ads/default';
import './default.scss';

const SP01 = () => <ArcAd staticSlot={'SP01'} key={'SP01'} />;

const SponsorRelatedBox = ({ taxonomy, uuid }) => {
  const { primary_section: primarySection } = taxonomy || {};
  let sponsorSection = null;

  if (primarySection) {
    sponsorSection = primarySection.path && primarySection.path.includes('/sponsor/') ? primarySection.path : null;
  }
  if (!sponsorSection) {
    return null;
  }

  const siteData = useContent({
    source: 'site-api',
    query: { section: sponsorSection || null },
  });

  if (!siteData) return null;

  const { Sponsor = {} } = siteData;

  const {
    sponsor_related_box_exclude_tags: excludeTags,
    sponsor_related_box_include_tags: includeTags,
    sponsor_related_box_must_include_all_tags: includeAllTags,
    sponsor_related_box_title: boxTitle,
    disable_advertiser_content_label: disableAd,
  } = Sponsor;

  const feed = useContent({
    source: 'query-feed',
    query: {
      size: 10,
      includeTags: `${includeTags}`,
      mustIncludeAllTags: `${includeAllTags}`,
      excludeTags: `${excludeTags}`,
    },
  });

  const boxContent = getSponsorContent(5, feed, siteData && siteData.Sponsor, uuid);

  if (!boxContent || (boxContent && boxContent.length < 1)) return null;

  if (boxContent) {
    return (
      <div className={'c-sponsor-box'}>
        {boxTitle && <div className={'sponsor-header'}>
          <h1>{`More from ${boxTitle}`}</h1>
        </div>}
        {disableAd === 'false' ? <div className='sponsor-ad'>{SP01()}</div> : null}
        <ul className={'sponsor-content'}>
          {boxContent.map((el, i) => {
            if (el && el.url && el.headline) {
              return (
                <li key={`sp-item-${i}`} className="sponsor-item">
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
  uuid: PropTypes.string,
};

SponsorRelatedBox.defaultProps = {
  componentName: 'SponsorRelatedBox',
};

export default SponsorRelatedBox;
