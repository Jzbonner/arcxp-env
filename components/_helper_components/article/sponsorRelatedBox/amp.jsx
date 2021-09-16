import React from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import AmpAd from '../../amp/amp-ads/AmpAd';
import './default.scss';

const SponsorRelatedBoxAMP = ({
  sponsorID, taxonomy, uuid, isMeteredStory = false,
}) => {
  if (!sponsorID) {
    return null;
  }
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;
  const ampSP01 = () => <AmpAd adSlot="SP01" uuid={uuid} width={'88'} height={'31'} taxonomy={taxonomy} componentName={'ArcAd'} isMeteredStory={isMeteredStory} />;

  const boxData = useContent({
    source: 'sponsor-box-amp',
    query: {
      section: sponsorID || null,
      arcSite,
      type: 'navigation',
      hierarchy: 'default',
      uuid,
    },
  });

  if (!boxData) return null;

  const { contentElements = [], sectionConfig = {} } = boxData || {};

  const {
    sponsor_related_box_title: boxTitle,
    disable_advertiser_content_label: disableAd,
    disable_sponsor_related_box: disableSponsorRelatedBox,
  } = sectionConfig;

  if (disableSponsorRelatedBox !== 'true') {
    const lastItemInArray = contentElements.slice(-1).pop();
    return (
      <div id="SPONSOR-BOX" className={'c-sponsor-box'}>
        {boxTitle && (
          <div className={'sponsor-header'}>
            <h1>{`More from ${boxTitle}`}</h1>
          </div>
        )}
        <div className="sponsor-ad">{ampSP01()}</div>
        <ul className={'sponsor-content'}>
          {contentElements.map((el, i) => {
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

SponsorRelatedBoxAMP.propTypes = {
  sponsorID: PropTypes.string,
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
  hideRelatedList: PropTypes.bool,
  isMeteredStory: PropTypes.bool,
};

SponsorRelatedBoxAMP.defaultProps = {
  componentName: 'SponsorRelatedBoxAMP',
};

export default SponsorRelatedBoxAMP;
