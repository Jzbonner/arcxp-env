import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getSponsorContent from './_helper_functions/getSponserContent';
import ArcAd from '../../../features/ads/default';
import './default.scss';


const SP01 = () => <ArcAd staticSlot={'SP01'} key={'SP01'} />;

const SponsorRelatedBox = ({
  sponsorID, uuid,
}) => {
  if (!sponsorID) {
    return null;
  }
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;

  const siteData = useContent({
    source: 'site-api',
    query: {
      section: sponsorID || null,
      arcSite,
    },
  });

  const { Sponsor = {} } = siteData || {};

  const {
    sponsor_related_box_exclude_tags: excludeTags,
    sponsor_related_box_include_tags: includeTags,
    sponsor_related_box_must_include_all_tags: includeAllTags,
    sponsor_related_box_title: boxTitle,
    disable_advertiser_content_label: disableAd,
    disable_sponsor_related_box: disableSponsorRelatedBox,
  } = Sponsor;

  const feed = useContent({
    source: 'query-feed',
    query: {
      from: 1,
      size: 10,
      includeTags: `${includeTags || ''}`,
      mustIncludeAllTags: `${includeAllTags || ''}`,
      excludeTags: `${excludeTags || ''}`,
      arcSite,
    },
  });

  if (disableSponsorRelatedBox !== 'true') {
    const boxContent = getSponsorContent(5, feed, siteData && siteData.Sponsor, uuid);

    if (!boxContent || (boxContent && boxContent.length < 1)) return null;
    let mainTitle = '';
    let subTitle = '';

    if (boxTitle && boxTitle.includes('sponsored')) {
      mainTitle = boxTitle.slice(0, boxTitle.indexOf('sponsored'));
      subTitle = boxTitle.slice(boxTitle.indexOf('sponsored'));
    }

    const lastItemInArray = boxContent.slice(-1).pop();
    return (
      <div className={'c-sponsor-box'}>
        {boxTitle && (
          <div className={'sponsor-header'}>
            {
              mainTitle && subTitle ? <>
                <h1>{`More from ${mainTitle}`}</h1>
                <h2>{`${subTitle}`}</h2>
              </> : <h1>{`More from ${boxTitle}`}</h1>
            }
          </div>
        )}
        <div className="sponsor-ad">{SP01()}</div>
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
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
  hideRelatedList: PropTypes.bool,
};

SponsorRelatedBox.defaultProps = {
  componentName: 'SponsorRelatedBox',
};

export default SponsorRelatedBox;
