import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import { useContent } from 'fusion:content';
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment';
import getSponsorContent from './_helper_functions/getSponserContent';
import ArcAd from '../../../features/ads/default';
import getSiteData from '../../../../content/sources/helper_functions/getSiteData';
import getSponsorData from '../../../../content/sources/helper_functions/getSponsorData';
import { default as queryFeedFetch } from '../../../../content/sources/query-feed';
import './default.scss';
import { divide } from 'lodash';


const SP01 = () => <ArcAd staticSlot={'SP01'} key={'SP01'} />;

const SponsorRelatedBoxAMP = ({
  sponsorID, uuid,
}) => {
  // const [siteData, setSiteData] = useState(null);

  if (!sponsorID) {
    return null;
  }
  const fusionContext = useFusionContext();
  const { arcSite = 'ajc' } = fusionContext;

  const query = {
    arcSite,
    type: 'navigation',
    hierarchy: 'default',
    section: sponsorID,
  };

  const endpoint = `${CONTENT_BASE}/site/v3/${query.type}/${query.arcSite}/?hierarchy=${query.hierarchy}`;

  const requestUri = query.section ? `${endpoint}&_id=${query.section}` : endpoint;

  const buildAMPSponsorBox = async () => {
    fetch(requestUri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ARC_ACCESS_TOKEN}`,
      },
    })
      .then(response => response.json())
      .then((data) => {
        console.log('site api data', data);


        const { Sponsor = {} } = data || {};

        const {
          sponsor_related_box_exclude_tags: excludeTags,
          sponsor_related_box_include_tags: includeTags,
          sponsor_related_box_must_include_all_tags: includeAllTags,
          sponsor_related_box_title: boxTitle,
          disable_advertiser_content_label: disableAd,
          disable_sponsor_related_box: disableSponsorRelatedBox,
        } = Sponsor;

        console.log('.then includeTags', includeTags);

        queryFeedFetch.fetch({
          from: 1,
          size: 10,
          includeTags: `${includeTags || ''}`,
          mustIncludeAllTags: `${includeAllTags || ''}`,
          excludeTags: `${excludeTags || ''}`,
          arcSite,
        }).then((queryFeedData) => {
          console.log('queryFeedData', queryFeedData);

          // TODO: Verify queryFeedFetch.fetch() returns proper response

          if (disableSponsorRelatedBox !== 'true') {
            const boxContent = getSponsorContent(5, queryFeedData, data && data.Sponsor, uuid);

            if (!boxContent || (boxContent && boxContent.length < 1)) return null;
           //  const lastItemInArray = boxContent.slice(-1).pop();
/*             return (
              <div id="SPONSOR-BOX" className={'c-sponsor-box'}>
                {boxTitle && (
                  <div className={'sponsor-header'}>
                    <h1>{`More from ${boxTitle}`}</h1>
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
            ); */
          }
        });
      });
  };

  const fetchy = buildAMPSponsorBox();

  console.log('fetch output', fetchy);

  return <h1>UNDER CONSTRUCTION</h1>;
};

SponsorRelatedBoxAMP.propTypes = {
  sponsorID: PropTypes.string,
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
  hideRelatedList: PropTypes.bool,
};

SponsorRelatedBoxAMP.defaultProps = {
  componentName: 'SponsorRelatedBoxAMP',
};

export default SponsorRelatedBoxAMP;
