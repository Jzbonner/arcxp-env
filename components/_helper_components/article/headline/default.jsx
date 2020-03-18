import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import getProperties from 'fusion:properties';
import Image from '../../global/image/default';
import Video from '../../global/video/default';
import Gallery from '../../../features/gallery/default';
import ArcAd from '../../../features/ads/default';

const Headline = ({ basicItems = {}, headlines = {} }) => {
  let promoData = {};
  if (basicItems) {
    promoData = basicItems;
  }

  const PG01 = () => <ArcAd staticSlot={'PG01'} key={'PG01'} />;
  const PG02 = () => <ArcAd staticSlot={'PG02'} key={'PG02'} />;
  const MPG01 = () => <ArcAd staticSlot={'MPG01'} key={'MPG01'} />;

  const { featuredVideoPlayerRules, maxTabletViewWidth } = getProperties();

  // Uncomment to see how the headline component displays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';

  return (
    <div className={`article-headline-component b-margin-bottom-d30-m20 with-${promoData.type ? `${promoData.type}` : 'just-headline'}`}>
      <div className="headline">
        <div className="headline-body">
          <h3 className={`headline-text ${headlines.basic.length > 50 ? 'headline-text-long' : ''}`}>{headlines.basic}</h3>
        </div>
      </div>
      {promoData.type === 'image' && (
        <Image width={1066} height={600} imageType="isLeadImage" src={basicItems} maxTabletViewWidth={maxTabletViewWidth} />
      )}
      {promoData.type === 'gallery' && promoData.content_elements && <Gallery promoItems={promoData} ads={[PG01, PG02, MPG01]}/>}
      {promoData.type === 'video' && (
        <Video isLeadVideo src={basicItems} featuredVideoPlayerRules={featuredVideoPlayerRules} maxTabletViewWidth={maxTabletViewWidth} />
      )}
    </div>
  );
};

Headline.propTypes = {
  basicItems: PropTypes.object,
  headlines: PropTypes.object.isRequired,
  featuredVideoPlayerRules: PropTypes.object,
  maxTabletViewWidth: PropTypes.number,
};

export default Headline;
