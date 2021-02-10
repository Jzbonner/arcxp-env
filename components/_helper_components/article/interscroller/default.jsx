import React from 'react';
import PropTypes from 'prop-types';
import AmpAd from '../../amp/amp-ads/AmpAd';

const InterscrollerPlaceholder = ({
  ampPage, isHyperlocalContent, taxonomy, uuid, isMeteredStory = false,
}) => {
  if (ampPage) {
    if (isHyperlocalContent) {
      return (
        <div className='c-section'>
          <amp-fx-flying-carpet height="300px" class="ampAd">
            <AmpAd adSlot='PX01' uuid={uuid} width={'300'} height={'500'} taxonomy={taxonomy} componentName='ArcAd'
              multiSizeValidation={'false'} flyingCarpet={true} isMeteredStory={isMeteredStory} />
          </amp-fx-flying-carpet>
          <div style={{ transform: `translate(0, -${320}px)` }} className='ampAdLabel'></div>
        </div>
      );
    }
    return (
      <div className='c-section teads-ad'>
        <AmpAd adSlot='PX01' uuid={uuid} width={'300'} height={'1'} taxonomy={taxonomy} componentName='ArcAd'
          multiSizeValidation={'false'} isMeteredStory={isMeteredStory} />
      </div>
    );
  }
  return (
    <div className="c-section">
      <div className="story-interscroller__placeholder full-width c-clear-both c-contentElements" key={'interscrollerPlaceholder'}></div>
    </div>
  );
};

InterscrollerPlaceholder.propTypes = {
  ampPage: PropTypes.bool,
  isHyperlocalContent: PropTypes.bool,
  taxonomy: PropTypes.object,
  uuid: PropTypes.string,
  isMeteredStory: PropTypes.bool,
};

export default InterscrollerPlaceholder;
