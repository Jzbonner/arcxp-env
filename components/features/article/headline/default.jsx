/*  /components/features/article/headline/default.jsx  */

import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import Image from '../../image/default';

const Headline = ({ promoItems = {}, headlines = {} }) => {
  let promoData = {};

  if (promoItems && promoItems.basic) {
    promoData = promoItems.basic;
  }
  // Unhide to see how the headline component dispays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';

  return (
    <div className="article-headline-container">
      <div className={`article-headline with-${promoData.type ? `${promoData.type}` : 'just-headline'}`}>
        <div className="article-headline-body">
          <h3 className="h3">{headlines.basic}</h3>
        </div>
      </div>
      {promoData.type === 'image' && <Image imageSource={promoData.url} alt={promoData.caption} outerComponentClassName="head" />}
      {promoData.type === 'gallery' && <div className="gallery-container placeholder">Gallery Placeholder</div>}
      {promoData.type === 'video' && <div className="video-container placeholder">Video Placeholder</div>}
    </div>
  );
};

Headline.propTypes = {
  promoItems: PropTypes.object.isRequired,
  headlines: PropTypes.object.isRequired,
};

export default Headline;
