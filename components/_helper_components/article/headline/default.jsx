import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import { useFusionContext } from 'fusion:context';
import getProperties from 'fusion:properties';
import Image from '../../global/image/default';
import Video from '../../global/video/default';
import Gallery from '../../../features/gallery/default';

const Headline = ({
  basicItems = {}, headlines = {}, taxonomy = {}, ampPage = false, contentType = '', ampVideoIframe = false, lazyLoad = false,
}) => {
  let promoData = {};
  if (basicItems) {
    promoData = basicItems;
  }
  const fusionContext = useFusionContext();
  const { arcSite } = fusionContext;
  const { featuredVideoPlayerRules, maxTabletViewWidth } = getProperties(arcSite);

  // Uncomment to see how the headline component displays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';
  return (
    <div className={`article-headline-component b-margin-bottom-d30-m20 with-${promoData.type ? `${promoData.type}` : 'just-headline'}`}>
      {!ampVideoIframe && <div className="headline">
        <div className="headline-body">
          <h1 className={`headline-text ${headlines.basic.length > 50 ? 'headline-text-long' : ''}`}>{headlines.basic}</h1>
        </div>
      </div>}
      {promoData.type === 'image' && (
        <Image
          width={814}
          height={458}
          imageType="isLeadImage"
          src={basicItems}
          maxTabletViewWidth={maxTabletViewWidth}
          ampPage={ampPage}
        />
      )}
      {!ampPage && promoData.type === 'gallery' && promoData.content_elements && <Gallery promoItems={promoData} pageType={contentType} />}
      {promoData.type === 'video' && (
        <Video
          isLeadVideo
          src={basicItems}
          featuredVideoPlayerRules={featuredVideoPlayerRules}
          maxTabletViewWidth={maxTabletViewWidth}
          pageTaxonomy={taxonomy}
          lazyLoad={lazyLoad}
        />
      )}
    </div>
  );
};

Headline.propTypes = {
  basicItems: PropTypes.object,
  headlines: PropTypes.object.isRequired,
  featuredVideoPlayerRules: PropTypes.object,
  maxTabletViewWidth: PropTypes.number,
  taxonomy: PropTypes.object,
  ampPage: PropTypes.bool,
  contentType: PropTypes.string,
  ampVideoIframe: PropTypes.bool,
  lazyLoad: PropTypes.bool,
};

export default Headline;
