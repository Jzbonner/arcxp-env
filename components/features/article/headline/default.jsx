import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../image/default';
import './style.scss';

const Headline = ({ global }) => {
  let promoData = {};

  if (global.promo_items && global.promo_items.basic) {
    promoData = global.promo_items.basic;
  }
  // Unhide to see how the headline component dispays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';

  return (
    <div className="article-headline-container">
      <div className={`article-headline with-${promoData.type ? `${promoData.type}` : 'just-headline'}`}>
        <div className="article-headline-body">
          <h3 className="article-heading">{global.headlines.basic}</h3>
        </div>
      </div>
      {promoData.type === 'image' && (
        <Image imageSource={promoData.url} alt={promoData.caption} outerComponentClassName="head" global={global} />
      )}
      {promoData.type === 'gallery' && <div className="gallery-container placeholder">Gallery Placeholder</div>}
      {promoData.type === 'video' && <div className="video-container placeholder">Video Placeholder</div>}
    </div>
  );
};

Headline.propTypes = {
  global: PropTypes.any,
};

export default Headline;
