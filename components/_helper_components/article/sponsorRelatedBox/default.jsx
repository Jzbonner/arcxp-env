import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getSponsorContent from './_helper_functions/getSponserContent';
import ArcAd from '../../../features/ads/default';
import './default.scss';

const SP01 = () => <ArcAd staticSlot={'SP01'} key={'SP01'} />;

const SponsorRelatedBox = ({ sponsorID, uuid }) => {
  if (!sponsorID) {
    return null;
  }
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;

  const siteData = useContent({
    source: 'site-api',
    query: {
      section: sponsorID || null,
      arcSite,
    },
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
      from: 1,
      size: 10,
      includeTags: `${includeTags}`,
      mustIncludeAllTags: `${includeAllTags}`,
      excludeTags: `${excludeTags}`,
      arcSite,
    },
  });

  const boxContent = getSponsorContent(5, feed, siteData && siteData.Sponsor, uuid);

  if (!boxContent || (boxContent && boxContent.length < 1)) return null;

  if (boxContent) {
    const lastItemInArray = boxContent.slice(-1).pop();
    return (
      <div className={'c-sponsor-box'}>
        {boxTitle && (
          <div className={'sponsor-header'}>
            <h1>{`More from ${boxTitle}`}</h1>
          </div>
        )}
        {disableAd === 'false' ? <div className="sponsor-ad">{SP01()}</div> : null}
        <ul className={'sponsor-content'}>
          {boxContent.map((el, i) => {
            if (el && el.url && el.headline) {
              return (
                <li key={`sp-item-${i}`} className={`sponsor-item
                ${el.headline === lastItemInArray.headline && disableAd === 'false' ? 'enabled' : ''}`}>
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
  sponsorID: PropTypes.string,
  uuid: PropTypes.string,
};

SponsorRelatedBox.defaultProps = {
  componentName: 'SponsorRelatedBox',
};

export default SponsorRelatedBox;
