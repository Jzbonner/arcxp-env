/*  /components/features/article/headline/default.jsx  */

import React from 'react';
import { useAppContext } from 'fusion:context';
import './style.scss';
import Image from '../../image/default';

const Headline = () => {
  const appContext = useAppContext();
  const { globalContent } = appContext;
  let promoData = {};

  if (globalContent.promo_items && globalContent.promo_items.basic) {
    promoData = globalContent.promo_items.basic;
  }
  // Unhide to see how the headline component dispays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';

  return (
    <div className="article-headline-container">
      <div className={`article-headline with-${promoData.type ? `${promoData.type}` : 'just-headline'}`}>
        <div className="article-headline-body">
          <h3 class="h3">{globalContent.headlines.basic}</h3>
        </div>
      </div>
      {promoData.type === 'image' && <Image imageSource={promoData.url} alt={promoData.caption} outerComponentClassName="head" />}
      {promoData.type === 'gallery' && <div className="gallery-container placeholder">Gallery Placeholder</div>}
      {promoData.type === 'video' && <div className="video-container placeholder">Video Placeholder</div>}
    </div>
  );
};

export default Headline;
