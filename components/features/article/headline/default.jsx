import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import Image from '../../../_helper_components/global/image/default';

const Headline = ({ basicItems = {}, headlines = {} }) => {
  let promoData = {};
  if (basicItems) {
    promoData = basicItems;
  }
  // Unhide to see how the headline component dispays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';

  return (
    <div className={`article-headline-container with-${promoData.type ? `${promoData.type}` : 'just-headline'}`}>
      <div className="article-headline">
        <div className="article-headline-body">
          <h3 className="article-heading h3">{headlines.basic}</h3>
        </div>
      </div>
      {promoData.type === 'image' && (
        <Image imageSource={promoData.url} alt={promoData.caption} outerComponentClassName="head" basicItems={basicItems} />
      )}
      {promoData.type === 'gallery' && <div className="gallery-container placeholder">Gallery Placeholder</div>}
      {promoData.type === 'video' && <div className="video-container placeholder">Video Placeholder</div>}
    </div>
  );
};

Headline.propTypes = {
  basicItems: PropTypes.object,
  headlines: PropTypes.object.isRequired,
};

export default Headline;
