import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import getSponsorContent from './_helper_functions/getSponserContent';
import ArcAd from '../../../features/ads/default';
import Story from './story';
import './default.scss';

const SponsorRelatedBox = ({
  sponsorID, uuid, isMeteredStory = false,
}) => {
  if (!sponsorID) {
    return null;
  }
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const SP01 = () => <ArcAd staticSlot={'SP01'} key={'SP01'} lazyLoad={isMeteredStory} />;

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
    disable_sponsor_related_box: disableSponsorRelatedBox,
  } = Sponsor;

  const feed = useContent({
    source: 'query-feed',
    query: {
      daysBack: 1000,
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
              return (<Story i={i} el={el} sponsor={Sponsor} length={boxContent.length}/>);
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
  isMeteredStory: PropTypes.bool,
};

SponsorRelatedBox.defaultProps = {
  componentName: 'SponsorRelatedBox',
};

export default SponsorRelatedBox;
