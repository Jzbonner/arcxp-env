import React from 'react';
import PropTypes from 'prop-types';
import ArcAd from '../../../features/ads/default';
import '../../../../src/styles/base/_utility.scss';

const GlobalAdSlots = ({
  ampPage,
  pbPage = false,
  galleryTopics = [],
  lazyLoad = false,
}) => {
  if (ampPage) {
    return null;
  }

  return <div className="b-hidden">
    <ArcAd staticSlot={'PX01'} galleryTopics={galleryTopics} lazyLoad={lazyLoad} />
    {pbPage && <>
        <ArcAd staticSlot={'NS01'} />
        <ArcAd staticSlot={'NS02'} />
    </>}
  </div>;
};

GlobalAdSlots.propTypes = {
  ampPage: PropTypes.bool,
  uuid: PropTypes.string,
  taxonomy: PropTypes.object,
  pbPage: PropTypes.bool,
  galleryTopics: PropTypes.array,
  lazyLoad: PropTypes.bool,
};

export default GlobalAdSlots;
