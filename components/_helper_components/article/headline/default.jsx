import React from 'react';
import './style.scss';
import PropTypes from 'prop-types';
import Image from '../../global/image/default.jsx';

const Headline = ({ basicItems = {}, headlines = {} }) => {
  let promoData = {};
  if (basicItems) {
    promoData = basicItems;
  }
  // Uncomment to see how the headline component displays with a video promo type.
  // Used because I was getting errors when trying to add a video as a featured element.
  // promoData.type = 'video';

  return (
    <div className={`article-headline-component b-margin-bottom-d30-m20 with-${promoData.type ? `${promoData.type}` : 'just-headline'}`}>
      <div className="headline">
        <div className="headline-body">
          <h3 className="h3">{headlines.basic}</h3>
        </div>
      </div>
      {promoData.type === 'image' && <Image width={1066} height={600} src={basicItems} />}
      {promoData.type === 'gallery' && <div className="c-gallery b-placeholder">Gallery Placeholder</div>}
      {promoData.type === 'video' && <div className="c-video b-placeholder">Video Placeholder</div>}
    </div>
  );
};

Headline.propTypes = {
  basicItems: PropTypes.object,
  headlines: PropTypes.object.isRequired,
};

export default Headline;
